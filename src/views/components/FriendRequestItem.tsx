import React from 'react';
import {
  Grid,
  Avatar,
  Typography,
  Card,
  Chip,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import { FriendRequestItmStyle } from '../../styles/FriendRequestItem.style';
import { blue, lightBlue, red } from '@material-ui/core/colors';

interface PROPS_FRIEND_REQUEST {
  displayName: string;
}

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

const FriendRequestItem: React.FC<PROPS_FRIEND_REQUEST> = (props) => {
  const classes = FriendRequestItmStyle();
  const { displayName } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Card variant="outlined" className={classes.friReqCard}>
        <Grid container spacing={1} className={classes.friReqContainer}>
          <Grid item xs={2}>
            <Avatar className={classes.friReqAvatar}>{avatarIcon}</Avatar>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2" component="p">
              {displayName}
            </Typography>
          </Grid>
          <Grid item xs={7} className={classes.approveButton}>
            <ThemeProvider theme={theme}>
              <Chip clickable color="primary" size="small" label="Approve" />
              <Chip clickable color="secondary" size="small" label="Reject" />
            </ThemeProvider>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default FriendRequestItem;
