import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './contacts-actions';

const itemsReducer = createReducer([], {
  [actions.addContact]: (state, { payload }) =>
    state.some(item => item.name === payload.name)
      ? (() => {
          // eslint-disable-next-line
          alert(
            `${payload.name
              .split(' ')
              .map(string => string.charAt(0).toUpperCase() + string.slice(1))
              .join(
                ' ',
              )} is already in contacts. Change contact's name or delete old.`,
          );
          return state;
        })()
      : [...state, payload],
  [actions.deleteContact]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filterReducer = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

export default contactsReducer;
