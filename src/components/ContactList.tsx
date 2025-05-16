import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ContactItem from './ContactItem';

export default function ContactList() {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  return (
    <div>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
