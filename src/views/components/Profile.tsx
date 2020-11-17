import React from 'react';
import { Avatar, Button, Grid, Paper } from '@material-ui/core';
import { ProfileStyles } from '../../styles/Profile.style';

interface PROPS_PROFILE {
  profile: {
    id: number;
    displayName: string;
    avatar: string;
    about: string;
  };
}

const Profile: React.FC<PROPS_PROFILE> = ({ profile }) => {
  const classes = ProfileStyles();
  const { id, displayName, avatar, about } = profile;
  const avatarIcon =
    avatar === '' || null ? displayName.charAt(0).toUpperCase() : avatar;

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Grid container spacing={1}>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <Avatar className={classes.profAvatar}>{avatarIcon}</Avatar>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.editButton}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid item container xs={9}>
            <Grid item xs={12} className={classes.name}>
              {displayName}
            </Grid>
            <Grid item xs={12}>
              {about}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Profile;
