import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const ProfileEditModalStyle = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalPaper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    profAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: '0 auto',
      marginTop: '5%',
      marginBottom: '5%',
    },
    saveButton: {
      display: 'block',
      margin: '0 auto',
      marginTop: '10%',
      marginBottom: '10%',
      paddingRight: '10%',
      paddingLeft: '10%',
    },
  })
);
