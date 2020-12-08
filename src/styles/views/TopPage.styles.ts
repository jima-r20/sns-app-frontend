import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const TopPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      backgroundColor: '#ddd',
    },
    container: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(4),
    },
    subHeader: {
      position: 'fixed',
      width: '100%',
      zIndex: 1,
      backgroundColor: '#fff',
    },
    pageTitle: {
      fontWeight: 'bold',
      paddingTop: theme.spacing(1),
    },
    // paper: {  // いらないかも
    //   padding: theme.spacing(2),
    //   display: 'flex',
    //   overflow: 'auto',
    //   flexDirection: 'column',
    // },
    // fixedHeight: {  // いらないかも
    //   height: 240,
    // },
  })
);
