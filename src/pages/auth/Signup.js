import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';
import AuthenticationHeader from 'pages/auth/components/AuthenticationHeader';
import AuthenticationFooter from 'pages/auth/components/AuthenticationFooter';

// Constants
import routes from 'constants/routes';

// Helpers
import passwordMatch from 'services/helpers/passwordMatch';
import errorTransformer from 'constants/errorTransformer';

// MUI
import { Box, Button, Container, Grid, TextField } from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, createUser, clearUserData } from 'store/slices/userSlice';

export default function Signup() {
  const pageName = 'Sign up';
  document.title = pageName;

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMissmatch, setPasswordMissmatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { email, firstName, lastName, password, confirmPassword } = data;
    if (passwordMatch(password, confirmPassword)) {
      dispatch(clearUserData());
      dispatch(signUpUser({ email, password })).then((action) => {
        if (!action.payload.uid) {
          setErrorMessage(errorTransformer(action.payload));
          setIsAlertShowing(true);
          setTimeout(() => {
            dispatch(clearUserData());
            setIsAlertShowing(false);
          }, 5000);
        } else {
          dispatch(
            createUser({
              email,
              userId: action.payload.uid,
              firstName,
              lastName,
            })
          );
        }
      });
    } else {
      setPasswordMissmatch(true);
    }
  };

  if (data) {
    return <Navigate to={routes.HOME} replace />;
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <AuthenticationHeader title={pageName} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              label='First Name'
              {...register('firstName', { required: true })}
              error={errors.firstName?.type === 'required'}
              helperText={
                errors.firstName?.type === 'required' &&
                'First name is required'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Last Name'
              {...register('lastName', { required: true })}
              error={errors.lastName?.type === 'required'}
              helperText={
                errors.lastName?.type === 'required' && 'Last name is required'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Email'
              fullWidth
              {...register('email', { required: true })}
              error={errors.email?.type === 'required'}
              helperText={
                errors.email?.type === 'required' && 'Email is required'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              {...register('password', { required: true })}
              error={errors.password?.type === 'required' || passwordMissmatch}
              helperText={
                errors.password?.type === 'required' && 'Password is required'
              }
              InputProps={{
                endAdornment: (
                  <Button
                    variant='text'
                    color='secondary'
                    onClick={handleClickShowPassword}
                    sx={{ textTransform: 'none' }}
                  >
                    {!showPassword ? 'Show' : 'Hide'}
                  </Button>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Confirm Password'
              type='password'
              fullWidth
              {...register('confirmPassword', { required: true })}
              error={
                errors.confirmPassword?.type === 'required' || passwordMissmatch
              }
              helperText={
                (errors.confirmPassword?.type === 'required' &&
                  'Confirm password is required') ||
                (passwordMissmatch === true && 'Passwords do not match')
              }
            />
          </Grid>
          {isAlertShowing && (
            <Grid item xs={12}>
              <Alert text={errorMessage} severity='error' />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
        <AuthenticationFooter type={pageName} />
      </Container>
    </Box>
  );
}
