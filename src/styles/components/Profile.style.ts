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
      marginBottom: '5%',
    },
    editButton: {
      display: 'block',
      margin: '0 auto',
      marginTop: '10%',
      marginBottom: '10%',
      paddingRight: '10%',
      paddingLeft: '10%',
    },
    requestButton: {
      display: 'block',
      margin: '0 auto',
      marginTop: '10%',
      marginBottom: '10%',
      // paddingRight: '10%',
      // paddingLeft: '10%',
    },
    name: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
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
