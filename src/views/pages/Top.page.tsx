import React from 'react';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
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

const TopPage: React.FC = () => {
  const classes = TopPageStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar />
      <LeftSideBar />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Toolbar className={classes.subHeader}>
          <Typography variant="h5" className={classes.pageTitle}>
            HOME
          </Typography>
        </Toolbar>
        <Divider />
        <Container maxWidth="lg" className={classes.container}>
          <CreatePost />
          <PostList />
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
