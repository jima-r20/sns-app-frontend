import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import {
  Box,
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { lightBlue, red } from '@material-ui/core/colors';

import Copyright from '../components/Copyright';
import HeaderBar from '../components/HeaderBar';
import LeftSideBar from '../components/LeftSideBar';
import RightSideBar from '../components/RightSideBar';
import PostList from '../components/PostList';
import PostItem from '../components/PostItem';
import CreatePost from '../components/CreatePost';
import Profile from '../components/Profile';
import DMList from '../components/DMList';
import DMItem from '../components/DMItem';
import CreateDM from '../components/CreateDM';
import FriendList from '../components/FriendList';

import { AppDispatch } from '../../stores/store';
import {
  fetchGetMyPosts,
  fetchGetPosts,
  selectSelectedPost,
} from '../../stores/slices/post.slice';
import {
  fetchGetUser,
  fetchGetUsers,
  selectMyProfile,
  selectSelectedUser,
} from '../../stores/slices/user.slice';
import {
  fetchGetDmInbox,
  selectSelectedDM,
} from '../../stores/slices/dm.slice';
import {
  fetchGetFollowerList,
  fetchGetFollowList,
  fetchGetFriendsList,
} from '../../stores/slices/follow.slice';
import {
  selectIsApproveOrUnfollowButtomClicked,
  selectSubHeaderTitle,
} from '../../stores/slices/page.slice';

import { TopPageStyles } from '../../styles/views/TopPage.styles';
import ScrollTop from '../components/ScrollTop';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[600],
      // contrastText: blue[900],
    },
    secondary: {
      main: red[400],
      // contrastText: red[900],
    },
  },
});

const TopPage: React.FC = () => {
  const classes = TopPageStyles();
  const dispatch: AppDispatch = useDispatch();

  let match = useRouteMatch();
  const history = useHistory();

  const subHeaderTitle = useSelector(selectSubHeaderTitle);
  const selectedPost = useSelector(selectSelectedPost);
  const myProfile = useSelector(selectMyProfile);
  const selectedUser = useSelector(selectSelectedUser);
  const selectedDM = useSelector(selectSelectedDM);
  const isApproveOrUnfollowButtomClicked = useSelector(
    selectIsApproveOrUnfollowButtomClicked
  );

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.getItem('localJwtToken')) {
        const result = await dispatch(fetchGetUser());
        if (fetchGetUser.rejected.match(result)) {
          // Tokenはあるが期限が切れている場合。持っているTokenを破棄してログインページへ
          localStorage.removeItem('localJwtToken');
          history.push('/signin');
          return null;
        }
        await dispatch(fetchGetPosts());
        await dispatch(fetchGetMyPosts());
        await dispatch(fetchGetUsers());
        await dispatch(fetchGetFollowList());
        await dispatch(fetchGetFollowerList());
        await dispatch(fetchGetFriendsList());
      } else {
        // Tokenがない場合。ログインページへ
        history.push('/signin');
      }
    };
    fetchBootLoader();
  }, [dispatch, isApproveOrUnfollowButtomClicked]);

  dispatch(fetchGetDmInbox(myProfile.id));

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderBar />
        <LeftSideBar />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Toolbar className={classes.subHeader}>
            <Typography variant="h5" className={classes.pageTitle}>
              {subHeaderTitle}
            </Typography>
          </Toolbar>

          <div id="back-to-top-anchor" />

          <Container maxWidth="lg" className={classes.container} id="container">
            <Switch>
              {/* ================================
                          投稿一覧表示
              ================================= */}
              <Route path={match.url} exact>
                <CreatePost />
                <PostList />
                <ScrollTop />
              </Route>
              {/* ================================
                        新規投稿専用画面表示
              ================================= */}
              <Route path={`${match.url}/post/create`} exact>
                <CreatePost />
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
                <ScrollTop />
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
                <ScrollTop />
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
                <ScrollTop />
              </Route>
              {/* ================================
                            DM新規作成
              ================================= */}
              <Route path={`${match.url}/dm/create`} exact>
                <CreateDM />
              </Route>
              {/* ================================
                        DM詳細表示(個別取得)
              ================================= */}
              <Route path={`${match.url}/dm/:id`} exact>
                <DMItem
                  targetUser={selectedDM.targetUser}
                  messages={selectedDM.messages}
                />
              </Route>
              {/* ================================
                        フレンドリスト表示
              ================================= */}
              <Route path={`${match.url}/friends`} exact>
                <FriendList />
                <ScrollTop />
              </Route>
            </Switch>

            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
        {window.outerWidth > 1024 ? <RightSideBar /> : null}
      </ThemeProvider>
    </div>
  );
};

export default TopPage;
