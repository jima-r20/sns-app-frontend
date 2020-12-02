import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Avatar, Typography, Card, Chip } from '@material-ui/core';
import { AppDispatch } from '../../stores/store';
import { selectUsers } from '../../stores/slices/user.slice';
import {
  resetApproveOrUnfollowButtomClicked,
  setApproveOrUnfollowButtomClicked,
} from '../../stores/slices/page.slice';
import {
  fetchApproveRequest,
  fetchCreateFollow,
  selectFollows,
} from '../../stores/slices/follow.slice';
import { PROPS_FRIEND_REQUEST } from '../../interfaces/component-props.interface';
import { FriendRequestItmStyle } from '../../styles/FriendRequestItem.style';

const FriendRequestItem: React.FC<PROPS_FRIEND_REQUEST> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const classes = FriendRequestItmStyle();
  const { askFrom } = props;
  const follows = useSelector(selectFollows);
  const user = useSelector(selectUsers).find((u) => u.id === askFrom);
  const avatarIcon = user?.displayName.charAt(0).toUpperCase();

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
            <Chip
              clickable
              color="primary"
              size="small"
              label="Approve"
              onClick={onClickApproveRequest}
            />
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default FriendRequestItem;
