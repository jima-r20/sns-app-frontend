import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const RightSideBarStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      position: 'relative',
      width: 320,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    listHeader: {
      position: 'fixed',
      backgroundColor: 'white',
      height: '5vh',
      zIndex: 1,
    },
    DMList: {
      height: '50vh',
    },
    DMContainer: {
      overflow: 'auto',
      height: '40vh',
      marginTop: '5vh',
    },
    friReqList: {
      height: '40vh',
    },
    friReqContainer: {
      overflow: 'auto',
      marginTop: '5vh',
      height: '30vh',
    },
  })
);
