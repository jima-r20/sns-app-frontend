import React from 'react';
import {
  Avatar,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

const CreatePost: React.FC = () => {
  return (
    <React.Fragment>
      <Paper
        style={{ marginBottom: '2%', paddingRight: '2%', paddingLeft: '2%' }}
      >
        <Grid
          container
          spacing={1}
          style={{ display: 'flex', alignItems: 'center', paddingTop: '1%' }}
        >
          <Grid item xs={1}>
            <Avatar style={{ margin: '0 auto' }}>R</Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body2" component="p">
              What's happening?
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Chip clickable color="primary" label="Post" />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              paddingRight: '5%',
              paddingLeft: '5%',
              paddingBottom: '2%',
            }}
          >
            <TextField
              id="create-post"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              placeholder="Let's post what happened"
            />
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default CreatePost;
