import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const RightSideBarStyle = makeStyles((theme: Theme) => 
  createStyles({
    rightSideDrawerPaper: {
      position: 'relative',
      width: 320,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    rightSideListHeader: {
      position: 'fixed',
      backgroundColor: 'white',
      height: '5vh',
      zIndex: 1,
    },
    rightSideDM: {
      height: '50vh',
    },
    rightSideDMContainer: {
      overflow: 'auto',
      height: '40vh', 
      marginTop: '5vh'
    },
    rightSideFriReq: {
      height: '40vh',
    },
    rightSideFriReqContainer: {
      overflow: 'auto',
      marginTop: '5vh',
      height: '30vh'
    }
  })
)