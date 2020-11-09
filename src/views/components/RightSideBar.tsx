import React from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
} from '@material-ui/core';
import { ChatBubble, PersonAdd } from '@material-ui/icons';
import DMItem from './DMItem';
import FriendRequestItem from './FriendRequestItem';
import { RightSideBarStyle } from '../../styles/RightSideBar.style';

const RightSideBar: React.FC = () => {
  const classes = RightSideBarStyle();

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.rightSideDrawerPaper,
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
          <Container className={classes.rightSideDMContainer}>
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
          </Container>
        </List>
        <Divider />

        {/* =====================
            FriendRequest List
        ========================= */}
        <List className={classes.rightSideFriReq}>
          <ListItem className={classes.rightSideListHeader}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Friends Request" />
          </ListItem>
          <Container className={classes.rightSideFriReqContainer}>
            <FriendRequestItem displayName="Ariel" />
            <FriendRequestItem displayName="Steve" />
            <FriendRequestItem displayName="Paul" />
            <FriendRequestItem displayName="Bass" />
            <FriendRequestItem displayName="Trump" />
            <FriendRequestItem displayName="Jiny" />
          </Container>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default RightSideBar;
