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
import RightSideBarDMItem from './RightSideBarDMItem';
import FriendRequestItem from './FriendRequestItem';
import { RightSideBarStyle } from '../../styles/RightSideBar.style';
import { useSelector } from 'react-redux';
import { selectDmInbox } from '../../stores/slices/dm.slice';

const RightSideBar: React.FC = () => {
  const classes = RightSideBarStyle();
  const dmInbox = useSelector(selectDmInbox);

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
            <ListItemText primary="Friends Request" />
          </ListItem>
          <Container className={classes.friReqContainer}>
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
