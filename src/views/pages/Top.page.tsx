import React from 'react';
import { Box, Container, CssBaseline } from '@material-ui/core';
import { TopPageStyles } from '../../styles/TopPage.styles';
import Copyright from '../components/Copyright';
import HeaderBar from '../components/HeaderBar';
import LeftSideBar from '../components/LeftSideBar';
import PostList from '../components/PostList';
import RightSideBar from '../components/RightSideBar';

const TopPage: React.FC = () => {
  const classes = TopPageStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar />
      <LeftSideBar />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
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
