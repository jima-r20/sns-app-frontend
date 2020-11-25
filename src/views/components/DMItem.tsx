import React from 'react';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../stores/slices/user.slice';

interface PROPS_DM {
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

const DMItem: React.FC<PROPS_DM> = (props) => {
  const { targetUser, messages } = props;
  const user = useSelector(selectUsers).find((u) => u.id === targetUser);
  const avatarIcon = user?.displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            avatar={<Avatar>{avatarIcon}</Avatar>}
            title={user?.displayName}
          />
          <CardActionArea>
            <CardContent>
              <Typography variant="body2" component="p">
                {messages[0].message}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default DMItem;
