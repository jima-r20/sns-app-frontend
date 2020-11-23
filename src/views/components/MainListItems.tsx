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
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

const MainListItems: React.FC = () => {
  let match = useRouteMatch();
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.removeItem('localJwtToken');
    history.push('/signin'); // サインアウトはhistory使わないとできなかった
  };

  return (
    <React.Fragment>
      <Link to={match.url} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="HOME" />
        </ListItem>
      </Link>
      <Link
        to={`${match.url}/myprofile`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ListItem button>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </Link>
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
      {/* <Link
        to='/signin'
        style={{ textDecoration: 'none', color: 'inherit' }}
        onClick={handleSignOut}
      > */}
      <ListItem button onClick={handleSignOut}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
      {/* </Link> */}
    </React.Fragment>
  );
};

export default MainListItems;
