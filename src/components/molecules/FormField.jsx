import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";

const FormField = ({ 
  label, 
  type = "text", 
  name,
  value, 
  onChange,
  options = [],
  required = false,
  error,
  ...props 
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <Select name={name} value={value} onChange={onChange} {...props}>
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      case "textarea":
        return (
          <TextArea 
            name={name} 
            value={value} 
            onChange={onChange} 
            {...props} 
          />
        );
      default:
        return (
          <Input 
            type={type}
            name={name} 
            value={value} 
            onChange={onChange} 
            {...props} 
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-sm text-error-500">{error}</p>
      )}
    </div>
  );
};

export default FormField;