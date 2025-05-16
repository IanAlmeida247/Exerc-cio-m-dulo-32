import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ContactsState {
  contacts: Contact[];
  editingContact: Contact | null;
  nextId: number;
}

const initialState: ContactsState = {
  contacts: [],
  editingContact: null,
  nextId: 1,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
      state.contacts.push({ ...action.payload, id: state.nextId++ });
    },
    removeContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(c => c.id !== action.payload);
    },
    startEditing: (state, action: PayloadAction<number>) => {
      const contact = state.contacts.find(c => c.id === action.payload);
      state.editingContact = contact ?? null;
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
      state.editingContact = null;
    },
    cancelEditing: (state) => {
      state.editingContact = null;
    }
  },
});

export const {
  addContact,
  removeContact,
  startEditing,
  updateContact,
  cancelEditing
} = contactsSlice.actions;

export default contactsSlice.reducer;
