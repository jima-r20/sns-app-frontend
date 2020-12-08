import React from 'react';
import { useDispatch } from 'react-redux';
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
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { AppDispatch } from '../../stores/store';
import { fetchUpdateUser } from '../../stores/slices/user.slice';
import { ProfileEditModalStyle } from '../../styles/ProfileEditModal.style';

interface PROPS_PROFILE_EDIT_MODAL {
  id: number;
  displayName: string;
  avatar: string;
  about: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
}

interface FormData {
  displayName: string;
  // avatar: string;
  about: string;
}

const ProfileEditModal: React.FC<PROPS_PROFILE_EDIT_MODAL> = (props) => {
  const classes = ProfileEditModalStyle();
  const dispatch: AppDispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm<FormData>();
  const { id, displayName, avatar, about, isModalOpen, setIsModalOpen } = props;

  const avatarIcon =
    avatar === '' || null ? displayName.charAt(0).toUpperCase() : avatar;

  const handleUpdateProfile = handleSubmit(async (formData: FormData) => {
    const data = { ...formData, id, avatar };
    const result = await dispatch(fetchUpdateUser(data));
    if (fetchUpdateUser.fulfilled.match(result)) {
      setIsModalOpen(false);
    }
  });

  return (
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
          <Avatar className={classes.profAvatar}>{avatarIcon}</Avatar>
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
              className={classes.saveButton}
              type="submit"
            />
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ProfileEditModal;
