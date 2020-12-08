import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const PostItemStyle = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    button: {
      margin: theme.spacing(1, 1, 2, 2),
      width: '15%',
    },
    backButton: {
      display: 'block',
      marginLeft: 'auto',
    },
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
