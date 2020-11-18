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
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { AppDispatch } from '../../stores/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPost } from '../../stores/slices/post.slice';
import {
  selectIsPostSelected,
  setPostSelected,
} from '../../stores/slices/page.slice';
import { lightBlue, red } from '@material-ui/core/colors';
import {
  setSelectedUser,
  selectMyProfile,
  selectUsers,
} from '../../stores/slices/user.slice';

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

const PostItem: React.FC<PROPS_POST> = (props) => {
  const { id, postFromId, displayName, content } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();
  const dispatch: AppDispatch = useDispatch();
  const isPostSelected = useSelector(selectIsPostSelected);
  const myprofile = useSelector(selectMyProfile);
  const users = useSelector(selectUsers);
  const match = useRouteMatch();

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
  };

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
                        displayName === myprofile.displayName
                          ? '/top/myprofile'
                          : `/top/profile/${postFromId}`
                      }
                      style={{ textDecoration: 'none', color: 'inherit' }}
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
                    style={{ textDecoration: 'none', color: 'inherit' }}
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
                        displayName === myprofile.displayName
                          ? '/top/myprofile'
                          : `/top/profile/${postFromId}`
                      }
                      style={{ textDecoration: 'none', color: 'inherit' }}
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
                    {content}
                  </Typography>
                </CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={4}></Grid>
                  {/* 
                    自分の投稿の場合、Edit, Deleteボタンを表示 
                  */}
                  {displayName === myprofile.displayName ? (
                    <React.Fragment>
                      <Grid item container xs={2} justify="center">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginBottom: '5%' }}
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid item container xs={2} justify="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ marginBottom: '5%' }}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    <Grid item xs={4}></Grid>
                  )}

                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      style={{
                        margin: '2%',
                        display: 'block',
                        marginLeft: 'auto',
                      }}
                    >
                      <Link
                        to="/top"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
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
