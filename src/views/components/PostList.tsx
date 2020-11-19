import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import PostItem from './PostItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGetMyPosts,
  fetchGetPosts,
  fetchGetUserPosts,
  selectMyPosts,
  selectPosts,
  selectUserPosts,
} from '../../stores/slices/post.slice';
import { resetPostSelected } from '../../stores/slices/page.slice';
import { AppDispatch } from '../../stores/store';

interface PROPS_POSTLIST {
  mypost?: boolean;
  postFromId?: number;
}

const PostList: React.FC<PROPS_POSTLIST> = ({ mypost, postFromId }) => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const myposts = useSelector(selectMyPosts);
  const userPosts = useSelector(selectUserPosts);

  let renderPosts;
  if (mypost) {
    // マイプロフィールページでのリスト表示
    renderPosts = myposts;
  } else if (!mypost && postFromId !== (0 || undefined)) {
    // 自分以外のユーザの詳細ページでのリスト表示
    renderPosts = userPosts;
  } else {
    // トップページでのリスト表示
    renderPosts = posts;
  }

  useEffect(() => {
    console.log('post list render');
    dispatch(resetPostSelected());
    if (postFromId !== (0 || undefined)) {
      dispatch(fetchGetUserPosts(postFromId));
    }
  }, [dispatch, postFromId]);

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
              postFromId={post.postFromId}
              displayName={post.postFrom.displayName}
              content={post.content}
            />
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
