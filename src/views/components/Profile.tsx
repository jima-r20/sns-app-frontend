import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import {
  Avatar,
  Backdrop,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

// import ProfileEditModal from '../modals/ProfileEdit.modal';

import { AppDispatch } from '../../stores/store';
import {
  fetchUpdateUser,
  selectMyProfile,
} from '../../stores/slices/user.slice';

import { ProfileStyles } from '../../styles/Profile.style';
import {
  fetchCreateFollow,
  selectFollows,
} from '../../stores/slices/follow.slice';

interface PROPS_PROFILE {
  profile: {
    id: number;
    displayName: string;
    avatar: string;
    about: string;
  };
}

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

  // if (isRequested) {
  //   const isApproved = request?.approved; // 既にフォロー済みの場合、承認されているかどうか
  // }

  console.log(request);
  console.log(isRequested);

  const handleUpdateProfile = handleSubmit(async (formData: FormData) => {
    const data = { ...formData, id, avatar };
    const result = await dispatch(fetchUpdateUser(data));
    if (fetchUpdateUser.fulfilled.match(result)) {
      setIsModalOpen(false);
    }
  });

  const handleSendRequest = async () => {
    await dispatch(fetchCreateFollow({ askTo: id, approved: 'false' }));
  };

  const handleRemoveRequest = async () => {
    console.log('remove request');
  };

  const handleUnfollow = async () => {
    console.log('unfollow');
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
              /* 
                プロフィールページが自分ではない場合フォローボタンを追加する
                [Send Friend Request]、[Waiting for request approval]、[Following]
                のいずれか
              */
              <Grid item xs={12}>
                {!isRequested ? (
                  // フレンド申請をしていない場合
                  <Chip
                    clickable
                    color="primary"
                    label="Send Friend Request"
                    component="button"
                    className={classes.requestButton}
                    onClick={handleSendRequest}
                  />
                ) : !request?.approved ? (
                  // フレンド申請をしていて、承認されていない場合
                  <React.Fragment>
                    <Chip
                      label="Waiting for request approval"
                      component="button"
                      className={classes.requestButton}
                      disabled
                    />
                    <Chip
                      color="secondary"
                      variant="outlined"
                      label="Remove Request?"
                      component="button"
                      className={classes.requestButton}
                      onClick={handleRemoveRequest}
                    />
                  </React.Fragment>
                ) : (
                  // フレンド申請をしていて、承認されている場合
                  <Chip
                    clickable
                    color="primary"
                    label="Following"
                    component="button"
                    className={classes.requestButton}
                    onClick={handleUnfollow}
                  />
                )}
              </Grid>
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
