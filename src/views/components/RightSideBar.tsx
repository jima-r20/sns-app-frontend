import React from 'react';
import { useSelector } from 'react-redux';

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

import RightSideBarDMItem from './RightSideBarDMItem';
import FriendRequestItem from './FriendRequestItem';

import { selectDmInbox } from '../../stores/slices/dm.slice';
import { selectFollowers } from '../../stores/slices/follow.slice';

import { RightSideBarStyle } from '../../styles/RightSideBar.style';

const RightSideBar: React.FC = () => {
  const classes = RightSideBarStyle();
  const dmInbox = useSelector(selectDmInbox);
  const followes = useSelector(selectFollowers);

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />

        {/* =====================
                  DM List
        ========================= */}
        <List className={classes.DMList}>
          <ListItem className={classes.listHeader}>
            <ListItemIcon>
              <ChatBubble />
            </ListItemIcon>
            <ListItemText primary="DM" />
          </ListItem>
          <Container className={classes.DMContainer}>
            {dmInbox.map((dm) => (
              <RightSideBarDMItem
                key={dm.targetUser}
                targetUser={dm.targetUser}
                messages={dm.messages}
              />
            ))}
          </Container>
        </List>
        <Divider />

        {/* =====================
            FriendRequest List
        ========================= */}
        <List className={classes.friReqList}>
          <ListItem className={classes.listHeader}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Friend Requests" />
          </ListItem>
          <Container className={classes.friReqContainer}>
            {followes
              .slice(0)
              .reverse()
              .map((follower) =>
                !follower.approved ? (
                  <FriendRequestItem
                    key={follower.id}
                    askFrom={follower.askFrom}
                  />
                ) : null
              )}
          </Container>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default RightSideBar;
