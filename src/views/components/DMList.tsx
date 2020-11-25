import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../stores/store';
import { selectDmInbox } from '../../stores/slices/dm.slice';
import DMItem from './DMItem';

const DMList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const dmInbox = useSelector(selectDmInbox);

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
