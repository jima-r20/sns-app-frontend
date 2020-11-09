import React from 'react';
import { Grid } from '@material-ui/core';
import PostItem from './PostItem';

const PostList: React.FC = () => {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <PostItem displayName="Kobe" />
        <PostItem displayName="Ryuji" />
        <PostItem displayName="Ariel" />
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
