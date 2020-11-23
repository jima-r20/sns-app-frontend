import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { FriendStyles } from '../../styles/Friend.style';

const Friend: React.FC = () => {
  const classes = FriendStyles();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Avatar className={classes.avatar}>x</Avatar>
            </Grid>
            <Grid item container xs={11}>
              <Grid item xs={12}>
                <Typography variant="body1" className={classes.displayName}>
                  Mr. X
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Hello, I am X. My favorite programming language is React!!
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chip
                clickable
                color="primary"
                label="Send DM"
                component="button"
                className={classes.button}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Friend;
