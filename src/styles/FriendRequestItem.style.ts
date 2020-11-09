import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const FriendRequestItmStyle = makeStyles((theme: Theme) => 
  createStyles({
    friReqPaper: {
      padding: '3%',
      width: '100%',
      margin: '2% 0'
    },
    friReqContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    friReqAvatar: {
      margin: '0 auto',
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    approveButton: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  })
);