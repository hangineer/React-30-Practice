import { useState } from "react";
import ContactForm from "@/component/ContactForm";
import ContactCard from "@/component/ContactCard";

const contacts = [
  { "id": "1", "name": "Alice Johnson", "city": "New York" },
  { "id": "2", "name": "Bob Smith", "city": "Los Angeles" },
  { "id": "3", "name": "Charlie Brown", "city": "Chicago" },
];

function Day10() {
  const [contactsList, setContactsList] = useState(contacts);
  const [editingId, setEditingId] = useState(null); // 預設沒有人處於編輯狀態

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = (updatedContact) => {
    setContactsList(contactsList.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    ));
    setEditingId(null);
  };

  const handleAddContact = (newContact) => {
    setContactsList([...contactsList, newContact]);
  };

  return (
    <>
      <h2 className="text-2xl">Day 10: Create a simple Contact Book app</h2>
      <a href="https://reactpractice.dev/exercise/create-a-simple-contact-book-app/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      <h2 className="text-3xl py-6">Contacts Book</h2>
      <ContactForm onAddContact={handleAddContact} />
      <div className="w-full mt-8">
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactsList.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                isEditing={editingId === contact.id}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Day10;
