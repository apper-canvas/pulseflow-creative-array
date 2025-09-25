import React, { useState, useEffect } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const ContactForm = ({ contact, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    status: "Lead",
    source: "",
    assignedTo: "John Smith",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phone: contact.phone || "",
        company: contact.company || "",
        position: contact.position || "",
        status: contact.status || "Lead",
        source: contact.source || "",
        assignedTo: contact.assignedTo || "John Smith",
        notes: contact.notes || ""
      });
    }
  }, [contact]);

  const statusOptions = [
    { value: "Lead", label: "Lead" },
    { value: "Qualified", label: "Qualified" },
    { value: "Customer", label: "Customer" },
    { value: "Inactive", label: "Inactive" }
  ];

  const sourceOptions = [
    { value: "Website", label: "Website" },
    { value: "Referral", label: "Referral" },
    { value: "Social Media", label: "Social Media" },
    { value: "Cold Call", label: "Cold Call" },
    { value: "Trade Show", label: "Trade Show" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditing ? "Edit Contact" : "Add New Contact"}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            error={errors.firstName}
          />
          
          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            error={errors.lastName}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />
          
          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            error={errors.phone}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          
          <FormField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Status"
            name="status"
            type="select"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
          />
          
          <FormField
            label="Source"
            name="source"
            type="select"
            value={formData.source}
            onChange={handleChange}
            options={sourceOptions}
          />
        </div>

        <FormField
          label="Notes"
          name="notes"
          type="textarea"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
        />

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                {isEditing ? "Update" : "Create"} Contact
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;