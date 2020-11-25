import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import DMItem from './DMItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../stores/store';
import { fetchGetDmInbox, selectDmInbox } from '../../stores/slices/dm.slice';
import { selectMyProfile } from '../../stores/slices/user.slice';

interface SumarizedDmItem {
  targetUser: number;
  messages: [
    {
      id: number;
      sender: number;
      receiver: number;
      message: string;
    }
  ];
}

const DMList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const dmInbox = useSelector(selectDmInbox);
  const myProfile = useSelector(selectMyProfile);

  /* 
    [{ id: 1, sender: 4, receiver: 7, message: 'aaa' }, ...]
      ↓　の形式に変換
     [ {targetUser: 4, messages: [{ id: 10, sender: 4, receiver: 7, message: 'aaa'}] }, ...] 
     → 配列の順番はメッセージを送ってきたユーザ順、
       messagesは最近のメッセージが配列のはじめにくるようにしている
  */

  /* 
    TODO: 以下の処理をdmSlice内に記述して、stateとして保持させたい
  */
  let sumarizedDmInbox: Array<SumarizedDmItem> = [];
  dmInbox
    .slice(0)
    .reverse()
    .map((dm) => {
      let sumarizedDmItem: SumarizedDmItem = {
        targetUser: 0,
        messages: [{ id: 0, sender: 0, receiver: 0, message: '' }],
      };
      if (dm.receiver === myProfile.id) {
        const found = sumarizedDmInbox.find(
          (item) => item.targetUser === dm.sender
        );
        if (found === undefined) {
          sumarizedDmItem.targetUser = dm.sender;
          sumarizedDmItem.messages[0].id = dm.id;
          sumarizedDmItem.messages[0].sender = dm.sender;
          sumarizedDmItem.messages[0].receiver = dm.receiver;
          sumarizedDmItem.messages[0].message = dm.message;
          sumarizedDmInbox.push(sumarizedDmItem);
        } else {
          found?.messages.push(dm);
        }
      } else if (dm.sender === myProfile.id) {
        const found = sumarizedDmInbox.find(
          (item) => item.targetUser === dm.receiver
        );
        if (found === undefined) {
          sumarizedDmItem.targetUser = dm.receiver;
          sumarizedDmItem.messages[0].id = dm.id;
          sumarizedDmItem.messages[0].sender = dm.sender;
          sumarizedDmItem.messages[0].receiver = dm.receiver;
          sumarizedDmItem.messages[0].message = dm.message;
          sumarizedDmInbox.push(sumarizedDmItem);
        } else {
          found?.messages.unshift(dm);
        }
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
