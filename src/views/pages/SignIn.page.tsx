import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { RouteComponentProps } from 'react-router-dom';
// import * as H from 'history';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createStyles,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import Copyright from '../components/Copyright';

// interface Props extends RouteComponentProps<{}> {
//   history: H.History;
// }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    question: {
      display: 'inline-block',
      width: '100%',
      textAlign: 'center',
    },
    errorMessage: {
      color: 'red',
    },
  })
);

const SignInPage: React.FC = () => {
  const classes = useStyles();
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
            name="password"
            label="Password"
            type="password"
            id="password"
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
          <Link href="/signup" variant="body2" className={classes.question}>
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignInPage;
