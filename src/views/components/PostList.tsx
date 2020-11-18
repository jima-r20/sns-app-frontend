import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PostItem from './PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyPosts, selectPosts } from '../../stores/slices/post.slice';
import { resetPostSelected } from '../../stores/slices/page.slice';
import { AppDispatch } from '../../stores/store';

interface PROPS_POSTLIST {
  mypost?: boolean;
}

const PostList: React.FC<PROPS_POSTLIST> = ({ mypost }) => {
  const posts = useSelector(selectPosts);
  const myposts = useSelector(selectMyPosts);

  const renderPosts = mypost ? myposts : posts;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPostSelected());
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {renderPosts
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
