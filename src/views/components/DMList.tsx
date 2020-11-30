import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import DMItem from './DMItem';
import { AppDispatch } from '../../stores/store';
import { selectDmInbox } from '../../stores/slices/dm.slice';
import {
  resetDMSelected,
  setSubHeaderTitle,
} from '../../stores/slices/page.slice';

const DMList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const dmInbox = useSelector(selectDmInbox);

  useEffect(() => {
    dispatch(setSubHeaderTitle('DM'));
    dispatch(resetDMSelected());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {dmInbox.map((dm) => (
          <DMItem
            key={dm.targetUser}
            targetUser={dm.targetUser}
            messages={dm.messages}
          />
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default DMList;
