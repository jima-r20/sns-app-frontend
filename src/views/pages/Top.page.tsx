import React, { useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Grid,
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
import { fetchGetPosts, selectPosts } from '../../stores/slices/post.slice';
import { fetchGetUser } from '../../stores/slices/user.slice';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PostItem from '../components/PostItem';

const TopPage: React.FC = () => {
  const classes = TopPageStyles();
  const dispatch: AppDispatch = useDispatch();

  let match = useRouteMatch();

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.getItem('localJwtToken')) {
        const result = await dispatch(fetchGetUser());
        if (fetchGetUser.rejected.match(result)) {
          return null;
        }
        await dispatch(fetchGetPosts());
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
        <Switch>
          {/* ================================
                      投稿一覧表示
          ================================= */}
          <Route path={match.url} exact>
            <Toolbar className={classes.subHeader}>
              <Typography variant="h5" className={classes.pageTitle}>
                HOME
              </Typography>
            </Toolbar>

            <Container maxWidth="lg" className={classes.container}>
              <CreatePost />
              <PostList />
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </Route>

          {/* ================================
                      投稿詳細表示
          ================================= */}
          <Route path={`${match.url}/:id`} exact>
            <Toolbar className={classes.subHeader}>
              <Typography variant="h5" className={classes.pageTitle}>
                Post Detail
              </Typography>
            </Toolbar>

            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={1}>
                <PostItem displayName="detail-test" content="aaaaaaaaa" />
              </Grid>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </Route>
        </Switch>
      </main>

      <RightSideBar />
    </div>
  );
};

export default TopPage;
