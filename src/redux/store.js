import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  contacts: {
    items: [],
    filter: '',
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'contacts/AddItem':
      return state.contacts.items.some(item => item.name === payload[0].name)
        ? // eslint-disable-next-line
          alert(
            `${payload[0].name
              .split(' ')
              .map(string => string.charAt(0).toUpperCase() + string.slice(1))
              .join(
                ' ',
              )} is already in contacts. Change contact's name or delete old.`,
          )
        : {
            contacts: {
              ...state.contacts,
              items: [...state.contacts.items, ...payload],
            },
          };
    case 'contacts/DeleteItem':
      return {
        contacts: {
          ...state.contacts,
          items: state.contacts.items.filter(({ id }) => id !== payload),
        },
      };
    case 'contacts/ChangeFilter':
      return {
        contacts: {
          ...state.contacts,
          filter: payload,
        },
      };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools());

export default store;
