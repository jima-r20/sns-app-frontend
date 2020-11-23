import React from 'react';
import { Grid } from '@material-ui/core';
import Friend from './Friend';

const FriendList: React.FC = () => {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Friend />
        <Friend />
        <Friend />
        <Friend />
      </Grid>
    </React.Fragment>
  );
};

export default FriendList;
