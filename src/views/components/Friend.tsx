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
import { useSelector } from 'react-redux';
import { selectMyProfile, selectUsers } from '../../stores/slices/user.slice';

interface PROPS_FRIEND {
  askFrom: number;
  askTo: number;
  approved: boolean;
}

const Friend: React.FC<PROPS_FRIEND> = (props) => {
  const classes = FriendStyles();
  const { askFrom, askTo, approved } = props;
  const myProfile = useSelector(selectMyProfile);
  const user = useSelector(selectUsers).find(
    (u) => u.id === (myProfile.id === askFrom ? askTo : askFrom)
  );
  const avatarIcon = user?.displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Avatar className={classes.avatar}>{avatarIcon}</Avatar>
            </Grid>
            <Grid item container xs={11}>
              <Grid item xs={12}>
                <Typography variant="body1" className={classes.displayName}>
                  {user?.displayName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">{user?.about}</Typography>
              </Grid>
            </Grid>
            {approved ? (
              <Grid item xs={12}>
                <Chip
                  clickable
                  color="primary"
                  label="Send DM"
                  component="button"
                  className={classes.button}
                />
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Friend;
