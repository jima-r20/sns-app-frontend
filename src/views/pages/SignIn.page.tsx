import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RRLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import Copyright from '../components/Copyright';
import { authDefaultStyles } from '../../styles/Auth.styles';

// import { RouteComponentProps } from 'react-router-dom';
// import * as H from 'history';
// interface Props extends RouteComponentProps<{}> {
//   history: H.History;
// }

const SignInPage: React.FC = () => {
  const classes = authDefaultStyles();
  const { register, errors, handleSubmit } = useForm();
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  useEffect(() => {
    console.log('effected');
  }, [
    isEmail,
    emailError,
    emailErrorMessage,
    isPassword,
    passwordError,
    passwordErrorMessage,
  ]);

  const handleSignIn = () => {
    console.log('called');
  };

  const checkEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setEmailError(true);
      setEmailErrorMessage('Please enter your email address');
      setIsEmail(false);
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
      setIsEmail(true);
    }
  };

  const checkPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter your password');
      setIsPassword(false);
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
      setIsPassword(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(handleSignIn)}
        >
          {errors.email && errors.email.type === 'pattern' ? (
            <div className={classes.errorMessage}>Not match email pattern</div>
          ) : null}
          <TextField
            error={emailError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={emailErrorMessage}
            inputRef={register({
              required: true,
              pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
            })}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              checkEmailInput(e)
            }
          />
          <TextField
            error={passwordError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            helperText={passwordErrorMessage}
            inputRef={register({
              required: true,
            })}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              checkPasswordInput(e)
            }
          />
          <FormControlLabel
            control={<Checkbox value="remenber" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={isEmail && isPassword ? false : true}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Box textAlign="center">
            <RRLink to="/signup">Don't have an account? Sign Up</RRLink>
          </Box>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignInPage;
