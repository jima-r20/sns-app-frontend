import React from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Divider,
  Container,
} from '@material-ui/core';
import { ChatBubble, PersonAdd } from '@material-ui/icons';
import { TopPageStyles } from '../../styles/TopPage.styles';
import DMItem from './DMItem';
import FriendRequestItem from './FriendRequestItem';

const RightSideBar: React.FC = () => {
  const classes = TopPageStyles();

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.rightDrawerPaper,
        }}
      >
        <Toolbar />

        {/* =====================
                  DM List
        ========================= */}
        <List className={classes.rightSideDM}>
          <ListItem className={classes.rightSideListHeader}>
            <ListItemIcon>
              <ChatBubble />
            </ListItemIcon>
            <ListItemText primary="DM" />
          </ListItem>
          <Container className={classes.rightSideDMList}>
            <Grid
              container
              spacing={1}
              // className={classes.rightSideDMList}
            >
              <DMItem
                displayName="Ariel"
                message="This is a direct message from Ariel."
              />
              <DMItem
                displayName="Michel"
                message="Hi, how are you? Long time no see..."
              />
              <DMItem
                displayName="Jack"
                message="Good evening! Do you know where my wallet...?"
              />
            </Grid>
          </Container>
        </List>
        <Divider />

        {/* =====================
            FriendRequest List
        ========================= */}
        <List className={classes.rightSideFriendRequest}>
          <ListItem className={classes.rightSideListHeader}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Friends Request" />
          </ListItem>
          <Container className={classes.rightSideFriendRequestList}>
            <Grid
              container
              spacing={1}
              // className={classes.rightSideFriendRequestList}
            >
              <FriendRequestItem displayName="Ariel" />
              <FriendRequestItem displayName="Steve" />
              <FriendRequestItem displayName="Paul" />
              <FriendRequestItem displayName="Bass" />
              <FriendRequestItem displayName="Trump" />
              <FriendRequestItem displayName="Jiny" />
            </Grid>
          </Container>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default RightSideBar;
