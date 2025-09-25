import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';
import Label from '@/components/atoms/Label';
import Card from '@/components/atoms/Card';
import ApperIcon from '@/components/ApperIcon';

const TaskForm = ({ isOpen, onClose, task = null, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
    assignedTo: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      // Edit mode - populate form with existing task data
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        status: task.status || 'Pending',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        assignedTo: task.assignedTo || ''
      });
    } else {
      // Create mode - reset form
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Pending',
        dueDate: '',
        assignedTo: ''
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

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned to field is required';
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
      dueDate: new Date(formData.dueDate).toISOString()
    };

    onSubmit(submitData);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '',
      assignedTo: ''
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
              onClick={handleClose}
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
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter task title"
                error={errors.title}
                disabled={loading}
              />
              {errors.title && (
                <p className="text-sm text-error-600 mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter task description"
                rows={3}
                disabled={loading}
              />
            </div>

            {/* Priority */}
            <div>
              <Label htmlFor="priority">Priority *</Label>
              <Select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                disabled={loading}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </Select>
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                disabled={loading}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
            </div>

            {/* Due Date */}
            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                error={errors.dueDate}
                disabled={loading}
              />
              {errors.dueDate && (
                <p className="text-sm text-error-600 mt-1">{errors.dueDate}</p>
              )}
            </div>

            {/* Assigned To */}
            <div>
              <Label htmlFor="assignedTo">Assigned To *</Label>
              <Input
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                placeholder="Enter assignee name"
                error={errors.assignedTo}
                disabled={loading}
              />
              {errors.assignedTo && (
                <p className="text-sm text-error-600 mt-1">{errors.assignedTo}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
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