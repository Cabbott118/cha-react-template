import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch } from 'react-redux';

const ContactUs = () => {
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { subject, email, message } = data;
    console.log(subject, email, message);
  };
  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <Typography
          variant='h4'
          component='h1'
          align='center'
          sx={{ py: 3, fontSize: 32 }}
        >
          Contact us
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label='Subject'
              fullWidth
              {...register('subject', { required: true })}
              error={errors.subject?.type === 'required'}
              helperText={
                errors.subject?.type === 'required' && 'Subject is required'
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
              label='Message'
              type='text'
              multiline
              rows={4}
              fullWidth
              {...register('message', { required: true })}
              error={errors.message?.type === 'required'}
              helperText={
                errors.message?.type === 'required' && 'Message is required'
              }
            />
          </Grid>
          {isAlertShowing && (
            <Grid item xs={12}>
              <Alert text='test' severity='error' />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
