import React from 'react';
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  Divider,
  CardContent,
  Typography,
} from '@material-ui/core';
import { TopPageStyles } from '../../styles/TopPage.styles';

interface PROPS_DM {
  displayName: string;
  message: string;
}

const DMItem: React.FC<PROPS_DM> = (props) => {
  const classes = TopPageStyles();
  const { displayName, message } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Card variant="outlined" className={classes.sideCard}>
          <CardHeader
            avatar={<Avatar className={classes.small}>{avatarIcon}</Avatar>}
            title={displayName}
          />
          <Divider />
          <CardContent>
            <Typography variant="body2" component="p">
              {message}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default DMItem;
