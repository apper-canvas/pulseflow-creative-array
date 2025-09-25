import React, { useEffect, useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";
import Label from "@/components/atoms/Label";

const TaskForm = ({ isOpen, onClose, task = null, onSubmit, loading = false }) => {
const [formData, setFormData] = useState({
    title_c: '',
    description_c: '',
    priority_c: 'Medium',
    status_c: 'Pending',
    due_date_c: '',
    assigned_to_c: ''
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (task) {
      // Edit mode - populate form with existing task data
      setFormData({
        title_c: task.title_c || task.title || '',
        description_c: task.description_c || task.description || '',
        priority_c: task.priority_c || task.priority || 'Medium',
        status_c: task.status_c || task.status || 'Pending',
        due_date_c: task.due_date_c ? task.due_date_c.split('T')[0] : (task.dueDate ? task.dueDate.split('T')[0] : ''),
        assigned_to_c: task.assigned_to_c || task.assignedTo || ''
      });
} else {
      // Create mode - reset form
      setFormData({
        title_c: '',
        description_c: '',
        priority_c: 'Medium',
        status_c: 'Pending',
        due_date_c: '',
        assigned_to_c: ''
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

if (!formData.title_c.trim()) {
      newErrors.title_c = 'Task title is required';
    }
    
    if (!formData.due_date_c) {
      newErrors.due_date_c = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.due_date_c);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.due_date_c = 'Due date cannot be in the past';
      }
}

    if (!formData.assigned_to_c.trim()) {
      newErrors.assigned_to_c = 'Assigned to field is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Format the data for submission
const submitData = {
      ...formData,
      due_date_c: new Date(formData.due_date_c).toISOString()
    };

    onSubmit(submitData);

    // Reset form after successful submission
    setFormData({
      title_c: '',
      description_c: '',
      priority_c: 'Medium',
      status_c: 'Pending',
      due_date_c: '',
      assigned_to_c: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
<Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={loading}
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
value={formData.title_c}
                onChange={(e) => handleInputChange('title_c', e.target.value)}
                placeholder="Enter task title"
                error={errors.title_c}
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="description_c">Description</Label>
              <TextArea
                id="description_c"
                value={formData.description_c}
                onChange={(e) => handleInputChange('description_c', e.target.value)}
                placeholder="Enter task description"
                rows={3}
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority_c">Priority</Label>
                <Select
                  id="priority_c"
                  value={formData.priority_c}
                  onChange={(e) => handleInputChange('priority_c', e.target.value)}
                  disabled={loading}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </div>

              <div>
                <Label htmlFor="status_c">Status</Label>
                <Select
                  id="status_c"
                  value={formData.status_c}
                  onChange={(e) => handleInputChange('status_c', e.target.value)}
                  disabled={loading}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="due_date_c">Due Date *</Label>
                <Input
                  id="due_date_c"
                  type="date"
                  value={formData.due_date_c}
                  onChange={(e) => handleInputChange('due_date_c', e.target.value)}
                  error={errors.due_date_c}
                  disabled={loading}
                />
              </div>

              <div>
<Label htmlFor="assigned_to_c">Assigned To *</Label>
                <Input
                  id="assigned_to_c"
                  value={formData.assigned_to_c}
                  onChange={(e) => handleInputChange('assigned_to_c', e.target.value)}
                  placeholder="Enter assignee name"
                  error={errors.assigned_to_c}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
              >
                {task ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TaskForm;