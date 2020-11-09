import React from 'react';
import { Grid, Card, CardContent, Avatar, Button } from '@material-ui/core';
import { TopPageStyles } from '../../styles/TopPage.styles';

interface PROPS_FRIEND_REQUEST {
  displayName: string;
}

const FriendRequestItem: React.FC<PROPS_FRIEND_REQUEST> = (props) => {
  const classes = TopPageStyles();
  const { displayName } = props;
  const avatarIcon = displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Card variant="outlined" className={classes.sideCard}>
          <CardContent
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar className={classes.small} style={{ marginRight: '5%' }}>
              {avatarIcon}
            </Avatar>
            {displayName}
            <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginLeft: 'auto' }}
            >
              Approve
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default FriendRequestItem;
