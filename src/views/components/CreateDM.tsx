import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
import { selectFriends } from '../../stores/slices/follow.slice';
import { CreateDMStyle } from '../../styles/CreateDM.style';
import { selectMyProfile, selectUsers } from '../../stores/slices/user.slice';

const CreateDM: React.FC = () => {
  const classes = CreateDMStyle();
  const { register, errors, handleSubmit } = useForm();
  const [askTo, setAskTo] = useState<number | unknown>(undefined);
  const [isMessage, setIsMessage] = useState<boolean>(false);

  const myProfile = useSelector(selectMyProfile);
  const friends = useSelector(selectFriends);
  const users = useSelector(selectUsers);

  const handleSendDM = handleSubmit((data: any) => {
    const d = { ...data, askTo };
    console.log(d);
  });

  const handleChangeAskTo = (
    e: React.ChangeEvent<{ value: number | unknown }>
  ) => {
    setAskTo(e.target.value);
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.target.value === '' || undefined || null) && isMessage) {
      setIsMessage(false);
    } else if ((e.target.value !== '' || undefined || null) && !isMessage) {
      setIsMessage(true);
    }
  };

  console.log(askTo);

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <form noValidate onSubmit={handleSendDM}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="askTo-label">Send To</InputLabel>
            <Select
              labelId="askTo-label"
              id="askTo"
              value={askTo ? askTo : ''}
              onChange={handleChangeAskTo}
              label="Send To"
            >
              <MenuItem value={undefined}>
                <em>None</em>
              </MenuItem>
              {friends.map((friend) => (
                <MenuItem
                  key={friend.id}
                  value={
                    friend.askTo === myProfile.id
                      ? friend.askFrom
                      : friend.askTo
                  }
                >
                  {
                    users.find(
                      (u) =>
                        u.id ===
                        (myProfile.id === friend.askFrom
                          ? friend.askTo
                          : friend.askFrom)
                    )?.displayName
                  }
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="message"
            name="message"
            margin="normal"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Message"
            onChange={handleChangeMessage}
            inputRef={register({
              required: true,
            })}
          />
          {typeof askTo === 'number' && isMessage ? (
            <Chip
              clickable
              color="primary"
              label="Send"
              component="button"
              type="submit"
              className={classes.sendButton}
            />
          ) : (
            <Chip
              label="Send"
              component="button"
              disabled
              className={classes.sendButton}
            />
          )}
        </form>
      </Paper>
    </React.Fragment>
  );
};

export default CreateDM;
