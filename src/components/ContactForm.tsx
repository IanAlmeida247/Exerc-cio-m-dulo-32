import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addContact, updateContact, cancelEditing } from '../redux/contactsSlice';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button<{ editing?: boolean }>`
  padding: 10px;
  background: ${props => props.editing ? '#28a745' : '#007bff'};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${props => props.editing ? '#218838' : '#0056b3'};
  }
`;

const CancelButton = styled.button`
  padding: 10px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export default function ContactForm() {
  const dispatch: AppDispatch = useDispatch();
  const editingContact = useSelector((state: RootState) => state.contacts.editingContact);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', id: 0 });

  useEffect(() => {
    if (editingContact) {
      setFormData(editingContact);
    } else {
      setFormData({ name: '', email: '', phone: '', id: 0 });
    }
  }, [editingContact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContact) {
      dispatch(updateContact(formData));
    } else {
      dispatch(addContact({ name: formData.name, email: formData.email, phone: formData.phone }));
    }
    setFormData({ name: '', email: '', phone: '', id: 0 });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" placeholder="Nome completo" value={formData.name} onChange={handleChange} required />
      <Input name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
      <Input name="phone" placeholder="Telefone" value={formData.phone} onChange={handleChange} required />
      <Button type="submit" editing={!!editingContact}>
        {editingContact ? 'Salvar Alterações' : 'Adicionar Contato'}
      </Button>
      {editingContact && <CancelButton type="button" onClick={() => dispatch(cancelEditing())}>Cancelar</CancelButton>}
    </Form>
  );
}
