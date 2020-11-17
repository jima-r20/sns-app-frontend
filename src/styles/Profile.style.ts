import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const ProfileStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    profAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: '0 auto',
      marginTop: '5%',
    },
    editButton: {
      display: 'block',
      margin: '0 auto',
      marginTop: '10%',
      marginBottom: '10%',
    },
    name: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
    },
  })
);
