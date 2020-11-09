import React from 'react';
import {
  Avatar,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { CreatePostStyle } from '../../styles/CreatePost.style';

const CreatePost: React.FC = () => {
  const classes = CreatePostStyle();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={1}>
            <Avatar className={classes.avater}>R</Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body2" component="p">
              What's happening?
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.postButton}>
            <Chip clickable color="primary" label="Post" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="create-post"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              placeholder="Let's post what happened"
              className={classes.textField}
            />
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default CreatePost;
