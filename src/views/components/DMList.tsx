import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../stores/store';
import { selectDmInbox } from '../../stores/slices/dm.slice';

const DMList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const dmInbox = useSelector(selectDmInbox);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {/* {dmInbox
          .slice(0)
          .reverse()
          .map((dm) => (
            <DMItem
              key={dm.id}
              id={dm.id}
              sender={dm.sender}
              message={dm.message}
            />
          ))} */}
      </Grid>
    </React.Fragment>
  );
};

export default DMList;
