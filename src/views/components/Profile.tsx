import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { selectMyProfile } from '../../stores/slices/user.slice';
import ProfileEditModal from '../modals/ProfileEdit.modal';
import { Close } from '@material-ui/icons';

interface PROPS_PROFILE {
  profile: {
    id: number;
    displayName: string;
    avatar: string;
    about: string;
  };
}

const Profile: React.FC<PROPS_PROFILE> = ({ profile }) => {
  const classes = ProfileStyles();
  const { id, displayName, avatar, about } = profile;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const avatarIcon =
    avatar === '' || null ? displayName.charAt(0).toUpperCase() : avatar;

  const myProfile = useSelector(selectMyProfile);

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <Avatar className={classes.profAvatar}>{avatarIcon}</Avatar>
            </Grid>
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
                    console.log('open');
                  }}
                />
                {/* <ProfileEditModal open={isModalOpen} /> */}
                <Modal
                  aria-labelledby="profile-edit-modal-title"
                  aria-describedby="profile-edit-modal-description"
                  className={classes.modal}
                  open={isModalOpen}
                  onClose={() => {
                    setIsModalOpen(false);
                    console.log('close');
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
                      <form>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="displayName"
                          label="Display Name"
                          name="displayName"
                          defaultValue={displayName}
                          // inputRef={register({
                          //   required: true,
                          //   minLength: 1,
                          //   maxLength: 20,
                          // })}
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
                          // inputRef={register({
                          //   maxLength: 256,
                          // })}
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
