import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ChatBubble, PersonAdd } from '@material-ui/icons';
import Copyright from '../components/Copyright';
import { TopPageStyles } from '../../styles/TopPage.styles';
import HeaderBar from '../components/HeaderBar';
import LeftSideBar from '../components/LeftSideBar';
import PostList from '../components/PostList';

const TopPage: React.FC = () => {
  const classes = TopPageStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar />
      <LeftSideBar />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <PostList />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>

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
            <Grid item xs={12}>
              <Card variant="outlined" className={classes.sideCard}>
                <CardHeader
                  avatar={<Avatar className={classes.small}>A</Avatar>}
                  title="Ariel"
                />
                <Divider />
                <CardContent>
                  <Typography variant="body2" component="p">
                    This is a direct message from Ariel.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined" className={classes.sideCard}>
                <CardHeader
                  avatar={<Avatar className={classes.small}>M</Avatar>}
                  title="Michel"
                />
                <CardContent>
                  <Typography variant="body2" component="p">
                    Hi, how are you?
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined" className={classes.sideCard}>
                <CardHeader
                  avatar={<Avatar className={classes.small}>J</Avatar>}
                  title="Jack"
                />
                <CardContent>
                  <Typography variant="body2" component="p">
                    Good evening! Do you know where my wallet...?
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
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
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>aaaa</CardContent>
              </Card>
            </Grid>
          </Grid>
        </List>
      </Drawer>
    </div>
  );
};

export default TopPage;
