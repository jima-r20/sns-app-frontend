import React from 'react';
import { Avatar, Chip, Grid, Paper } from '@material-ui/core';
import { ProfileStyles } from '../../styles/Profile.style';
import { useSelector } from 'react-redux';
import { selectMyProfile } from '../../stores/slices/user.slice';

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

  const myProfile = useSelector(selectMyProfile);
  // ここから
  // →　Editボタンの表示有無
  // propsとして渡されたidがmyProfileと同じだった場合とそうじゃない場合

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item container xs={3}>
            <Grid item xs={12}>
              <Avatar className={classes.profAvatar}>{avatarIcon}</Avatar>
            </Grid>
            {id === myProfile.id ? (
              <Grid item xs={12}>
                <Chip
                  clickable
                  color="primary"
                  label="Edit"
                  component="button"
                  className={classes.editButton}
                />
              </Grid>
            ) : null}
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
