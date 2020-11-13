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
  resetPostSelected,
  selectIsPostSelected,
  setPostSelected,
} from '../../stores/slices/page.slice';
import { lightBlue, red } from '@material-ui/core/colors';
import { selectMyProfile } from '../../stores/slices/user.slice';

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
  displayName: string;
  content: string;
}

const PostItem: React.FC<PROPS_POST> = (props) => {
  const { id, displayName, content } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();
  const dispatch: AppDispatch = useDispatch();
  const isPostSelected = useSelector(selectIsPostSelected);
  const myprofile = useSelector(selectMyProfile);

  const match = useRouteMatch();

  return (
    /* 
      @TODO: 詳細ページに遷移した後にクリックできないようにする必要あり 
      解決策：<Link />と<CardActionArea />が効かないようにする
    */
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Grid item xs={12}>
          <Card>
            {!isPostSelected ? (
              /* ============================
                投稿詳細ページではない場合 
            ============================ */
              <CardActionArea>
                <Link
                  to={`${match.url}/post/${id}`}
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
