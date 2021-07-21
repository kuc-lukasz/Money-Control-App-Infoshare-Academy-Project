import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

const StyledButtonCancel = styled(Button)`
  font-size: 12px;
  color: white;
  margin: 10px;
  background-color: #d1513b;
  :hover {
    background-color: #13c1b6;
  }
`;

const UpdateProfile = () => {
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [serverError, setServerError] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.password.value !== e.target.passwordConfirm.value) {
      return setInputError('Passwords do not match');
    }
    const promises = [];
    setLoading(true);
    setInputError('');
    if (e.target.email.value !== currentUser.email) {
      promises.push(() => updateEmail(e.target.email.value));
    }
    if (e.target.password.value) {
      promises.push(() => updatePassword(e.target.password.value));
    }
    const runUpdates = promises => {
      if (promises.length === 0) {
        return Promise.resolve();
      }
      const [firstPromise, ...otherPromises] = promises;
      return firstPromise().then(() => runUpdates(otherPromises));
    };
    runUpdates(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setServerError('Failed to update account');
        setLoading(false);
      });
  }

  return (
    <Grid align="center">
      <StyledPaper elevation={10}>
        <Grid align="center">
          <StyledAvatar>
            <LockOpenOutlinedIcon />
          </StyledAvatar>
          <Typography variant="h4">Update Profile</Typography>
        </Grid>
        {serverError && <AlertSnackbar error={serverError} />}
        <form onSubmit={handleSubmit}>
          <StyledTextField
            id="email"
            name="email"
            label="E-mail"
            variant="outlined"
            helperText=""
            type="email"
            required
          />
          <StyledTextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            helperText={
              inputError === '' ? 'Leave blank to keep the same' : inputError
            }
            error={inputError ? true : false}
          />
          <StyledTextField
            id="password-confirm"
            name="passwordConfirm"
            label="Password Confirmation"
            variant="outlined"
            type="password"
            helperText={
              inputError === '' ? 'Leave blank to keep the same' : inputError
            }
            error={inputError ? true : false}
          />
          <Grid>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              onSubmit={handleSubmit}
              disabled={loading}
            >
              Update Profile
            </StyledButton>
          </Grid>
        </form>
        <StyledButtonCancel
          type="submit"
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
        >
          Cancel
        </StyledButtonCancel>
      </StyledPaper>
    </Grid>
  );
};

export default UpdateProfile;
