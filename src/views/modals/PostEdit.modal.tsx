import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
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
import { fetchEditPost } from '../../stores/slices/post.slice';
import { PostEditModalStyle } from '../../styles/modals/PostEditModal.style';

interface PROPS_POST_EDIT_MODAL {
  id: number;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (value: React.SetStateAction<boolean>) => void;
  view: string;
  setView: (value: React.SetStateAction<string>) => void;
}

interface FormData {
  content: string;
}

const PostEditModal: React.FC<PROPS_POST_EDIT_MODAL> = (props) => {
  const classes = PostEditModalStyle();
  const dispatch: AppDispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm<FormData>();
  const { id, isEditModalOpen, setIsEditModalOpen, view, setView } = props;

  const handleEditPost = handleSubmit(async (formData: FormData) => {
    const data = { ...formData, id };
    const result = await dispatch(fetchEditPost(data));
    if (fetchEditPost.fulfilled.match(result)) {
      setIsEditModalOpen(false);
      setView(result.payload.content);
    }
  });

  return (
    <Modal
      aria-labelledby="post-edit-modal-title"
      aria-describedby="post-edit-modal-description"
      className={classes.modal}
      open={isEditModalOpen}
      onClose={() => {
        setIsEditModalOpen(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isEditModalOpen}>
        <div className={classes.modalPaper}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <h2 id="post-edit-modal-title">Edit Post</h2>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                className={classes.closeButton}
                onClick={() => setIsEditModalOpen(false)}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>

          <Divider />
          <form noValidate onSubmit={handleEditPost}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              id="content"
              label="Content"
              name="content"
              defaultValue={view}
              inputRef={register({
                required: true,
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

export default PostEditModal;
