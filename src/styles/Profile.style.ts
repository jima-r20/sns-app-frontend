import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const ProfileStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: '2%',
      paddingRight: '2%',
      paddingLeft: '2%',
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
      paddingRight: '10%',
      paddingLeft: '10%',
    },
    name: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
    },
  })
);
