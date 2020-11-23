import React from 'react';
import { Grid } from '@material-ui/core';
import DMItem from './DMItem';

const DMList: React.FC = () => {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <DMItem />
        <DMItem />
        <DMItem />
        <DMItem />
      </Grid>
    </React.Fragment>
  );
};

export default DMList;
