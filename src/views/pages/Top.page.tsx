import React, { useEffect } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Copyright from '../components/Copyright';
import HeaderBar from '../components/HeaderBar';
import LeftSideBar from '../components/LeftSideBar';
import PostList from '../components/PostList';
import RightSideBar from '../components/RightSideBar';
import { TopPageStyles } from '../../styles/TopPage.styles';
import CreatePost from '../components/CreatePost';
import { AppDispatch } from '../../stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetMyPosts, fetchGetPosts } from '../../stores/slices/post.slice';
import {
  fetchGetUser,
  fetchGetUsers,
  selectMyProfile,
  selectSelectedUser,
} from '../../stores/slices/user.slice';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PostItem from '../components/PostItem';
import { selectSelectedPost } from '../../stores/slices/post.slice';
import Profile from '../components/Profile';
import DMList from '../components/DMList';
import FriendList from '../components/FriendList';
import { fetchGetDmInbox } from '../../stores/slices/dm.slice';

const TopPage: React.FC = () => {
  const classes = TopPageStyles();
  const dispatch: AppDispatch = useDispatch();

  let match = useRouteMatch();

  const selectedPost = useSelector(selectSelectedPost);
  const myProfile = useSelector(selectMyProfile);
  const selectedUser = useSelector(selectSelectedUser);

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.getItem('localJwtToken')) {
        const result = await dispatch(fetchGetUser());
        if (fetchGetUser.rejected.match(result)) {
          return null;
        }
        await dispatch(fetchGetPosts());
        await dispatch(fetchGetMyPosts());
        await dispatch(fetchGetUsers());
        await dispatch(fetchGetDmInbox());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar />
      <LeftSideBar />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <Switch> */}
        <Toolbar className={classes.subHeader}>
          <Typography variant="h5" className={classes.pageTitle}>
            HOME
          </Typography>
        </Toolbar>

        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            {/* ================================
                          投稿一覧表示
              ================================= */}
            <Route path={match.url} exact>
              <CreatePost />
              <PostList />
            </Route>
            {/* ================================
                          投稿詳細表示
              ================================= */}
            <Route path={`${match.url}/post/:id`} exact>
              <PostItem
                id={selectedPost.id}
                postFromId={selectedPost.postFromId}
                displayName={selectedPost.displayName}
                content={selectedPost.content}
              />
            </Route>
            {/* ================================
                        マイプロフィール表示
              ================================= */}
            <Route path={`${match.url}/myprofile`} exact>
              <Profile profile={myProfile} />
              <PostList mypost />
            </Route>
            {/* ================================
                マイプロフィールページから投稿詳細表示
              ================================= */}
            <Route path={`${match.url}/myprofile/post/:id`} exact>
              <PostItem
                id={selectedPost.id}
                postFromId={selectedPost.postFromId}
                displayName={selectedPost.displayName}
                content={selectedPost.content}
              />
            </Route>
            {/* ================================
                  自分以外のユーザのプロフィール表示
              ================================= */}
            <Route path={`${match.url}/profile/:id`} exact>
              <Profile profile={selectedUser} />
              <PostList postFromId={selectedUser.id} />
            </Route>
            {/* ================================
              自分以外のユーザのプロフィールページから投稿詳細表示
              ================================= */}
            <Route path={`${match.url}/profile/:id/post/:id`} exact>
              {/* 
                TODO: 遷移後のBackボタンを押すとトップページに戻る問題あり
                  -> Backボタン押下時のルーティング変更する必要あり
              */}
              <PostItem
                id={selectedPost.id}
                postFromId={selectedPost.postFromId}
                displayName={selectedPost.displayName}
                content={selectedPost.content}
              />
            </Route>
            {/* ================================
                          DM一覧表示
              ================================= */}
            <Route path={`${match.url}/dm`} exact>
              <DMList />
            </Route>
            {/* ================================
                        DM詳細表示(個別取得)
              ================================= */}

            {/* ================================
                        フレンドリスト表示
              ================================= */}
            <Route path={`${match.url}/friends`} exact>
              <FriendList />
            </Route>
          </Switch>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>

      <RightSideBar />
    </div>
  );
};

export default TopPage;
