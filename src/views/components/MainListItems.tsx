import React from 'react';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  ChatBubble,
  ExitToApp,
  Home,
  People,
  Person,
} from '@material-ui/icons';

const MainListItems: React.FC = () => {
  return (
    <React.Fragment>
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="HOME" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ChatBubble />
        </ListItemIcon>
        <ListItemText primary="DM" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Friends" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
    </React.Fragment>
  );
};

export default MainListItems;