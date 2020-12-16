import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  AppBar,
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu, Notifications, PostAdd } from '@material-ui/icons';
import { AppDispatch } from '../../stores/store';
import {
  openSideBar,
  resetSendToReceiver,
  selectIsOpenSideBar,
  setIsCreatePostPage,
} from '../../stores/slices/page.slice';
import { HeaderBarStyle } from '../../styles/components/HeaderBar.style';
import { Link } from 'react-router-dom';

const HeaderBar: React.FC = () => {
  const classes = HeaderBarStyle();
  const dispatch: AppDispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = useSelector(selectIsOpenSideBar);

  const handleDrawerOpen = async () => {
    await dispatch(openSideBar());
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickCreateNewPost = async () => {
    await dispatch(setIsCreatePostPage());
  };

  const onClickSendDM = async () => {
    await dispatch(resetSendToReceiver());
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;

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
          <div>
            <IconButton
              color="inherit"
              aria-describedby={id}
              onClick={handleClick}
            >
              <PostAdd />
            </IconButton>
            <Popover
              id={id}
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <List>
                <Link
                  to="/top/post/create"
                  className={classes.linkText}
                  onClick={onClickCreateNewPost}
                >
                  <ListItem button>
                    <Typography className={classes.popoverText}>
                      Create NEW Post
                    </Typography>
                  </ListItem>
                </Link>
                <Divider />
                <Link
                  to="/top/dm/create"
                  className={classes.linkText}
                  onClick={onClickSendDM}
                >
                  <ListItem button>
                    <Typography className={classes.popoverText}>
                      Send DM
                    </Typography>
                  </ListItem>
                </Link>
              </List>
            </Popover>
          </div>
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
