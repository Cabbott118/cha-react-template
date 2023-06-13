// MUI
import { Button } from '@mui/material';

// React Router
import { useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { clearData, logoutUser } from 'store/slices/userSlice';

// Routes
import routes from 'constants/routes';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout(event) {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(clearData());
    navigate(routes.LOGIN, { state: { from: location } });
  }

  return (
    <Button
      color='error'
      variant='contained'
      onClick={handleLogout}
      sx={{ textTransform: 'none' }}
    >
      Logout
    </Button>
  );
}