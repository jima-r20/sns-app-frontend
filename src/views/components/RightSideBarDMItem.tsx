import React from 'react';
import {
  Grid,
  Avatar,
  Divider,
  Typography,
  CardActionArea,
  Card,
} from '@material-ui/core';
import { RightSideBarDMItemStyle } from '../../styles/RightSideBarDMItem.style';

interface PROPS_DM {
  displayName: string;
  message: string;
}

const RightSideBarDMItem: React.FC<PROPS_DM> = (props) => {
  const classes = RightSideBarDMItemStyle();
  const { displayName, message } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Card variant="outlined" className={classes.card}>
        <CardActionArea>
          <Grid container spacing={1} className={classes.container}>
            <Grid item xs={2}>
              <Avatar className={classes.avatar}>{avatarIcon}</Avatar>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body2" component="p">
                {displayName}
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              {/* <Paper variant="outlined" className={classes.DMTextPaper}> */}
              {/* <Typography variant="body2" component="p"> */}
              <Typography variant="caption" className={classes.message}>
                {message}
              </Typography>
              {/* </Paper> */}
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

export default RightSideBarDMItem;
