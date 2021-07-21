import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { TrendsChart } from '../../components/TrendsChart';
import { months } from '../../data/months';

const StyledButton = styled(Button)`
  margin: 10px;
  background-color: #156a77;
`;

const StyledTypography = styled(Typography)`
  color: #156a77;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  height: 50vh;
  width: 50%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;

const Trends = () => {
  const dataLink = useLocation();
  const entries = dataLink.state.entries;

  const getMonthlyEntries = monthSequence => {
    const userData = entries.map(entry => {
      return {
        ...entry,
        dateArr: entry.date.split('-')
      };
    });
    return userData.filter(entry => entry.dateArr[1] === monthSequence);
  };

  const getMonthlyData = (monthLabel, monthSequence, monthName) => {
    const monthlyEntries = getMonthlyEntries(monthSequence);

    const monthlyExpensesList = monthlyEntries.filter(
      entry => entry.type === 'expense'
    );
    const monthlyExpensesArr = monthlyExpensesList.map(entry => entry.amount);
    const monthlyExpenses = monthlyExpensesArr.reduce(
      (a, c) => parseInt(a) + parseInt(c),
      0
    );

    const monthlyIncomesList = monthlyEntries.filter(
      entry => entry.type === 'income'
    );
    const monthlyIncomesArr = monthlyIncomesList.map(entry => entry.amount);
    const monthlyIncomes = monthlyIncomesArr.reduce(
      (a, c) => parseInt(a) + parseInt(c),
      0
    );

    const monthlyBalance = monthlyIncomes - monthlyExpenses;

    return {
      month: monthLabel,
      expenses: monthlyExpenses,
      incomes: monthlyIncomes,
      name: monthName,
      balance: monthlyBalance
    };
  };

  const getChartData = () => {
    return months.map(month => {
      return getMonthlyData(month.name.slice(0, 3), month.sequence, month.name);
    });
  };

  return (
    <Grid align="center">
      <StyledPaper elevation={10}>
        <Grid align="center">
          <StyledTypography variant="h4">Monthly Trends</StyledTypography>
        </Grid>
        <TrendsChart data={getChartData()} />
        <Grid>
          <StyledButton
            component={Link}
            variant="contained"
            color="secondary"
            to="/"
          >
            back
          </StyledButton>
        </Grid>
      </StyledPaper>
    </Grid>
  );
};

export default Trends;
