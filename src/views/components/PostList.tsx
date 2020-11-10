import React from 'react';
import { Grid } from '@material-ui/core';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../stores/slices/post.slice';

const PostList: React.FC = () => {
  const posts = useSelector(selectPosts);
  console.log(posts);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {posts
          .slice(0)
          .reverse()
          .map((post) => (
            <PostItem
              displayName={post.postFrom.displayName}
              content={post.content}
            />
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
