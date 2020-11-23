import React from 'react';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';

const DMItem: React.FC = () => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Card>
          <CardHeader avatar={<Avatar>a</Avatar>} title="aaa" />
          <CardActionArea>
            <CardContent>
              <Typography variant="body2" component="p">
                Hello, how are you ?
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default DMItem;
