import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PostItem from './PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts } from '../../stores/slices/post.slice';
import { resetPostSelected } from '../../stores/slices/page.slice';
import { AppDispatch } from '../../stores/store';

const PostList: React.FC = () => {
  const posts = useSelector(selectPosts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPostSelected());
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {posts
          .slice(0)
          .reverse()
          .map((post) => (
            <PostItem
              key={post.id}
              id={post.id}
              displayName={post.postFrom.displayName}
              content={post.content}
            />
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
