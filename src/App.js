// Components
import Navbar from 'components/layout/Navbar';

// MUI
import { Box, Container, Typography, ThemeProvider } from '@mui/material';
import theme from './styles/theme';

// Pages
import Login from 'pages/auth/Login';
import Signup from 'pages/auth/Signup';
import Dashboard from 'pages/dashboard/Dashboard';
import Home from 'pages/home/Home';
import AboutUs from 'pages/aboutUs/AboutUs';
import ContactUs from 'pages/contactUs/ContactUs';
import ForgotPassword from 'pages/forgotPassword/ForgotPassword';
import ForgotPasswordConfirmation from 'pages/forgotPassword/ForgotPasswordConfirmation';
import RequireAuth from 'routes/requireAuth';

// React Router
import { Outlet, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route
              path='/dashboard'
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route index path='' element={<Dashboard />} />
            </Route>
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route
              path='*'
              element={
                <>
                  <Container sx={{ height: '90vh', pt: '30vh' }}>
                    <Typography
                      variant='h1'
                      align='center'
                      sx={{ fontSize: 36, fontWeight: 500 }}
                    >
                      404 Not Found
                    </Typography>
                    <Typography
                      variant='h6'
                      align='center'
                      sx={{ fontWeight: 400 }}
                    >
                      You'll have to journey elsewhere.
                    </Typography>
                  </Container>
                </>
              }
            />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/forgot-password-confirmation'
            element={<ForgotPasswordConfirmation />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
