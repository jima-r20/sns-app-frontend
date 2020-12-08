import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const PostEditModalStyle = makeStyles((theme: Theme) =>
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
      width: '50%',
    },
    profAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: '0 auto',
      marginTop: '5%',
      marginBottom: '5%',
    },
    closeButton: {
      display: 'block',
      marginLeft: 'auto',
    },
    saveButton: {
      display: 'block',
      margin: '0 auto',
      marginTop: '5%',
      marginBottom: '5%',
      paddingRight: '10%',
      paddingLeft: '10%',
    },
  })
);
