import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const DMItemStyle = makeStyles((theme: Theme) => 
  createStyles({
    DMCard: {
      width: '100%',
      margin: '2% 0',
      // backgroundColor: '#777',
      // color: 'white'
    },
    DMContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '3%'
    },
    DMAvatar: {
      margin: '0 auto',
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    DMTextPaper: {
      padding: '1.5%'
    }
  })
)