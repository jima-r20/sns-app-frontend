import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Backdrop,
  Button,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
} from '@material-ui/core';
import { ProfileStyles } from '../../styles/Profile.style';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetUsers,
  fetchUpdateUser,
  selectMyProfile,
} from '../../stores/slices/user.slice';
// import ProfileEditModal from '../modals/ProfileEdit.modal';
import { Close } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { PROPS_UPDATE_USER } from '../../types';
import { AppDispatch } from '../../stores/store';

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
  const { register, errors, handleSubmit } = useForm<FormData>();
  const dispatch: AppDispatch = useDispatch();
  const { id, displayName, avatar, about } = profile;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const avatarIcon =
    avatar === '' || null ? displayName.charAt(0).toUpperCase() : avatar;

  const myProfile = useSelector(selectMyProfile);

  const handleUpdateProfile = handleSubmit(async (formData: FormData) => {
    const data = { ...formData, id, avatar };
    const result = await dispatch(fetchUpdateUser(data));
    if (fetchUpdateUser.fulfilled.match(result)) {
      setIsModalOpen(false);
    }
  });

  // useEffect(() => {
  //   dispatch(fetchGetUsers());
  // }, [myProfile]);

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
            ) : null}
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
