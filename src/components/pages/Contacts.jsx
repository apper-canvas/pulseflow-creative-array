import React, { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import ContactList from "@/components/organisms/ContactList";
import ContactForm from "@/components/organisms/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { contactService } from "@/services/api/contactService";
import { toast } from "react-toastify";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const loadContacts = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError("Failed to load contacts");
      console.error("Contact loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleAddContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = async (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
      try {
        await contactService.delete(contact.Id);
        setContacts(prev => prev.filter(c => c.Id !== contact.Id));
        toast.success("Contact deleted successfully");
      } catch (err) {
        toast.error("Failed to delete contact");
        console.error("Delete error:", err);
      }
    }
  };

  const handleViewContact = (contact) => {
    // For now, just edit the contact
    handleEditContact(contact);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingContact) {
        const updated = await contactService.update(editingContact.Id, formData);
        setContacts(prev => prev.map(c => c.Id === editingContact.Id ? updated : c));
        toast.success("Contact updated successfully");
      } else {
        const newContact = await contactService.create(formData);
        setContacts(prev => [...prev, newContact]);
        toast.success("Contact created successfully");
      }
      setShowForm(false);
      setEditingContact(null);
    } catch (err) {
      toast.error("Failed to save contact");
      console.error("Save error:", err);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  const filteredContacts = contacts.filter(contact =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return (
      <ContactForm
        contact={editingContact}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        isEditing={!!editingContact}
      />
    );
  }

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadContacts} />;

  return (
    <div className="space-y-6">
      <Header
        title="Contacts"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAddContact}
        addLabel="Add Contact"
      />

      {filteredContacts.length === 0 ? (
        <Empty
          title="No contacts found"
          message={searchTerm ? "Try adjusting your search criteria." : "Get started by adding your first contact."}
          actionLabel="Add Contact"
          onAction={handleAddContact}
          icon="Users"
        />
      ) : (
        <ContactList
          contacts={filteredContacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          onView={handleViewContact}
        />
      )}
    </div>
  );
};

export default Contacts;