import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Chip, Grid, Paper, Typography } from '@material-ui/core';
import { selectMyProfile, selectUsers } from '../../stores/slices/user.slice';
import { FriendStyles } from '../../styles/Friend.style';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { AppDispatch } from '../../stores/store';
import { setSendToReceiver } from '../../stores/slices/page.slice';
import { fetchApproveRequest } from '../../stores/slices/follow.slice';

interface PROPS_FRIEND {
  askFrom: number;
  askTo: number;
  approved: boolean;
}

const Friend: React.FC<PROPS_FRIEND> = (props) => {
  const classes = FriendStyles();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { askFrom, askTo, approved } = props;
  const myProfile = useSelector(selectMyProfile);
  const user = useSelector(selectUsers).find(
    (u) => u.id === (myProfile.id === askFrom ? askTo : askFrom)
  );
  const avatarIcon = user?.displayName.charAt(0).toUpperCase();

  const onClickSendDM = async () => {
    await dispatch(setSendToReceiver(user?.id));
    history.push('/top/dm/create');
  };

  const onClickApproveRequest = async () => {
    // リクエストbodyにはboolean型ではなくstring型でtrueと渡す必要あり
    await dispatch(fetchApproveRequest({ askFrom, approved: 'true' }));
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Avatar className={classes.avatar}>{avatarIcon}</Avatar>
            </Grid>
            <Grid item container xs={8}>
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
              <Grid item xs={3} className={classes.buttons}>
                <Chip
                  clickable
                  color="primary"
                  label="Send DM"
                  component="button"
                  className={classes.button}
                  onClick={onClickSendDM}
                />
                <Chip
                  clickable
                  color="secondary"
                  variant="outlined"
                  label="Unfollow"
                  component="button"
                  className={classes.button}
                  // onClick={onClickUnfollow}
                />
              </Grid>
            ) : askTo === myProfile.id ? (
              <Grid item xs={3} className={classes.buttons}>
                <Chip
                  clickable
                  color="primary"
                  label="Approve"
                  component="button"
                  className={classes.button}
                  onClick={onClickApproveRequest}
                />
                <Chip
                  clickable
                  color="secondary"
                  variant="outlined"
                  label="Reject"
                  component="button"
                  className={classes.button}
                  // onClick={onClickRejectRequest}
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
