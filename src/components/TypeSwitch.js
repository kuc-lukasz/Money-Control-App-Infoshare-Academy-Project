import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const StyledButton = styled(Button)(props => ({
  background: props.background,
  color: 'white'
}));

const StyledButtonGroup = styled(ButtonGroup)`
  color: #156a77;
`;

const ButtonsContainer = styled.div``;

export const TypeSwitch = ({ setter }) => {
  const [focus, setFocus] = useState('all');

  const handleFocus = newFocus => {
    setFocus(newFocus);
  };

  return (
    <ButtonsContainer value={focus} onChange={handleFocus}>
      <StyledButtonGroup
        color="primary"
        aria-label="outlined primary button group"
      >
        <StyledButton
          onClick={() => {
            setter('all');
            setFocus('all');
          }}
          variant="contained"
          background={focus === 'all' ? '#156a77' : '#808080b3'}
          style={{ marginRight: 0 }}
        >
          All
        </StyledButton>
        <StyledButton
          onClick={() => {
            setter('incomes');
            setFocus('incomes');
          }}
          variant="contained"
          background={focus === 'incomes' ? '#156a77' : '#808080b3'}
          style={{ marginRight: 0 }}
        >
          Incomes
        </StyledButton>
        <StyledButton
          onClick={() => {
            setter('expenses');
            setFocus('expenses');
          }}
          variant="contained"
          background={focus === 'expenses' ? '#156a77' : '#808080b3'}
          style={{ marginRight: 0 }}
        >
          Expenses
        </StyledButton>
      </StyledButtonGroup>
    </ButtonsContainer>
  );
};
