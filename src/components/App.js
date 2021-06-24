import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uid } from 'uuid';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Container from './Container';
import Filter from './Filter';
import Header from './Header';
import Notification from './Notification';
import Section from './Section/Section';
// import store from '../redux/store';

const App = ({ filter, items, onSubmit, changeFilter, deleteContact }) => {
  const cleanFilter = filter.toLowerCase();
  const filteredContacts = items
    .filter(item => item.name.includes(cleanFilter))
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <Container>
      <Header />
      <Section title="Phone book">
        <ContactForm onSubmit={onSubmit} />
      </Section>
      <Section title="Contacts">
        {items[0] ? (
          <Filter value={filter} onFilter={changeFilter} />
        ) : (
          <Notification message="No contacts added" />
        )}
        {items[0] && !filteredContacts[0] && (
          <Notification message="No contact found" />
        )}
        {filteredContacts[0] && (
          <ContactList contacts={filteredContacts} onDelete={deleteContact} />
        )}
      </Section>
    </Container>
  );
};

App.propTypes = {
  filter: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSubmit: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.contacts.items,
  filter: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ name, number }) =>
    dispatch(
      actions.addContact([
        {
          id: uid(),
          name,
          number,
        },
      ]),
    ),
  deleteContact: idContact => dispatch(actions.deleteContact(idContact)),
  changeFilter: ({ target: { value } }) =>
    dispatch(actions.changeFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
