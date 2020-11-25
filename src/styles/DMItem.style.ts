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
    },
    message: {
      marginBottom: '2%',
      paddingRight: '2%',
      paddingLeft: '2%',
      paddingTop: '5%',
      paddingBottom: '5%',
    },
  })
);
