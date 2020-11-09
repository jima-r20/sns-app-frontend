import React from 'react';
import {
  Grid,
  Avatar,
  Divider,
  Typography,
  Paper,
  CardActionArea,
  Card,
} from '@material-ui/core';
import { DMItemStyle } from '../../styles/DMItem.style';

interface PROPS_DM {
  displayName: string;
  message: string;
}

const DMItem: React.FC<PROPS_DM> = (props) => {
  const classes = DMItemStyle();
  const { displayName, message } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Card variant="outlined" className={classes.DMCard}>
        <CardActionArea>
          <Grid container spacing={1} className={classes.DMContainer}>
            <Grid item xs={2}>
              <Avatar className={classes.DMAvatar}>{avatarIcon}</Avatar>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2" component="p">
                {displayName}
              </Typography>
            </Grid>
            <Divider />
            <Grid
              item
              xs={12}
              style={{ paddingRight: '5%', paddingLeft: '17%' }}
            >
              {/* <Paper variant="outlined" className={classes.DMTextPaper}> */}
              {/* <Typography variant="body2" component="p"> */}
              <Typography variant="caption">{message}</Typography>
              {/* </Paper> */}
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

export default DMItem;
