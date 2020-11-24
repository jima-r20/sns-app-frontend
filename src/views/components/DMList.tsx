import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import DMItem from './DMItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../stores/store';
import { fetchGetDmInbox, selectDmInbox } from '../../stores/slices/dm.slice';

const DMList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const dmInbox = useSelector(selectDmInbox); // { id: 1, sender: 4, receiver: 7, message: 'aaa' }
  // const sumarizedDmInbox = Object.keys(dmInbox).map((sender) => {

  // })  // { sender: 4, messages: ['m2', 'm1'] }

  // useEffect(() => {
  //   dispatch(fetchGetDmInbox());
  //   console.log('effected');
  // }, [dispatch]);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {dmInbox
          .slice(0)
          .reverse()
          .map((dm) => (
            <DMItem
              key={dm.id}
              id={dm.id}
              sender={dm.sender}
              message={dm.message}
            />
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default DMList;
