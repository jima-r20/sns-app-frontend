import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RRLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import Copyright from '../components/Copyright';
import { authDefaultStyles } from '../../styles/Auth.styles';

// import * as H from 'history';
// import { RouteComponentProps } from 'react-router-dom';
// interface Props extends RouteComponentProps<{}> {
//   history: H.History;
// }

const SignUpPage: React.FC = () => {
  const classes = authDefaultStyles();
  const { register, errors, handleSubmit } = useForm();

  const handleSignUp = () => {
    console.log('called');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(handleSignUp)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({
              required: true,
              pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
            })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            inputRef={register({
              required: true,
              minLength: 8,
            })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="displayName"
            label="Display Name"
            name="displayName"
            autoComplete="displayName"
            inputRef={register({
              required: true,
              minLength: 1,
              maxLength: 20,
            })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="avatar"
            label="Avatar"
            name="avatar"
            autoComplete="avatar"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            id="about"
            label="About Yourself"
            name="about"
            autoComplete="about"
            inputRef={register({
              maxLength: 256,
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Box textAlign="center">
            <RRLink to="/signin">Already have an account? Sign In</RRLink>
          </Box>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUpPage;
