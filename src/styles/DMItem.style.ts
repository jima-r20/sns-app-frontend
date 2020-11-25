import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const DMItemStyle = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    paper: {
      marginBottom: '2%',
      paddingRight: '2%',
      paddingLeft: '2%',
      height: '70vh',
    },
    name: {
      display: 'flex',
      alignItems: 'center',
    },
    messageArea: {
      overflow: 'auto',
      backgroundColor: '#eee',
      height: '50vh',
    },
    message: {
      marginTop: '2%',
      marginBottom: '2%',
      paddingRight: '2%',
      paddingLeft: '2%',
      paddingTop: '5%',
      paddingBottom: '5%',
    },
    sendButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);
