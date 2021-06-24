import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const itemsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'contacts/AddItem':
      return state.some(item => item.name === payload[0].name)
        ? // eslint-disable-next-line
          alert(
            `${payload[0].name
              .split(' ')
              .map(string => string.charAt(0).toUpperCase() + string.slice(1))
              .join(
                ' ',
              )} is already in contacts. Change contact's name or delete old.`,
          )
        : [...state, ...payload];
    case 'contacts/DeleteItem':
      return state.filter(({ id }) => id !== payload);
    default:
      return state;
  }
};
const filterReducer = (state = '', { type, payload }) => {
  switch (type) {
    case 'contacts/ChangeFilter':
      return payload;

    default:
      return state;
  }
};

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
