import React from 'react';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, setSelectedUser } from '../../stores/slices/user.slice';
import {
  selectIsDMSelected,
  setDMSelected,
} from '../../stores/slices/page.slice';
import { AppDispatch } from '../../stores/store';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { DMItemStyle } from '../../styles/DMItem.style';
import { setSelectedDM } from '../../stores/slices/dm.slice';

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

const DMItem: React.FC<PROPS_DM> = (props) => {
  const classes = DMItemStyle();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const { targetUser, messages } = props;
  const user = useSelector(selectUsers).find((u) => u.id === targetUser);
  const avatarIcon = user?.displayName.charAt(0).toUpperCase();
  const isDMSelected = useSelector(selectIsDMSelected);

  const onAvatarClick = () => {
    dispatch(
      setSelectedUser({
        id: user?.id,
        displayName: user?.displayName,
        avatar: user?.avatar,
        about: user?.about,
      })
    );
  };

  const onMessageClick = () => {
    dispatch(
      setSelectedDM({
        targetUser,
        messages,
      })
    );
    dispatch(setDMSelected());
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        {!isDMSelected ? (
          <Card>
            <CardHeader
              avatar={
                <Link
                  to={`/top/profile/${targetUser}`}
                  className={classes.link}
                  onClick={onAvatarClick}
                >
                  <Avatar>{avatarIcon}</Avatar>
                </Link>
              }
              title={user?.displayName}
            />
            <CardActionArea>
              <Link
                to={`${match.url}/${targetUser}`}
                className={classes.link}
                onClick={onMessageClick}
              >
                <CardContent>
                  <Typography variant="body2" component="p">
                    {messages[0].message}
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        ) : (
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <Link
                  to={`/top/profile/${targetUser}`}
                  className={classes.link}
                  onClick={onAvatarClick}
                >
                  <Avatar>{avatarIcon}</Avatar>
                </Link>
              </Grid>
              <Grid item xs={11} className={classes.name}>
                <Typography variant="body1">{user?.displayName}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" className={classes.messageArea}>
                  {messages
                    .slice(0)
                    .reverse()
                    .map((m) =>
                      m.sender === user?.id ? (
                        // 相手のDM表示
                        <React.Fragment>
                          <Grid container spacing={1}>
                            <Grid item xs={1} />
                            <Grid item xs={4}>
                              <Paper
                                className={classes.message}
                                key={m.message}
                              >
                                {m.message}
                              </Paper>
                            </Grid>
                            <Grid item xs={7} />
                          </Grid>
                        </React.Fragment>
                      ) : (
                        // 自身のDM表示
                        <React.Fragment>
                          <Grid container spacing={1}>
                            <Grid item xs={7} />
                            <Grid item xs={4}>
                              <Paper
                                className={classes.message}
                                key={m.message}
                              >
                                {m.message}
                              </Paper>
                            </Grid>
                            <Grid item xs={1} />
                          </Grid>
                        </React.Fragment>
                      )
                    )}
                </Paper>
              </Grid>

              <Grid item xs={11}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  multiline
                  id="message"
                  label="Message"
                  name="message"
                />
              </Grid>
              <Grid item xs={1} className={classes.sendButton}>
                <Chip
                  clickable
                  color="primary"
                  label="Send"
                  component="button"
                  // type='submit'
                />
              </Grid>
            </Grid>
          </Paper>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default DMItem;
