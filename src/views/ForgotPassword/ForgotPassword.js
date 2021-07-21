import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography
} from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useAuth } from '../../contexts/AuthContext';
import AlertSnackbar from '../../components/AlertSnackbar';

const StyledButton = styled(Button)`
  margin: 10px;
  background-color: #156a77;
  :hover {
    background-color: #13c1b6;
  }
`;

const StyledAvatar = styled(Avatar)`
  background-color: #156a77;
`;

const StyledTextField = styled(TextField)`
  margin: 1rem;
  width: '25ch';
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  width: 280px;
  margin: 20px auto;
`;

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(e.target.email.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
      setLoading(false);
    }
  }

  return (
    <Grid align="center">
      <StyledPaper elevation={10}>
        <Grid align="center">
          <StyledAvatar>
            <LockOpenOutlinedIcon />
          </StyledAvatar>
          <Typography variant="h4">Reset Password</Typography>
        </Grid>
        {error && <AlertSnackbar error={error} />}
        {message && <AlertSnackbar error={message} />}
        <form onSubmit={handleSubmit}>
          <StyledTextField
            id="email"
            name="email"
            label="E-mail"
            variant="outlined"
            helperText=""
            required
          />
          <Grid>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Reset Password
            </StyledButton>
            <Typography>
              <Link to="/signin">Sign In</Link>
            </Typography>
            <Typography>
              Need an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Grid>
        </form>
      </StyledPaper>
    </Grid>
  );
};

export default ForgotPassword;
