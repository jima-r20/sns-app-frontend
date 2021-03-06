import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
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

      <Link
        to={`${match.url}/dm`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ListItem button>
          <ListItemIcon>
            <ChatBubble />
          </ListItemIcon>
          <ListItemText primary="DM" />
        </ListItem>
      </Link>

      <Link
        to={`${match.url}/friends`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ListItem button>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItem>
      </Link>
      <Divider />

      <ListItem button onClick={handleSignOut}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
    </React.Fragment>
  );
};

export default MainListItems;
