import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import Friend from './Friend';
import { useSelector } from 'react-redux';
import {
  selectFollowers,
  selectFollows,
  selectFriends,
} from '../../stores/slices/follow.slice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const FriendList: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const friends = useSelector(selectFriends);
  const follows = useSelector(selectFollows);
  const followers = useSelector(selectFollowers);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            style={{ backgroundColor: '#fff' }}
          >
            <Tab label="Friends" {...a11yProps(0)} />
            <Tab label="Follows" {...a11yProps(1)} />
            <Tab label="Followers" {...a11yProps(2)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            {friends
              .slice(0)
              .reverse()
              .map((friend) => (
                <Friend
                  key={friend.id}
                  askFrom={friend.askFrom}
                  askTo={friend.askTo}
                />
              ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {follows
              .slice(0)
              .reverse()
              .map((follow) => (
                <Friend
                  key={follow.id}
                  askFrom={follow.askFrom}
                  askTo={follow.askTo}
                />
              ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {followers
              .slice(0)
              .reverse()
              .map((follower) => (
                <Friend
                  key={follower.id}
                  askFrom={follower.askFrom}
                  askTo={follower.askTo}
                />
              ))}
          </TabPanel>
        </Grid>
        {/* {friends
          .slice(0)
          .reverse()
          .map((friend) => (
            <Friend askFrom={friend.askFrom} askTo={friend.askTo} />
          ))} */}
      </Grid>
    </React.Fragment>
  );
};

export default FriendList;
