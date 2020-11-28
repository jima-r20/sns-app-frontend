import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const CreateDMStyle = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginBottom: '2%',
      padding: '2% 5%',
    },
    sendButton: {
      display: 'block',
      margin: '0 auto',
      paddingRight: '10%',
      paddingLeft: '10%',
    },
  })
);
