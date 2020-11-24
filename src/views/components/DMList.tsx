import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import DMItem from './DMItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../stores/store';
import { fetchGetDmInbox, selectDmInbox } from '../../stores/slices/dm.slice';

interface SumarizedDmItem {
  sender: number;
  messages: string[];
}

const DMList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const dmInbox = useSelector(selectDmInbox);

  /* [{ id: 1, sender: 4, receiver: 7, message: 'aaa' }, ...]
      ↓　の形式に変換
     [{ sender: 4, messages: ['m2', 'm1'] }, ...] 
     → 配列の順番はメッセージを送ってきたユーザ順、
       messageは最近のメッセージが配列のはじめにくるようにしている
  */
  let sumarizedDmInbox: Array<SumarizedDmItem> = [];
  dmInbox.map((dm) => {
    let sumarizedDmItem: SumarizedDmItem = { sender: 0, messages: [''] };
    const found = sumarizedDmInbox.find((item) => item.sender === dm.sender);
    if (found === undefined) {
      sumarizedDmItem.sender = dm.sender;
      sumarizedDmItem.messages[0] = dm.message;
      sumarizedDmInbox.push(sumarizedDmItem);
    } else {
      found?.messages.unshift(dm.message);
    }
  });

  console.log(sumarizedDmInbox);

  // useEffect(() => {
  //   dispatch(fetchGetDmInbox());
  //   console.log('effected');
  // }, [dispatch]);

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
