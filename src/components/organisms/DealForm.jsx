import React, { useState, useEffect } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const DealForm = ({ deal, contacts, companies, salesReps, onSubmit, onCancel, isEditing = false }) => {
const [formData, setFormData] = useState({
    title_c: "",
    contact_id_c: "",
    company_id_c: "",
    value_c: "",
    stage_c: "Lead",
    probability_c: "",
    expectedCloseDate: "",
    sales_rep_id_c: "",
    notes_c: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
if (deal) {
setFormData({
        title_c: deal.title_c || deal.title || "",
        contact_id_c: deal.contact_id_c?.Id || deal.contactId || "",
        company_id_c: deal.company_id_c?.Id || deal.companyId || "",
        value_c: deal.value_c?.toString() || deal.value?.toString() || "",
        stage_c: deal.stage_c || deal.stage || "Lead",
        probability_c: deal.probability_c?.toString() || deal.probability?.toString() || "",
        expectedCloseDate: deal.expectedCloseDate ? deal.expectedCloseDate.split("T")[0] : "",
        sales_rep_id_c: deal.sales_rep_id_c?.toString() || deal.salesRepId?.toString() || "",
        notes_c: deal.notes_c || deal.notes || ""
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
    label: `${contact.first_name_c || contact.firstName} ${contact.last_name_c || contact.lastName}`
  }));
  
  const companyOptions = companies.map(company => ({
    value: company.Id.toString(),
    label: company.name_c || company.name
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
    
if (!formData.title_c.trim()) {
      newErrors.title_c = "Deal title is required";
    }
    
    if (!formData.value_c || isNaN(formData.value_c) || parseFloat(formData.value_c) <= 0) {
      newErrors.value_c = "Valid deal value is required";
    }
    
    if (!formData.probability_c || isNaN(formData.probability_c) || parseFloat(formData.probability_c) < 0 || parseFloat(formData.probability_c) > 100) {
      newErrors.probability_c = "Probability must be between 0 and 100";
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
        value_c: parseFloat(formData.value_c),
        probability_c: parseInt(formData.probability_c),
        contact_id_c: formData.contact_id_c ? parseInt(formData.contact_id_c) : null,
        company_id_c: formData.company_id_c ? parseInt(formData.company_id_c) : null,
        sales_rep_id_c: formData.sales_rep_id_c ? parseInt(formData.sales_rep_id_c) : null,
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
          name="title_c"
          value={formData.title_c}
          onChange={handleChange}
          required
          error={errors.title_c}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Contact"
            name="contact_id_c"
            type="select"
            value={formData.contact_id_c}
            onChange={handleChange}
            options={[
              { value: "", label: "Select Contact" },
              ...contactOptions
            ]}
          />
          
          <FormField
            label="Company"
            name="company_id_c"
            type="select"
            value={formData.company_id_c}
            onChange={handleChange}
            options={[
              { value: "", label: "Select Company" },
              ...companyOptions
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Deal Value"
            name="value_c"
            type="number"
            value={formData.value_c}
            onChange={handleChange}
            required
            error={errors.value_c}
            min="0"
            step="0.01"
          />
          
          <FormField
            label="Probability (%)"
            name="probability_c"
            type="number"
            value={formData.probability_c}
            onChange={handleChange}
            required
            error={errors.probability_c}
            min="0"
            max="100"
          />
        </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Stage"
            name="stage_c"
            type="select"
            value={formData.stage_c}
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
          label="Sales Representative"
          name="sales_rep_id_c"
          type="select"
          value={formData.sales_rep_id_c}
          onChange={handleChange}
          options={[
            { value: "", label: "Select Sales Rep" },
            ...(salesReps || []).map(rep => ({ 
              value: rep.Id.toString(), 
              label: `${rep.name} - ${rep.territory}` 
            }))
          ]}
          placeholder="Choose a sales representative"
        />

        
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