import React from 'react';
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
} from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { AppDispatch } from '../../stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPost } from '../../stores/slices/post.slice';
import {
  resetPostSelected,
  selectIsPostSelected,
  setPostSelected,
} from '../../stores/slices/page.slice';

interface PROPS_POST {
  id: number;
  displayName: string;
  content: string;
}

const PostItem: React.FC<PROPS_POST> = (props) => {
  const { id, displayName, content } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();
  const dispatch: AppDispatch = useDispatch();
  const isPostSelected = useSelector(selectIsPostSelected);

  const match = useRouteMatch();

  return (
    /* 
      @TODO: 詳細ページに遷移した後にクリックできないようにする必要あり 
      解決策：<Link />と<CardActionArea />が効かないようにする
    */
    <React.Fragment>
      <Grid item xs={12}>
        <Card>
          {!isPostSelected ? (
            /* ============================
                投稿詳細ページではない場合 
            ============================ */
            <CardActionArea>
              <Link
                to={`${match.url}/${id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => {
                  dispatch(setSelectedPost({ id, content, displayName }));
                  dispatch(setPostSelected());
                }}
              >
                <CardHeader
                  avatar={<Avatar>{avatarIcon}</Avatar>}
                  title={displayName}
                />
                <Divider />
                <CardContent>
                  <Typography variant="body2" component="p">
                    {content}
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          ) : (
            /* ============================
                  投稿詳細ページの場合 
            ============================ */
            <React.Fragment>
              <CardHeader
                avatar={<Avatar>{avatarIcon}</Avatar>}
                title={displayName}
              />
              <Divider />
              <CardContent>
                <Typography variant="body2" component="p">
                  {content}
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                style={{
                  margin: '2%',
                  display: 'block',
                  marginLeft: 'auto',
                }}
              >
                <Link
                  to="/posts"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  // onClick={() => {
                  //   dispatch(resetPostSelected());
                  // }}
                >
                  Back
                </Link>
              </Button>
            </React.Fragment>
          )}
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default PostItem;
