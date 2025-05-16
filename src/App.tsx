import React from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h1>📇 Lista de Contatos</h1>
      <ContactForm />
      <ContactList />
    </div>
  );
}
