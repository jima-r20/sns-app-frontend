import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const FriendStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: '2%',
      paddingRight: '2%',
      paddingLeft: '2%',
    },
    avatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      margin: '0 auto',
      marginTop: '5%',
      marginBottom: '5%',
    },
    displayName: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
    },
    button: {
      display: 'block',
      marginLeft: 'auto',
    },

    // modal: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // modalPaper: {
    //   backgroundColor: theme.palette.background.paper,
    //   boxShadow: theme.shadows[5],
    //   padding: theme.spacing(2, 4, 3),
    // },
  })
);
