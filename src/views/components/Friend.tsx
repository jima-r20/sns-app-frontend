import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Chip, Grid, Paper, Typography } from '@material-ui/core';
import { selectMyProfile, selectUsers } from '../../stores/slices/user.slice';
import { FriendStyles } from '../../styles/Friend.style';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from '../../stores/store';
import {
  resetApproveOrUnfollowButtomClicked,
  setApproveOrUnfollowButtomClicked,
  setSendToReceiver,
} from '../../stores/slices/page.slice';
import {
  fetchApproveRequest,
  fetchCreateFollow,
  fetchDeleteFollow,
  selectFollowers,
  selectFollows,
} from '../../stores/slices/follow.slice';

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
  const follows = useSelector(selectFollows);
  const followers = useSelector(selectFollowers);
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
    dispatch(setApproveOrUnfollowButtomClicked());
    // リクエストbodyにはboolean型ではなくstring型でtrueと渡す必要あり
    await dispatch(fetchApproveRequest({ askFrom, approved: 'true' }));
    const found = follows.find((f) => f.askTo === askFrom);
    console.log(`found: ${found}`);
    if (found) {
      // リクエストを承認したユーザをフォローしていた場合、
      // 自身のフォローリクエストのapprovedをtrueにする
      await dispatch(fetchApproveRequest({ askTo: askFrom, approved: 'true' }));
    }
    if (!found) {
      // リクエストを承認したユーザをフォローしていなかった場合には、
      // approvedをtrueとしてフォローする
      await dispatch(fetchCreateFollow({ askTo: askFrom, approved: 'true' }));
    }
    dispatch(resetApproveOrUnfollowButtomClicked());
  };

  const onClickUnfollow = async () => {
    dispatch(setApproveOrUnfollowButtomClicked());
    const foundFromFollows = follows.find((f) => f.askTo === askFrom);
    const foundFromFollowers = followers.find((f) => f.askFrom === askFrom);
    if (foundFromFollows && foundFromFollowers) {
      await dispatch(fetchDeleteFollow(foundFromFollows?.id));
      await dispatch(
        fetchApproveRequest({
          askFrom: foundFromFollowers.askFrom,
          approved: 'false',
        })
      );
    }
    dispatch(resetApproveOrUnfollowButtomClicked());
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
                  onClick={onClickUnfollow}
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
              </Grid>
            ) : null}
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Friend;
