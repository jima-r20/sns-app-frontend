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
  Icon,
} from '@material-ui/core';
import { ArrowBack, Backspace, Close, Undo } from '@material-ui/icons';

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

import { PROPS_POST } from '../../interfaces/component-props.interface';
import { PostItemStyle } from '../../styles/PostItem.style';
import ConfirmationModal from '../modals/Confirmation.modal';
import PostEditModal from '../modals/PostEdit.modal';

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
                action={
                  <IconButton
                    className={classes.backButton}
                    onClick={() => history.push('/top')}
                  >
                    <ArrowBack />
                  </IconButton>
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
                {/* 
                    自分の投稿の場合、Edit, Deleteボタンを表示 
                  */}
                {displayName === myProfile.displayName ? (
                  <React.Fragment>
                    <Grid item container xs={12} justify="center">
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
                      <PostEditModal
                        id={id}
                        isEditModalOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        view={view}
                        setView={setView}
                      />

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
                      <ConfirmationModal
                        mainText="Are you sure ?"
                        selectionText="DELETE"
                        isModalOpen={isDeleteModalOpen}
                        setIsModalOpen={setIsDeleteModalOpen}
                        handleModalFunction={() => handleDeletePost(id)}
                      />
                    </Grid>
                  </React.Fragment>
                ) : null}
              </Grid>
            </React.Fragment>
          )}
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default PostItem;
