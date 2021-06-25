import contactsTypes from './contacts-types';

const addContact = array => ({
  type: contactsTypes.ADD_ITEM,
  payload: array,
});

const deleteContact = id => ({
  type: contactsTypes.DELETE_ITEM,
  payload: id,
});

const changeFilter = value => ({
  type: contactsTypes.CHANGE_FILTER,
  payload: value,
});

export default { addContact, deleteContact, changeFilter };
