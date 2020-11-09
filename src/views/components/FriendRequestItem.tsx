import React from 'react';
import { Grid, Avatar, Button, Paper, Typography } from '@material-ui/core';
import { FriendRequestItmStyle } from '../../styles/FriendRequestItem.style';

interface PROPS_FRIEND_REQUEST {
  displayName: string;
}

const FriendRequestItem: React.FC<PROPS_FRIEND_REQUEST> = (props) => {
  const classes = FriendRequestItmStyle();
  const { displayName } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Paper variant="outlined" className={classes.friReqPaper}>
        <Grid container spacing={1} className={classes.friReqContainer}>
          <Grid item xs={2}>
            <Avatar className={classes.friReqAvatar}>{avatarIcon}</Avatar>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" component="p">
              {displayName}
            </Typography>
          </Grid>
          <Grid item xs={7} className={classes.approveButton}>
            <Button variant="outlined" color="primary" size="small">
              Approve
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default FriendRequestItem;
