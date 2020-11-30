import React, { useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  Grid,
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
  Divider,
  CardContent,
  Typography,
  Button,
  Chip,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { AppDispatch } from '../../stores/store';
import {
  fetchDeletePost,
  fetchEditPost,
  setSelectedPost,
} from '../../stores/slices/post.slice';
import {
  selectIsPostSelected,
  setPostSelected,
  setSubHeaderTitle,
} from '../../stores/slices/page.slice';
import {
  setSelectedUser,
  selectMyProfile,
  selectUsers,
} from '../../stores/slices/user.slice';

import { PostItemStyle } from '../../styles/PostItem.style';

interface PROPS_POST {
  id: number;
  postFromId: number;
  displayName: string;
  content: string;
}

interface FormData {
  content: string;
}

const PostItem: React.FC<PROPS_POST> = (props) => {
  const classes = PostItemStyle();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const { id, postFromId, displayName, content } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  const { register, errors, handleSubmit } = useForm<FormData>();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [view, setView] = useState<string>(content); // 投稿編集後にページに反映させるために必要

  const isPostSelected = useSelector(selectIsPostSelected);
  const myProfile = useSelector(selectMyProfile);
  const users = useSelector(selectUsers);

  const user = users.find((u) => u.id === postFromId);

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

  const onContentClick = () => {
    dispatch(
      setSelectedPost({
        id,
        postFromId,
        content,
        displayName,
      })
    );
    dispatch(setPostSelected());
    dispatch(setSubHeaderTitle('Post Detail'));
  };

  const handleEditPost = handleSubmit(async (formData: FormData) => {
    const data = { ...formData, id };
    const result = await dispatch(fetchEditPost(data));
    if (fetchEditPost.fulfilled.match(result)) {
      setIsEditModalOpen(false);
      setView(result.payload.content);
    }
  });

  const handleDeletePost = async (id: number) => {
    const result = await dispatch(fetchDeletePost(id));
    if (fetchDeletePost.fulfilled.match(result)) {
      setIsDeleteModalOpen(false);
      history.push('/top');
    }
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Card>
          {!isPostSelected ? (
            /* ============================
                投稿詳細ページではない場合 
              ============================ */
            <React.Fragment>
              <CardHeader
                avatar={
                  <Link
                    to={
                      displayName === myProfile.displayName
                        ? '/top/myprofile'
                        : `/top/profile/${postFromId}`
                    }
                    className={classes.link}
                    onClick={onAvatarClick}
                  >
                    <Avatar>{avatarIcon}</Avatar>
                  </Link>
                }
                title={displayName}
              />
              <CardActionArea>
                <Link
                  to={`${match.url}/post/${id}`}
                  className={classes.link}
                  onClick={onContentClick}
                >
                  <CardContent>
                    <Typography variant="body2" component="p">
                      {content}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </React.Fragment>
          ) : (
            /* ============================
                  投稿詳細ページの場合 
            ============================ */
            <React.Fragment>
              <CardHeader
                avatar={
                  <Link
                    to={
                      displayName === myProfile.displayName
                        ? '/top/myprofile'
                        : `/top/profile/${postFromId}`
                    }
                    className={classes.link}
                    onClick={onAvatarClick}
                  >
                    <Avatar>{avatarIcon}</Avatar>
                  </Link>
                }
                title={displayName}
              />
              <CardContent>
                <Typography variant="body2" component="p">
                  {/* {content} */}
                  {view}
                </Typography>
              </CardContent>
              <Grid container spacing={1}>
                <Grid item xs={4}></Grid>
                {/* 
                    自分の投稿の場合、Edit, Deleteボタンを表示 
                  */}
                {displayName === myProfile.displayName ? (
                  <React.Fragment>
                    <Grid item container xs={2} justify="center">
                      <Chip
                        clickable
                        color="primary"
                        label="Edit"
                        component="button"
                        className={classes.button}
                        onClick={() => {
                          setIsEditModalOpen(true);
                        }}
                      />
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
                    </Grid>

                    <Grid item container xs={2} justify="center">
                      <Chip
                        clickable
                        color="secondary"
                        label="Delete"
                        component="button"
                        className={classes.button}
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                        }}
                      />
                      <Modal
                        aria-labelledby="post-delete-modal-title"
                        aria-describedby="post-delete-modal-description"
                        className={classes.modal}
                        open={isDeleteModalOpen}
                        onClose={() => {
                          setIsDeleteModalOpen(false);
                        }}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={isDeleteModalOpen}>
                          <div className={classes.modalPaper}>
                            <Typography
                              variant="h6"
                              align="center"
                              gutterBottom
                            >
                              Are you sure ?
                            </Typography>
                            <Card variant="outlined">
                              <CardActionArea
                                onClick={() => handleDeletePost(id)}
                              >
                                <CardContent>
                                  <Typography
                                    variant="body1"
                                    align="center"
                                    color="secondary"
                                  >
                                    DELETE
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                              <Divider />
                              <CardActionArea
                                onClick={() => setIsDeleteModalOpen(false)}
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
                    </Grid>
                  </React.Fragment>
                ) : (
                  <Grid item xs={4}></Grid>
                )}

                <Grid item xs={4}>
                  <Button className={classes.backButton}>
                    <Link to="/top" className={classes.link}>
                      Back
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default PostItem;
