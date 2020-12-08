import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const CreatePostStyle = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: '2%',
      paddingRight: '2%',
      paddingLeft: '2%',
      // position: 'fixed',
      // zIndex: 1,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: '1%',
    },
    avater: {
      margin: '0 auto',
    },
    postButton: {
      display: 'flex',
      justifyContent: 'center',
    },
    textField: {
      paddingRight: '5%',
      paddingLeft: '5%',
      paddingBottom: '2%',
    },
  })
);
