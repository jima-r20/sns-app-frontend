import { createStyles, makeStyles, Theme } from '@material-ui/core';

const drawerWidth = 240;

export const HeaderBarStyle = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: 'gray',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    popoverText: {
      padding: theme.spacing(2),
    },
    linkText: {
      textDecoration: 'none',
      color: 'inherit',
    },
  })
);
