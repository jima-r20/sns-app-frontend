import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RRLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../stores/store';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
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

import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { fetchSignIn } from '../../stores/slices/user.slice';
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

interface State {
  email: string;
  password: string;
  isEmailInputedOnce: boolean;
  isPasswordInputedOnce: boolean;
  matchEmailPattern: boolean;
  showPassword: boolean;
}

interface FormData {
  email: string;
  password: string;
}

const SignInPage: React.FC<Props> = (props: Props) => {
  const classes = authDefaultStyles();
  const emailPattern: RegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  const { register, errors, handleSubmit } = useForm<FormData>();
  const dispatch: AppDispatch = useDispatch();

  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    isEmailInputedOnce: false,
    isPasswordInputedOnce: false,
    matchEmailPattern: false,
    showPassword: false,
  });

  const handleSignIn = handleSubmit(async (data: FormData) => {
    const result = await dispatch(fetchSignIn(data));
    if (fetchSignIn.fulfilled.match(result)) {
      props.history.push('/top');
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
    setValues({
      ...values,
      [prop]: event.target.value,
      [isInputedOnce]: true,
      matchEmailPattern:
        prop === 'email'
          ? event.target.value.match(emailPattern) !== null
          : values.matchEmailPattern,
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
          Sign In
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
          {/* {errors.email && errors.email.type === 'pattern' ? (
            <div className={classes.errorMessage}>{errors.email.message}</div>
          ) : null} */}
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
              pattern: {
                value: emailPattern,
                message: 'Not match email pattern',
              },
            })}
            onChange={handleChange('email')}
          />
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={values.password === '' && values.isPasswordInputedOnce}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              type={values.showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              autoComplete="current-password"
              inputRef={register({
                required: true,
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
              {!values.password && values.isPasswordInputedOnce
                ? 'Please enter your password'
                : null}
            </FormHelperText>
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="remenber" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={
              values.email === '' ||
              values.password === '' ||
              !values.matchEmailPattern
            }
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
