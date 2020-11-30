import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Grid,
  Avatar,
  Divider,
  Typography,
  CardActionArea,
  Card,
} from '@material-ui/core';

import { AppDispatch } from '../../stores/store';
import { selectUsers } from '../../stores/slices/user.slice';
import { setSelectedDM } from '../../stores/slices/dm.slice';
import {
  setDMSelected,
  setSubHeaderTitle,
} from '../../stores/slices/page.slice';

import { RightSideBarDMItemStyle } from '../../styles/RightSideBarDMItem.style';

interface PROPS_DM {
  targetUser: number;
  messages: [
    {
      id: number;
      sender: number;
      receiver: number;
      message: string;
    }
  ];
}

const RightSideBarDMItem: React.FC<PROPS_DM> = (props) => {
  const classes = RightSideBarDMItemStyle();
  const dispatch: AppDispatch = useDispatch();
  const { targetUser, messages } = props;
  const user = useSelector(selectUsers).find((u) => u.id === targetUser);
  const avatarIcon = user?.displayName.charAt(0).toUpperCase();

  const onMessageClick = () => {
    dispatch(
      setSelectedDM({
        targetUser,
        messages,
      })
    );
    dispatch(setDMSelected());
    dispatch(setSubHeaderTitle('DM Detail'));
  };

  return (
    <React.Fragment>
      <Card variant="outlined" className={classes.card}>
        <CardActionArea>
          <Link
            to={`/top/dm/${targetUser}`}
            className={classes.link}
            onClick={onMessageClick}
          >
            <Grid container spacing={1} className={classes.container}>
              <Grid item xs={2}>
                <Avatar className={classes.avatar}>{avatarIcon}</Avatar>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body2" component="p">
                  {user?.displayName}
                </Typography>
              </Grid>
              <Divider />
              <Grid item xs={12}>
                {/* <Paper variant="outlined" className={classes.DMTextPaper}> */}
                {/* <Typography variant="body2" component="p"> */}
                <Typography variant="caption" className={classes.message}>
                  {messages[0].message}
                </Typography>
                {/* </Paper> */}
              </Grid>
            </Grid>
          </Link>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

export default RightSideBarDMItem;
