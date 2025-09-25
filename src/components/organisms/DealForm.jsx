import React, { useState, useEffect } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const DealForm = ({ deal, contacts, companies, onSubmit, onCancel, isEditing = false }) => {
const [formData, setFormData] = useState({
    title: "",
    contactId: "",
    companyId: "",
    value: "",
    stage: "Lead",
    probability: "",
    expectedCloseDate: "",
    assignedTo: "John Smith",
    salesRep: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (deal) {
setFormData({
        title: deal.title || "",
        contactId: deal.contactId || "",
        companyId: deal.companyId || "",
        value: deal.value?.toString() || "",
        stage: deal.stage || "Lead",
        probability: deal.probability?.toString() || "",
        expectedCloseDate: deal.expectedCloseDate ? deal.expectedCloseDate.split("T")[0] : "",
        assignedTo: deal.assignedTo || "John Smith",
        salesRep: deal.salesRep || "",
        notes: deal.notes || ""
      });
    }
  }, [deal]);

  const stageOptions = [
    { value: "Lead", label: "Lead" },
    { value: "Qualified", label: "Qualified" },
    { value: "Proposal", label: "Proposal" },
    { value: "Negotiation", label: "Negotiation" },
    { value: "Closed Won", label: "Closed Won" },
    { value: "Closed Lost", label: "Closed Lost" }
  ];

  const contactOptions = contacts.map(contact => ({
    value: contact.Id.toString(),
    label: `${contact.firstName} ${contact.lastName}`
  }));

  const companyOptions = companies.map(company => ({
    value: company.Id.toString(),
    label: company.name
  }));

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
    
    if (!formData.title.trim()) {
      newErrors.title = "Deal title is required";
    }
    
    if (!formData.value || isNaN(formData.value) || parseFloat(formData.value) <= 0) {
      newErrors.value = "Valid deal value is required";
    }
    
    if (!formData.probability || isNaN(formData.probability) || parseFloat(formData.probability) < 0 || parseFloat(formData.probability) > 100) {
      newErrors.probability = "Probability must be between 0 and 100";
    }
    
    if (!formData.expectedCloseDate) {
      newErrors.expectedCloseDate = "Expected close date is required";
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
const submitData = {
        ...formData,
        value: parseFloat(formData.value),
        probability: parseInt(formData.probability),
        contactId: formData.contactId ? parseInt(formData.contactId) : null,
        companyId: formData.companyId ? parseInt(formData.companyId) : null
      };
      await onSubmit(submitData);
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
          {isEditing ? "Edit Deal" : "Add New Deal"}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <FormField
          label="Deal Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          error={errors.title}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Contact"
            name="contactId"
            type="select"
            value={formData.contactId}
            onChange={handleChange}
            options={contactOptions}
          />
          
          <FormField
            label="Company"
            name="companyId"
            type="select"
            value={formData.companyId}
            onChange={handleChange}
            options={companyOptions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Deal Value"
            name="value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            required
            error={errors.value}
            min="0"
            step="0.01"
          />
          
          <FormField
            label="Probability (%)"
            name="probability"
            type="number"
            value={formData.probability}
            onChange={handleChange}
            required
            error={errors.probability}
            min="0"
            max="100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Stage"
            name="stage"
            type="select"
            value={formData.stage}
            onChange={handleChange}
            options={stageOptions}
          />
          
          <FormField
            label="Expected Close Date"
            name="expectedCloseDate"
            type="date"
            value={formData.expectedCloseDate}
            onChange={handleChange}
            required
            error={errors.expectedCloseDate}
          />
</div>

        <FormField
          label="Sales Rep"
          name="salesRep"
          value={formData.salesRep}
          onChange={handleChange}
          placeholder="Enter sales representative name"
        />
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
                {isEditing ? "Update" : "Create"} Deal
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DealForm;