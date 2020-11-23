import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const RightSideBarDMItemStyle = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '100%',
      margin: '2% 0',
      // backgroundColor: '#777',
      // color: 'white'
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      padding: '3%',
    },
    avatar: {
      margin: '0 auto',
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    message: {
      display: 'block',
      paddingRight: '5%',
      paddingLeft: '15%',
    },
  })
);
