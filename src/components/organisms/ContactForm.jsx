import React, { useState, useEffect } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const ContactForm = ({ contact, onSubmit, onCancel, isEditing = false }) => {
const [formData, setFormData] = useState({
    first_name_c: "",
    last_name_c: "",
    email_c: "",
    phone_c: "",
    company_c: "",
    position_c: "",
    status_c: "Lead",
    source_c: "",
    assigned_to_c: "John Smith",
    notes_c: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with contact data when editing
  useEffect(() => {
    if (contact) {
      setFormData({
        first_name_c: contact.first_name_c || contact.firstName || "",
        last_name_c: contact.last_name_c || contact.lastName || "",
        email_c: contact.email_c || contact.email || "",
        phone_c: contact.phone_c || contact.phone || "",
        company_c: contact.company_c || contact.company || "",
        position_c: contact.position_c || contact.position || "",
        status_c: contact.status_c || contact.status || "Lead",
        source_c: contact.source_c || contact.source || "",
        assigned_to_c: contact.assigned_to_c || contact.assignedTo || "John Smith",
        notes_c: contact.notes_c || contact.notes || ""
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
    
if (!formData.first_name_c.trim()) {
      newErrors.first_name_c = "First name is required";
    }
    
    if (!formData.last_name_c.trim()) {
      newErrors.last_name_c = "Last name is required";
    }
    
    if (!formData.email_c.trim()) {
      newErrors.email_c = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email_c)) {
      newErrors.email_c = "Email is invalid";
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
name="first_name_c"
            value={formData.first_name_c}
            onChange={handleChange}
            required
            error={errors.first_name_c}
          />
          
          <FormField
            label="Last Name"
            name="last_name_c"
            value={formData.last_name_c}
            onChange={handleChange}
            required
            error={errors.last_name_c}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Email"
            name="email_c"
            type="email"
            value={formData.email_c}
            onChange={handleChange}
            required
            error={errors.email_c}
          />
          
          <FormField
            label="Phone"
            name="phone_c"
            type="tel"
            value={formData.phone_c}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Company"
            name="company_c"
            value={formData.company_c}
            onChange={handleChange}
          />
          
          <FormField
            label="Position"
            name="position_c"
            value={formData.position_c}
            onChange={handleChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Status"
            name="status_c"
            type="select"
            value={formData.status_c}
            onChange={handleChange}
            options={statusOptions}
          />
          
          <FormField
            label="Source"
            name="source_c"
            type="select"
            value={formData.source_c}
            onChange={handleChange}
            options={sourceOptions}
          />
        </div>
        
        <FormField
          label="Notes"
          name="notes_c"
          type="textarea"
          value={formData.notes_c}
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