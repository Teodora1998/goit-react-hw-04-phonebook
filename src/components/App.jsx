import css from './App.module.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { FilterContacts } from './Filter/FilterContacts';

const startContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  { id: 'id-5', name: 'Dobby Potteristollen', number: '327-61-55' },
];
export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactStorage = localStorage.getItem('contacts');
    return contactStorage ? JSON.parse(contactStorage) : startContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = newContact => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts.`);
    } else {
      const contact = {
        id: nanoid(),
        name: newContact.name,
        number: newContact.number,
      };
      setContacts([...contacts, contact]);
    }
  };
  const handleFilter = term => {
    setFilter(term);
  };
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
  );
  return (
    <div className={css.form__container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <h2 className={css.subtitle}>Contacts</h2>
      <FilterContacts onFilter={handleFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};
