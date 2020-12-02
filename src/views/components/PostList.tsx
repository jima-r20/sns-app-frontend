import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import PostItem from './PostItem';
import { AppDispatch } from '../../stores/store';
import {
  fetchGetMyPosts,
  fetchGetPosts,
  fetchGetUserPosts,
  selectMyPosts,
  selectPosts,
  selectUserPosts,
} from '../../stores/slices/post.slice';
import { resetPostSelected } from '../../stores/slices/page.slice';
import { PROPS_POSTLIST } from '../../interfaces/component-props.interface';
import { selectMyProfile } from '../../stores/slices/user.slice';

const PostList: React.FC<PROPS_POSTLIST> = ({ mypost, postFromId }) => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const myposts = useSelector(selectMyPosts);
  const userPosts = useSelector(selectUserPosts);
  const myProfile = useSelector(selectMyProfile);

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
    dispatch(resetPostSelected());
    if (postFromId !== (0 || undefined)) {
      dispatch(fetchGetUserPosts(postFromId));
    }
    /* プロフィール更新時、PostListのdisplayNameを
       再レンダリングするために以下の呼び出しが必要 */
    dispatch(fetchGetPosts());
    dispatch(fetchGetMyPosts());
  }, [dispatch, postFromId, myProfile]);

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
