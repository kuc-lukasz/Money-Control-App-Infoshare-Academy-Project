import React from 'react';
import styled from 'styled-components';
import { IconButton, Typography } from '@material-ui/core';
import KeyboardArrowLeftOutlinedIcon from '@material-ui/icons/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import { months } from '../data/months';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)`
  background-color: #156a77;
  color: white;
  &:hover {
    background-color: gray;
  }
`;

const StyledTypography = styled(Typography)`
  color: #156a77;
  font-size: 18px;
  font-weight: bold;
  width: 100px;
`;

export const MonthSwitch = ({
  currentMonth,
  handleClickNext,
  handleClickPrev
}) => {
  return (
    <ButtonsContainer>
      <StyledIconButton
        onClick={handleClickPrev}
        disabled={currentMonth === 1 && true}
        size="small"
        style={{ marginLeft: 0 }}
      >
        <KeyboardArrowLeftOutlinedIcon fontSize="default" />
      </StyledIconButton>
      <StyledTypography>{months[currentMonth - 1].name}</StyledTypography>
      <StyledIconButton
        onClick={handleClickNext}
        disabled={currentMonth === 12 && true}
        size="small"
      >
        <KeyboardArrowRightOutlinedIcon fontSize="default" />
      </StyledIconButton>
    </ButtonsContainer>
  );
};
