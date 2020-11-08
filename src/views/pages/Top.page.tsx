import React, { useState } from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { mainListItems } from '../components/listItems';
import {
  ChatBubble,
  ChevronLeft,
  Menu,
  Notifications,
  PersonAdd,
} from '@material-ui/icons';
import Copyright from '../components/Copyright';
import { TopPageStyles } from '../../styles/TopPage.styles';

const TopPage: React.FC = () => {
  const classes = TopPageStyles();
  const [open, setOpen] = useState<boolean>(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            SNS App
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={99} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        {/* <Divider />
        <List>{secondaryListItems}</List> */}
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12} md={8} lg={9}> */}
            <Grid item xs={12}>
              {/* <Paper className={fixedHeightPaper}></Paper> */}
              <Card>
                <CardActionArea>
                  <CardHeader avatar={<Avatar>T</Avatar>} title="test" />
                  <Divider />
                  <CardContent>
                    <Typography>
                      This is a sample. Heat oil in a (14- to 16-inch) paella
                      pan or a large, deep skillet over medium-high heat. Add
                      chicken, shrimp and chorizo, and cook, stirring
                      occasionally until lightly browned, 6 to 8 minutes.
                      Transfer shrimp to a large plate and set aside, leaving
                      chicken and chorizo in the pan. Add pimentón, bay leaves,
                      garlic, tomatoes, onion, salt and pepper, and cook,
                      stirring often until thickened and fragrant, about 10
                      minutes. Add saffron broth and remaining 4 1/2 cups
                      chicken broth; bring to a boil.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardActionArea>
                  <CardHeader avatar={<Avatar>R</Avatar>} title="Ryuji" />
                  <CardContent>
                    <Typography>
                      This is a sample. Heat oil in a (14- to 16-inch) paella
                      pan or a large, deep skillet over medium-high heat. Add
                      chicken, shrimp and chorizo, and cook, stirring
                      occasionally until lightly browned, 6 to 8 minutes.
                      Transfer shrimp to a large plate and set aside, leaving
                      chicken and chorizo in the pan. Add pimentón, bay leaves,
                      garlic, tomatoes, onion, salt and pepper, and cook,
                      stirring often until thickened and fragrant, about 10
                      minutes. Add saffron broth and remaining 4 1/2 cups
                      chicken broth; bring to a boil.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardActionArea>
                  <CardHeader avatar={<Avatar>A</Avatar>} title="Ariel" />
                  <CardContent>
                    <Typography>
                      This is a sample. Heat oil in a (14- to 16-inch) paella
                      pan or a large, deep skillet over medium-high heat. Add
                      chicken, shrimp and chorizo, and cook, stirring
                      occasionally until lightly browned, 6 to 8 minutes.
                      Transfer shrimp to a large plate and set aside, leaving
                      chicken and chorizo in the pan. Add pimentón, bay leaves,
                      garlic, tomatoes, onion, salt and pepper, and cook,
                      stirring often until thickened and fragrant, about 10
                      minutes. Add saffron broth and remaining 4 1/2 cups
                      chicken broth; bring to a boil.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
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
                <CardContent>
                  <Avatar className={classes.small}>S</Avatar>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </List>
      </Drawer>
    </div>
  );
};

export default TopPage;
