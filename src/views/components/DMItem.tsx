import React, { useState } from 'react';
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
import {
  selectMyProfile,
  selectUsers,
  setSelectedUser,
} from '../../stores/slices/user.slice';
import {
  selectIsDMSelected,
  setDMSelected,
} from '../../stores/slices/page.slice';
import { AppDispatch } from '../../stores/store';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { DMItemStyle } from '../../styles/DMItem.style';
import {
  fetchCreateDm,
  fetchGetDmInbox,
  selectDmInbox,
  setSelectedDM,
} from '../../stores/slices/dm.slice';
import { useForm } from 'react-hook-form';

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

interface FormData {
  message: string;
}

const DMItem: React.FC<PROPS_DM> = (props) => {
  const classes = DMItemStyle();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const { register, errors, handleSubmit } = useForm();
  const [inputMessage, setInputMessage] = useState<string>('');
  const { targetUser, messages } = props;
  const user = useSelector(selectUsers).find((u) => u.id === targetUser);
  const DMInboxByTargetUser = useSelector(selectDmInbox).find(
    (u) => u.targetUser === targetUser
  );
  const avatarIcon = user?.displayName.charAt(0).toUpperCase();
  const isDMSelected = useSelector(selectIsDMSelected);
  const myProfile = useSelector(selectMyProfile);

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

  const handlePostDM = handleSubmit(async (formData: FormData) => {
    const data = { ...formData, receiver: targetUser };
    await dispatch(fetchCreateDm(data));
    await dispatch(fetchGetDmInbox(myProfile.id));
    setInputMessage(''); // 返信後、入力フォームを空にする
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        {!isDMSelected ? (
          /* ============================
                DM詳細ページではない場合 
          ============================ */
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
          /* ============================
                DM詳細ページの場合 
          ============================ */
          <Paper className={classes.paper}>
            <form noValidate onSubmit={handlePostDM}>
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
                    {DMInboxByTargetUser?.messages
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

                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={11}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      multiline
                      id="message"
                      label="Message"
                      // placeholder="Message"
                      name="message"
                      inputRef={register({
                        required: true,
                      })}
                      onChange={handleChange}
                      value={inputMessage}
                    />
                  </Grid>
                  <Grid item xs={1} className={classes.sendButton}>
                    {inputMessage.length !== 0 ? (
                      <Chip
                        clickable
                        color="primary"
                        label="Send"
                        component="button"
                        type="submit"
                      />
                    ) : (
                      <Chip label="Send" />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default DMItem;
