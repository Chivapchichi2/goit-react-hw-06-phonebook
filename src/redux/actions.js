const addContact = array => ({
  type: 'contacts/AddItem',
  payload: array,
});

const deleteContact = id => ({
  type: 'contacts/DeleteItem',
  payload: id,
});

const changeFilter = value => ({
  type: 'contacts/ChangeFilter',
  payload: value,
});

export default { addContact, deleteContact, changeFilter };
