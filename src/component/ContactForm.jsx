import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ContactForm({ onAddContact }) {
  const [newContact, setNewContact] = useState({ name: "", city: "" });

  const handleNameChange = (e) => {
    setNewContact({ ...newContact, name: e.target.value });
  };

  const handleCityChange = (e) => {
    setNewContact({ ...newContact, city: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newContact.name || !newContact.city) return;


    onAddContact({
      id: uuidv4(),
      name: newContact.name,
      city: newContact.city
    });

    setNewContact({ name: "", city: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 bg-white w-full p-6 rounded-sm">
      <label className="input p-2">
        Name*
        <input
          type="text"
          className="grow"
          value={newContact.name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="input p-2">
        City*
        <input
          type="text"
          className="grow"
          value={newContact.city}
          onChange={handleCityChange}
          required
        />
      </label>
      <button type="submit" className="btn btn-primary">Add Contact</button>
    </form>
  );
}

export default ContactForm;
