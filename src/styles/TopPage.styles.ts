import { createStyles, makeStyles, Theme } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';

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
      backgroundColor: '#ccc',
    },
    container: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(4),
    },
    subHeader: {
      position: 'fixed',
      width: '100%',
      zIndex: 1,
      backgroundColor: 'white',
    },
    pageTitle: {
      fontWeight: 'bold',
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
