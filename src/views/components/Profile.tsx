import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import {
  Avatar,
  Backdrop,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { AppDispatch } from '../../stores/store';
import {
  fetchUpdateUser,
  selectMyProfile,
} from '../../stores/slices/user.slice';
import {
  fetchApproveRequest,
  fetchCreateFollow,
  fetchDeleteFollow,
  selectFollowers,
  selectFollows,
} from '../../stores/slices/follow.slice';
import {
  resetApproveOrUnfollowButtomClicked,
  setApproveOrUnfollowButtomClicked,
  setSubHeaderTitle,
} from '../../stores/slices/page.slice';

import { PROPS_PROFILE } from '../../interfaces/component-props.interface';
import { ProfileStyles } from '../../styles/Profile.style';

interface FormData {
  displayName: string;
  // avatar: string;
  about: string;
}

const Profile: React.FC<PROPS_PROFILE> = ({ profile }) => {
  const classes = ProfileStyles();
  const dispatch: AppDispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm<FormData>();
  const { id, displayName, avatar, about } = profile;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const avatarIcon =
    avatar === '' || null ? displayName.charAt(0).toUpperCase() : avatar;

  const myProfile = useSelector(selectMyProfile);
  const request = useSelector(selectFollows).find((f) => f.askTo === id);
  const isRequested: boolean = request !== undefined; // フレンド申請をしているかどうか(フォローしているかどうか)
  const foundByFollowes = useSelector(selectFollowers).find(
    (f) => f.askFrom === id
  );

  useEffect(() => {
    dispatch(setSubHeaderTitle('Profile'));
  }, []);

  const handleUpdateProfile = handleSubmit(async (formData: FormData) => {
    const data = { ...formData, id, avatar };
    const result = await dispatch(fetchUpdateUser(data));
    if (fetchUpdateUser.fulfilled.match(result)) {
      setIsModalOpen(false);
    }
  });

  const handleSendRequest = async () => {
    if (foundByFollowes) {
      // フレンド申請を送ったユーザから既に自分へフレンド申請が届いていた場合、
      // その申請を承認し、フレンドとして登録する
      dispatch(setApproveOrUnfollowButtomClicked());
      await dispatch(
        fetchApproveRequest({
          askFrom: foundByFollowes.askFrom,
          approved: 'true',
        })
      );
      await dispatch(fetchCreateFollow({ askTo: id, approved: 'true' }));
      dispatch(resetApproveOrUnfollowButtomClicked());
    } else {
      // 対象ユーザからフレンド申請が届いていない場合、申請のみを行う
      // 対象ユーザ側で承認された時にフレンドとして登録される
      await dispatch(fetchCreateFollow({ askTo: id, approved: 'false' }));
    }
  };

  const handleRemoveRequest = async () => {
    if (request) {
      await dispatch(fetchDeleteFollow(request.id));
    }
    setIsModalOpen(false);
  };

  const handleUnfollow = async () => {
    dispatch(setApproveOrUnfollowButtomClicked());
    if (request) {
      await dispatch(fetchDeleteFollow(request.id));
      await dispatch(
        fetchApproveRequest({
          askFrom: request.askTo,
          approved: 'false',
        })
      );
    }
    setIsModalOpen(false);
    dispatch(resetApproveOrUnfollowButtomClicked());
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <Avatar className={classes.profAvatar}>{avatarIcon}</Avatar>
            </Grid>

            {/* ===================================
                マイプロフィールの場合Editボタン表示
            ==================================== */}
            {id === myProfile.id ? (
              <Grid item xs={12}>
                <Chip
                  clickable
                  color="primary"
                  label="Edit"
                  component="button"
                  className={classes.editButton}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                />
                {/* <ProfileEditModal open={isModalOpen} /> */}

                {/* ===================================
                      Editボタンを押したときのモーダル
                ==================================== */}
                <Modal
                  aria-labelledby="profile-edit-modal-title"
                  aria-describedby="profile-edit-modal-description"
                  className={classes.modal}
                  open={isModalOpen}
                  onClose={() => {
                    setIsModalOpen(false);
                  }}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={isModalOpen}>
                    <div className={classes.modalPaper}>
                      <Grid container spacing={1}>
                        <Grid item xs={10}>
                          <h2 id="profile-edit-modal-title">Edit Profile</h2>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton onClick={() => setIsModalOpen(false)}>
                            <Close />
                          </IconButton>
                        </Grid>
                      </Grid>

                      <Divider />
                      <Avatar className={classes.profAvatar}>
                        {avatarIcon}
                      </Avatar>
                      <form noValidate onSubmit={handleUpdateProfile}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="displayName"
                          label="Display Name"
                          name="displayName"
                          defaultValue={displayName}
                          inputRef={register({
                            required: true,
                            minLength: 1,
                            maxLength: 20,
                          })}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          multiline
                          id="about"
                          label="About Yourself"
                          name="about"
                          defaultValue={about}
                          inputRef={register({
                            maxLength: 256,
                          })}
                        />
                        <Chip
                          clickable
                          color="primary"
                          label="Save"
                          component="button"
                          className={classes.editButton}
                          type="submit"
                        />
                      </form>
                    </div>
                  </Fade>
                </Modal>
              </Grid>
            ) : (
              // マイプロフィールの場合の要素ここまで
              /* ===================================
                    マイプロフィールではない場合
              ==================================== */
              <Grid item xs={12}>
                {!isRequested ? (
                  // パターン①：フレンド申請をしていない場合
                  <Chip
                    clickable
                    color="primary"
                    label="Send Friend Request"
                    component="button"
                    className={classes.requestButton}
                    onClick={handleSendRequest}
                  />
                ) : !request?.approved ? (
                  // パターン②：フレンド申請をしていて、承認されていない場合
                  <React.Fragment>
                    <Chip
                      clickable
                      color="primary"
                      variant="outlined"
                      label="Waiting for request approval"
                      component="button"
                      className={classes.requestButton}
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    />
                    {/* ===================================
                    Waiting for request approvalボタンを押したときのモーダル
                    ==================================== */}
                    <Modal
                      aria-labelledby="remove-request-modal-title"
                      aria-describedby="remove-request-modal-description"
                      className={classes.modal}
                      open={isModalOpen}
                      onClose={() => {
                        setIsModalOpen(false);
                      }}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={isModalOpen}>
                        <div className={classes.modalPaper}>
                          <Typography variant="h6" align="center" gutterBottom>
                            Do you want to remove the follow request ?
                          </Typography>
                          <Card variant="outlined">
                            <CardActionArea onClick={handleRemoveRequest}>
                              <CardContent>
                                <Typography
                                  variant="body1"
                                  align="center"
                                  color="secondary"
                                >
                                  REMOVE
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <Divider />
                            <CardActionArea
                              onClick={() => setIsModalOpen(false)}
                            >
                              <CardContent>
                                <Typography variant="body1" align="center">
                                  Cancel
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </div>
                      </Fade>
                    </Modal>
                  </React.Fragment>
                ) : (
                  // パターン③：フレンド申請をしていて、承認されている場合
                  <React.Fragment>
                    <Chip
                      clickable
                      color="primary"
                      label="Following"
                      component="button"
                      className={classes.requestButton}
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    />
                    {/* ===================================
                        Unfollowボタンを押したときのモーダル
                    ==================================== */}
                    <Modal
                      aria-labelledby="unfollow-modal-title"
                      aria-describedby="unfollow-modal-description"
                      className={classes.modal}
                      open={isModalOpen}
                      onClose={() => {
                        setIsModalOpen(false);
                      }}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={isModalOpen}>
                        <div className={classes.modalPaper}>
                          <Typography variant="h6" align="center" gutterBottom>
                            Do you want to unfollow ?
                          </Typography>
                          <Card variant="outlined">
                            <CardActionArea onClick={handleUnfollow}>
                              <CardContent>
                                <Typography
                                  variant="body1"
                                  align="center"
                                  color="secondary"
                                >
                                  UNFOLLOW
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <Divider />
                            <CardActionArea
                              onClick={() => setIsModalOpen(false)}
                            >
                              <CardContent>
                                <Typography variant="body1" align="center">
                                  Cancel
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </div>
                      </Fade>
                    </Modal>
                  </React.Fragment>
                )}
              </Grid>
              // マイプロフィールではない場合の要素ここまで
            )}
          </Grid>
          <Grid item container xs={9}>
            <Grid item xs={12} className={classes.name}>
              {displayName}
            </Grid>
            <Grid item xs={12}>
              {about}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Profile;
