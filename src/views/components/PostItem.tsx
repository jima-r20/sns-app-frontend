import React, { useEffect, useState } from 'react';
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
  createMuiTheme,
  ThemeProvider,
  Chip,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { AppDispatch } from '../../stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEditPost, setSelectedPost } from '../../stores/slices/post.slice';
import {
  selectIsPostSelected,
  setPostSelected,
} from '../../stores/slices/page.slice';
import { lightBlue, red } from '@material-ui/core/colors';
import {
  setSelectedUser,
  selectMyProfile,
  selectUsers,
  fetchGetUsers,
} from '../../stores/slices/user.slice';
import { PostItemStyle } from '../../styles/PostItem.style';
import { Close } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[600],
      // contrastText: blue[900],
    },
    secondary: {
      main: red[400],
      // contrastText: red[900],
    },
  },
});

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
  const { id, postFromId, displayName, content } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  const { register, errors, handleSubmit } = useForm<FormData>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [view, setView] = useState<string>(content);

  const isPostSelected = useSelector(selectIsPostSelected);
  const myProfile = useSelector(selectMyProfile);
  const users = useSelector(selectUsers);
  const match = useRouteMatch();

  const user = users.find((u) => u.id === postFromId);

  // useEffect(() => {
  //   dispatch(fetchGetUsers());
  // }, [dispatch]);

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
  };

  const handleEditPost = handleSubmit(async (formData: FormData) => {
    const data = { ...formData, id };
    const result = await dispatch(fetchEditPost(data));
    console.log(result);
    if (fetchEditPost.fulfilled.match(result)) {
      setIsModalOpen(false);
      setView(result.payload.content);
    }
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
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
                <Divider />
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
                <Divider />
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
                            setIsModalOpen(true);
                          }}
                        />
                        <Modal
                          aria-labelledby="post-edit-modal-title"
                          aria-describedby="post-edit-modal-description"
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
                                  <h2 id="post-edit-modal-title">Edit Post</h2>
                                </Grid>
                                <Grid item xs={2}>
                                  <IconButton
                                    onClick={() => setIsModalOpen(false)}
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
                                  defaultValue={content}
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
                        />
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
      </ThemeProvider>
    </React.Fragment>
  );
};

export default PostItem;
