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

interface PROPS_POST {
  displayName: string;
  content: string;
}

const PostItem: React.FC<PROPS_POST> = (props) => {
  const { displayName, content } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Card>
          <CardActionArea>
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
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default PostItem;
