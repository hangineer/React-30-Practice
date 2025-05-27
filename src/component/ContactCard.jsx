import { useState, useEffect } from "react";

const ContactCard = ({ contact, onEdit, onCancel, onSave, isEditing }) => {

  const [editedContact, setEditedContact] = useState({ ...contact });

  useEffect(() => {
    if (isEditing) {
      setEditedContact({ ...contact });
    }
  }, [contact, isEditing]);

  const handleNameChange = (e) => {
    setEditedContact({ ...editedContact, name: e.target.value });
  };

  const handleCityChange = (e) => {
    setEditedContact({ ...editedContact, city: e.target.value });
  };

  const handleEdit = () => {
    onEdit(contact.id);
  };

  const handleCancel = () => {
    onCancel(contact.id);
  };

  const handleSave = () => {
    if (!editedContact.name || !editedContact.city) return;
    onSave(editedContact);
  };

  return (
    <div className="w-80 card bg-base-300 h-52" key={contact.id}>
      <div className="card-body flex flex-col justify-between">
        {!isEditing ? (
          <>
            <h2 className="card-title">{contact.name}</h2>
            <p>{contact.city}</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <label className="input p-2 w-full">
                Name*
                <input
                  type="text"
                  className="grow"
                  value={editedContact.name}
                  onChange={handleNameChange}
                  required
                />
              </label>
              <label className="input p-2 w-full">
                City*
                <input
                  type="text"
                  className="grow"
                  value={editedContact.city}
                  onChange={handleCityChange}
                  required
                />
              </label>
            </div>
            <div className="justify-end card-actions mt-4">
              <button className="btn" onClick={handleCancel}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
