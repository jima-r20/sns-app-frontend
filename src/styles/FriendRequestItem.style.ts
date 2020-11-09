import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const FriendRequestItmStyle = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '100%',
      margin: '2% 0',
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
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  })
);
