import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu, Notifications } from '@material-ui/icons';
import { TopPageStyles } from '../../styles/TopPage.styles';
import { AppDispatch } from '../../stores/store';
import {
  openSideBar,
  selectIsOpenSideBar,
} from '../../stores/slices/page.slice';

const HeaderBar: React.FC = () => {
  const classes = TopPageStyles();
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector(selectIsOpenSideBar);

  const handleDrawerOpen = async () => {
    await dispatch(openSideBar());
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default HeaderBar;
