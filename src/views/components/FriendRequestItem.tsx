import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Avatar, Typography, Card, Chip } from '@material-ui/core';
import { selectUsers } from '../../stores/slices/user.slice';
import { FriendRequestItmStyle } from '../../styles/FriendRequestItem.style';

interface PROPS_FRIEND_REQUEST {
  askFrom: number;
}

const FriendRequestItem: React.FC<PROPS_FRIEND_REQUEST> = (props) => {
  const classes = FriendRequestItmStyle();
  const { askFrom } = props;
  const user = useSelector(selectUsers).find((u) => u.id === askFrom);
  const avatarIcon = user?.displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Card variant="outlined" className={classes.card}>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={2}>
            <Avatar className={classes.avatar}>{avatarIcon}</Avatar>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" component="p">
              {user?.displayName}
            </Typography>
          </Grid>
          <Grid item xs={7} className={classes.buttons}>
            <Chip clickable color="primary" size="small" label="Approve" />
            <Chip clickable color="secondary" size="small" label="Reject" />
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default FriendRequestItem;
