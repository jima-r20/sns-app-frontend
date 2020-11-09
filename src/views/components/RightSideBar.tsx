import React from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardHeader,
  Avatar,
  Divider,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';
import { ChatBubble, PersonAdd } from '@material-ui/icons';
import { TopPageStyles } from '../../styles/TopPage.styles';
import DMItem from './DMItem';

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
        <List className={classes.rightSideDM}>
          <ListItem className={classes.rightSideListHeader}>
            <ListItemIcon>
              <ChatBubble />
            </ListItemIcon>
            <ListItemText primary="DM" />
          </ListItem>
          <Grid container spacing={1} className={classes.rightSideDMList}>
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
        </List>
        <Divider />
        <List className={classes.rightSideFriendRequest}>
          <ListItem className={classes.rightSideListHeader}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Friends Request" />
          </ListItem>
          <Grid
            container
            spacing={1}
            className={classes.rightSideFriendRequestList}
          >
            <Grid item xs={12}>
              <Card variant="outlined" className={classes.sideCard}>
                <CardHeader
                  avatar={<Avatar className={classes.small}>A</Avatar>}
                  title="Ariel"
                  action={
                    <Button variant="outlined" color="primary" size="small">
                      Approve
                    </Button>
                  }
                  style={{ alignItems: 'center' }}
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined" className={classes.sideCard}>
                <CardHeader
                  avatar={<Avatar className={classes.small}>S</Avatar>}
                  title="Steve"
                  action={
                    <Button variant="outlined" color="primary" size="small">
                      Approve
                    </Button>
                  }
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined" className={classes.sideCard}>
                <CardContent
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'auto',
                  }}
                >
                  <Avatar
                    className={classes.small}
                    style={{ marginRight: '5%' }}
                  >
                    S
                  </Avatar>
                  Steve
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 'auto' }}
                  >
                    Approve
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default RightSideBar;
