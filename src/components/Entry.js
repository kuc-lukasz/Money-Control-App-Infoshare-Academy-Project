import React from 'react';
import { database } from '../config/firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UpdateIcon from '@material-ui/icons/Create';

const AmountText = styled(ListItemText)(props => ({
  color: props.color
}));

const StyledListItemText = styled(ListItemText)`
  flex: 1 1 0px;
`;

export const Entry = ({ entry }) => {
  const onDelete = () => {
    database.entries.doc(entry.id).delete();
  };

  return (
    <ListItem divider>
      <StyledListItemText>{entry.category}</StyledListItemText>
      <StyledListItemText>{entry.note}</StyledListItemText>
      <StyledListItemText>{entry.date}</StyledListItemText>
      <AmountText
        color={entry.type === 'income' ? '#29C481' : '#D1513B'}
        style={{ flex: '1 1 0px' }}
      >
        {entry.amount} PLN
      </AmountText>
      {entry.type === 'income' ? (
        <IconButton
          component={Link}
          color="primary"
          to={{
            pathname: '/add-entry',
            state: {
              entry,
              operation: 'Update',
              type: 'income',
              options: ['Work', 'Gifts', 'Other']
            }
          }}
        >
          <UpdateIcon />
        </IconButton>
      ) : (
        <IconButton
          component={Link}
          color="primary"
          to={{
            pathname: '/add-entry',
            state: {
              entry,
              operation: 'Update',
              type: 'expense',
              options: [
                'Food',
                'Transport',
                'Accomodation',
                'Entertainment',
                'Other'
              ]
            }
          }}
        >
          <UpdateIcon />
        </IconButton>
      )}
      <IconButton onClick={onDelete}>
        <HighlightOffIcon color="secondary" />
      </IconButton>
    </ListItem>
  );
};
