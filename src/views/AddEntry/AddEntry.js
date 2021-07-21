import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { database } from '../../config/firebase';
import { Link, useLocation, useHistory } from 'react-router-dom';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin: 10px;
  background-color: #156a77;
  margin-top: 25px;
  :hover {
    background-color: #13c1b6;
  }
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

const StyledTextField = styled(TextField)`
  margin-top: 1rem;
  width: 248px;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  height: 50%;
  width: 280px;
  margin: 20px auto;
`;

const StyledSelect = styled(Select)`
  width: 248px;
  margin-top: 1rem;
`;

const AddEntry = () => {
  const { currentUser } = useAuth();
  const dataLink = useLocation();
  const history = useHistory();
  const [category, setCategory] = useState(
    dataLink.state.operation === 'Add' ? '0' : dataLink.state.entry.category
  );
  const [note, setNote] = useState(
    dataLink.state.operation === 'Add' ? '' : dataLink.state.entry.note
  );
  const [amount, setAmount] = useState(
    dataLink.state.operation === 'Add' ? '' : dataLink.state.entry.amount
  );
  const [date, setDate] = useState(
    dataLink.state.operation === 'Add' ? '' : dataLink.state.entry.date
  );

  const handleCreate = e => {
    e.preventDefault();
    database.entries.add({
      userId: currentUser.uid,
      createdAt: database.getCurrentTimestamp(),
      type: dataLink.state.type,
      date: e.target.date.value,
      amount: e.target.amount.value,
      note: e.target.note.value,
      category: e.target.category.value
    });
    history.push('/');
  };

  const handleUpdate = e => {
    e.preventDefault();
    database.entries.doc(dataLink.state.entry.id).set({
      ...dataLink.state.entry,
      category,
      note,
      amount,
      date
    });
    history.push('/');
  };

  return (
    <Grid align="center">
      <StyledPaper elevation={10}>
        <Typography variant="h5">
          {dataLink.state.operation} {dataLink.state.type}
        </Typography>
        <Form
          onSubmit={
            dataLink.state.operation === 'Add' ? handleCreate : handleUpdate
          }
        >
          <StyledTextField
            type="date"
            name="date"
            variant="outlined"
            helperText=""
            required
            value={date}
            onChange={e => {
              setDate(e.target.value);
            }}
            style={{ marginBottom: '1rem' }}
          />

          <StyledTextField
            type="number"
            name="amount"
            label="Amount"
            variant="outlined"
            helperText="Only numbers"
            required
            min="0"
            value={amount}
            onChange={e => {
              setAmount(e.target.value);
            }}
          />

          <StyledTextField
            type="text"
            name="note"
            label="Note"
            variant="outlined"
            helperText="Optional"
            value={note}
            onChange={e => {
              setNote(e.target.value);
            }}
          />

          <StyledSelect
            value={category}
            onChange={e => {
              setCategory(e.target.value);
            }}
            name="category"
            required
            variant="outlined"
          >
            <MenuItem value="0" disabled>
              --Category--
            </MenuItem>
            {dataLink.state.options.map((option, key) => (
              <MenuItem key={key} value={option}>
                {option}
              </MenuItem>
            ))}
          </StyledSelect>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
          >
            Submit
          </StyledButton>
        </Form>
        <StyledButtonCancel
          type="submit"
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
          endIcon={<DeleteIcon />}
        >
          Cancel
        </StyledButtonCancel>
      </StyledPaper>
    </Grid>
  );
};

export default AddEntry;
