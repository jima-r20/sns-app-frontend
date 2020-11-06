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

// import { RouteComponentProps } from 'react-router-dom';
// import * as H from 'history';
// interface Props extends RouteComponentProps<{}> {
//   history: H.History;
// }

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

interface FormData {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const classes = authDefaultStyles();
  const { register, errors, handleSubmit } = useForm<FormData>();

  const [values, setValues] = useState<State>({
    email: 'init',
    password: 'init',
    showPassword: false,
  });

  const handleSignIn = handleSubmit(({ email, password }) => {
    console.log(
      `handleSignIn is called. data: { email: ${email}, password: ${password} }`
    );
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [prop]: event.target.value,
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
          {errors.email && errors.email.type === 'pattern' ? (
            <div className={classes.errorMessage}>{errors.email.message}</div>
          ) : null}
          <TextField
            error={values.email === ''}
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
              !values.email ? 'Please enter your email address' : null
            }
            inputRef={register({
              required: true,
              pattern: {
                value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                message: 'Not match email pattern',
              },
            })}
            onChange={handleChange('email')}
          />
          {/* <TextField
            error={values.password === ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            helperText={
              values.password === '' ? 'Please enter your password' : null
            }
            inputRef={register({
              required: true,
            })}
            onChange={handleChange('password')}
          /> */}

          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={values.password === ''}
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
              {!values.password ? 'Please enter your password' : null}
            </FormHelperText>
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="remenber" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={
              values.email === '' ||
              values.email === 'init' ||
              values.password === '' ||
              values.password === 'init'
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
