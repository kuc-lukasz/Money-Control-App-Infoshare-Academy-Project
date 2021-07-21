import React from 'react';
import { Typography } from '@material-ui/core';
// eslint-disable-next-line
import styled from 'styled-components';
// eslint-disable-next-line
import { ThemeProvider } from 'styled-components';

const StyledTypography = styled(Typography)`
  color: ${props => props.theme.main};
  border: 1px solid ${props => props.theme.main};

  font-size: 18px;
  text-transform: uppercase;
  width: 55%;
  margin: 0 auto;
  margin-bottom: 16px;
  padding-top: 3.5px;
  padding-bottom: 3.5px;
  border-radius: 4px;
`;

const positive = {
  main: '#156a77'
};

const negative = {
  main: '#D1513B'
};

export const BalanceCounter = ({ data }) => {
  const monthlyExpensesList = data.filter(entry => entry.type === 'expense');
  const monthlyExpensesArr = monthlyExpensesList.map(entry => entry.amount);
  const monthlyExpenses = monthlyExpensesArr.reduce(
    (a, c) => parseInt(a) + parseInt(c),
    0
  );

  const monthlyIncomesList = data.filter(entry => entry.type === 'income');
  const monthlyIncomesArr = monthlyIncomesList.map(entry => entry.amount);
  const monthlyIncomes = monthlyIncomesArr.reduce(
    (a, c) => parseInt(a) + parseInt(c),
    0
  );

  const monthlyBalance = monthlyIncomes - monthlyExpenses;

  return (
    <>
      <ThemeProvider theme={monthlyBalance >= 0 ? positive : negative}>
        <StyledTypography
          style={{
            fontSize: '18px',
            textTransform: 'uppercase',
            width: '55%',
            margin: '0 auto',
            marginBottom: '16px',
            paddingTop: '3.5px',
            paddingBottom: '3.5px',
            borderRadius: '4px'
          }}
        >
          Balance: {monthlyBalance} PLN
        </StyledTypography>
      </ThemeProvider>
    </>
  );
};
