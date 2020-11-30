import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
  Avatar,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import { AppDispatch } from '../../stores/store';
import { fetchCreatePost } from '../../stores/slices/post.slice';
import { selectMyProfile } from '../../stores/slices/user.slice';

import { CreatePostStyle } from '../../styles/CreatePost.style';
import { setSubHeaderTitle } from '../../stores/slices/page.slice';

interface FormData {
  content: string;
}

const CreatePost: React.FC = () => {
  const classes = CreatePostStyle();
  const { register, errors, handleSubmit } = useForm<{ content: string }>();
  const [content, setContent] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const myprofile = useSelector(selectMyProfile);

  useEffect(() => {
    dispatch(setSubHeaderTitle('HOME'));
  }, []);

  const handleCreatePost = handleSubmit(async (data: FormData) => {
    /* 
      @TODO: 不具合あり。
        再現方法：
          1.Post後に再度入力 
          2.その入力内容をbackspaceで削除 
          3.１文字目だけ削除するために２回押す必要がある 
          4.その後の入力は１文字目だけ一回では入力されない 
    */
    await dispatch(fetchCreatePost(data));
    setContent(''); // 投稿後、入力フォームを空にする
  });

  // Postボタンの活性化に利用
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <form noValidate onSubmit={handleCreatePost}>
          <Grid container spacing={1} className={classes.container}>
            <Grid item xs={1}>
              <Avatar className={classes.avater}>
                {myprofile.displayName.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2" component="p">
                What's happening?
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.postButton}>
              {content !== '' ? (
                <Chip
                  clickable
                  color="primary"
                  label="Post"
                  component="button"
                  type="submit"
                />
              ) : (
                <Chip label="Post" />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="content"
                name="content"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                placeholder="Let's post what happened"
                className={classes.textField}
                inputRef={register({
                  required: true,
                  maxLength: 256,
                })}
                onChange={handleChange}
                value={content}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  );
};

export default CreatePost;
