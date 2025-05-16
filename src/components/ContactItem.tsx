import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeContact, startEditing } from '../redux/contactsSlice';
import { Contact } from '../redux/contactsSlice';

const Card = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
`;

const Info = styled.p`
  margin: 4px 0;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
`;

const Button = styled.button<{ danger?: boolean }>`
  padding: 8px 12px;
  margin-right: 10px;
  border: none;
  background-color: ${props => props.danger ? '#dc3545' : '#17a2b8'};
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.danger ? '#c82333' : '#138496'};
  }
`;

interface Props {
  contact: Contact;
}

export default function ContactItem({ contact }: Props) {
  const dispatch = useDispatch();

  return (
    <Card>
      <Info><strong>Nome:</strong> {contact.name}</Info>
      <Info><strong>Email:</strong> {contact.email}</Info>
      <Info><strong>Telefone:</strong> {contact.phone}</Info>
      <ButtonGroup>
        <Button onClick={() => dispatch(startEditing(contact.id))}>Editar</Button>
        <Button danger onClick={() => dispatch(removeContact(contact.id))}>Remover</Button>
      </ButtonGroup>
    </Card>
  );
}
