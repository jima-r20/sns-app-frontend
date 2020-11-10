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
} from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';

interface PROPS_POST {
  displayName: string;
  content: string;
}

const PostItem: React.FC<PROPS_POST> = (props) => {
  const { displayName, content } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  const match = useRouteMatch();

  return (
    /* 
      @TODO: 詳細ページに遷移した後にクリックできないようにする必要あり 
      解決策：<Link />と<CardActionArea />が効かないようにする
    */
    <React.Fragment>
      <Grid item xs={12}>
        <Card>
          <CardActionArea>
            <Link
              to={`${match.url}/1`}
              style={{ textDecoration: 'none', color: 'inherit' }}
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
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default PostItem;
