import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RRLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../stores/store';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@material-ui/core';
import { LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons';

import Copyright from '../components/Copyright';
import { authDefaultStyles } from '../../styles/Auth.styles';

import * as H from 'history';
import { RouteComponentProps } from 'react-router-dom';
import { signUp } from '../../stores/slices/user.slice';
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

interface State {
  email: string;
  password: string;
  displayName: string;
  isEmailInputedOnce: boolean;
  isPasswordInputedOnce: boolean;
  isDisplayNameInputedOnce: boolean;
  matchEmailPattern: boolean;
  matchPasswordPattern: boolean;
  showPassword: boolean;
}

interface FormData {
  email: string;
  password: string;
  displayName: string;
  avatar?: string;
  about?: string;
}

const SignUpPage: React.FC<Props> = (props: Props) => {
  const classes = authDefaultStyles();
  const emailPattern: RegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  const passwordPattern: RegExp = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  const { register, errors, handleSubmit } = useForm<FormData>();
  const dispatch: AppDispatch = useDispatch();

  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    displayName: '',
    isEmailInputedOnce: false,
    isPasswordInputedOnce: false,
    isDisplayNameInputedOnce: false,
    matchEmailPattern: false,
    matchPasswordPattern: false,
    showPassword: false,
  });

  const handleSignUp = handleSubmit(async (data: FormData) => {
    console.log(data);
    const result = await dispatch(signUp(data));
    if (signUp.fulfilled.match(result)) {
      props.history.push('/signin');
    }
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let isInputedOnce!: keyof State;
    if (prop === 'email' && !values.isEmailInputedOnce) {
      isInputedOnce = 'isEmailInputedOnce';
    }
    if (prop === 'password' && !values.isPasswordInputedOnce) {
      isInputedOnce = 'isPasswordInputedOnce';
    }
    if (prop === 'displayName' && !values.isPasswordInputedOnce) {
      isInputedOnce = 'isDisplayNameInputedOnce';
    }
    setValues({
      ...values,
      [prop]: event.target.value,
      [isInputedOnce]: true,
      matchEmailPattern:
        prop === 'email'
          ? event.target.value.match(emailPattern) !== null
          : values.matchEmailPattern,
      matchPasswordPattern:
        prop === 'password'
          ? event.target.value.match(passwordPattern) !== null
          : values.matchPasswordPattern,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
        <form className={classes.form} noValidate onSubmit={handleSignUp}>
          <TextField
            error={
              (values.email === '' ||
                values.email.match(emailPattern) === null) &&
              values.isEmailInputedOnce
            }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={
              (!values.email && values.isEmailInputedOnce
                ? 'Please enter your email address'
                : null) ||
              (Boolean(values.email) &&
              values.email.match(emailPattern) === null
                ? 'Please enter your email address in the correct format'
                : null)
            }
            inputRef={register({
              required: true,
              pattern: emailPattern,
            })}
            onChange={handleChange('email')}
          />
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={
              (values.password === '' ||
                values.password.match(passwordPattern) === null ||
                values.password.length < 8) &&
              values.isPasswordInputedOnce
            }
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              type={values.showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              autoComplete="current-password"
              inputRef={register({
                required: true,
                pattern: passwordPattern,
                minLength: 8,
              })}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <FormHelperText>
              {(!values.password && values.isPasswordInputedOnce
                ? 'Please enter your password'
                : null) ||
                (Boolean(values.password) &&
                values.password.match(passwordPattern) === null
                  ? 'Please include uppercase, lowercase, number and symbol'
                  : null) ||
                (Boolean(values.password) && values.password.length < 8
                  ? 'Please enter your password in 8 characters or less'
                  : null)}
            </FormHelperText>
          </FormControl>
          <TextField
            error={
              (values.displayName === '' && values.isDisplayNameInputedOnce) ||
              values.displayName.length > 20
            }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="displayName"
            label="Display Name"
            name="displayName"
            autoComplete="displayName"
            helperText={
              (!values.displayName && values.isDisplayNameInputedOnce
                ? 'Please enter your display name'
                : null) ||
              (values.displayName.length > 20
                ? 'Please enter your display name in 20 characters or less'
                : null)
            }
            inputRef={register({
              required: true,
              minLength: 1,
              maxLength: 20,
            })}
            onChange={handleChange('displayName')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="avatar"
            label="Avatar"
            name="avatar"
            autoComplete="avatar"
            inputRef={register}
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
            disabled={
              values.email === '' ||
              values.password === '' ||
              values.displayName === '' ||
              !values.matchEmailPattern ||
              values.password.length < 8 ||
              values.displayName.length > 20
            }
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
