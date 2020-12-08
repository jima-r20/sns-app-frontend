import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Divider, Drawer, IconButton, List } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import MainListItems from './MainListItems';
import { AppDispatch } from '../../stores/store';
import {
  closeSideBar,
  selectIsOpenSideBar,
} from '../../stores/slices/page.slice';
import { LeftSideBarStyle } from '../../styles/components/LeftSideBar.style';

const LeftSideBar: React.FC = () => {
  const classes = LeftSideBarStyle();
  const dispatch: AppDispatch = useDispatch();
  const open = useSelector(selectIsOpenSideBar);

  const handleDrawerClose = async () => {
    await dispatch(closeSideBar());
  };

  return (
    <React.Fragment>
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
        <List>
          <MainListItems />
        </List>
        {/* <Divider />
        <List>{secondaryListItems}</List> */}
      </Drawer>
    </React.Fragment>
  );
};

export default LeftSideBar;
