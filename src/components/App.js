import React, { Component } from 'react';
import { v4 as uid } from 'uuid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Container from './Container';
import Filter from './Filter';
import Header from './Header';
import Notification from './Notification';
import Section from './Section/Section';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    // eslint-disable-next-line
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      // eslint-disable-next-line
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.some((contact) => contact.name === name)) {
      // eslint-disable-next-line
      alert(
        `${name
          .split(' ')
          .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
          .join(
            ' ',
          )} is already in contacts. Change contact's name or delete old.`,
      );
      return;
    }
    const id = uid();
    this.setState({
      contacts: [{ name, number, id }, ...contacts],
      filter: '',
    });
  };

  changeFilter = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const cleanFilter = filter.toLowerCase();
    return contacts
      .filter((contact) => contact.name.includes(cleanFilter))
      .sort((a, b) => a.name.localeCompare(b.name)); // сортируем контакты по алфавиту
  };

  deleteContact = (idContact) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(({ id }) => id !== idContact),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <Header />
        <Section title="Phone book">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          {contacts[0] ? (
            <Filter value={filter} onFilter={this.changeFilter} />
          ) : (
            <Notification message="No contacts added" />
          )}
          {contacts[0] && !filteredContacts[0] && (
            <Notification message="No contact found" />
          )}
          {filteredContacts[0] && (
            <ContactList
              contacts={filteredContacts}
              onDelete={this.deleteContact}
            />
          )}
        </Section>
      </Container>
    );
  }
}

export default App;
