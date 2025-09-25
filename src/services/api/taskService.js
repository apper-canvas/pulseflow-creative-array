export const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('task_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "assigned_to_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "deal_id_c"}}
        ],
        orderBy: [{"fieldName": "due_date_c", "sorttype": "ASC"}]
      });
      
      if (!response?.data?.length) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.getRecordById('task_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "assigned_to_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "deal_id_c"}}
        ]
      });
      
      return response?.data || null;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: taskData.title_c || taskData.title,
          title_c: taskData.title_c || taskData.title,
          description_c: taskData.description_c || taskData.description,
          priority_c: taskData.priority_c || taskData.priority,
          status_c: taskData.status_c || taskData.status || "Pending",
          due_date_c: taskData.due_date_c || taskData.dueDate,
          assigned_to_c: taskData.assigned_to_c || taskData.assignedTo,
          created_at_c: new Date().toISOString(),
          completed_at_c: null,
          contact_id_c: taskData.contact_id_c ? parseInt(taskData.contact_id_c) : null,
          deal_id_c: taskData.deal_id_c ? parseInt(taskData.deal_id_c) : null
        }]
      };
      
      const response = await apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        if (successful.length > 0) {
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to create task");
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const updateData = {
        Id: parseInt(id)
      };
      
      if (taskData.title_c || taskData.title) updateData.title_c = taskData.title_c || taskData.title;
      if (taskData.title_c || taskData.title) updateData.Name = taskData.title_c || taskData.title;
      if (taskData.description_c || taskData.description) updateData.description_c = taskData.description_c || taskData.description;
      if (taskData.priority_c || taskData.priority) updateData.priority_c = taskData.priority_c || taskData.priority;
      if (taskData.status_c || taskData.status) updateData.status_c = taskData.status_c || taskData.status;
      if (taskData.due_date_c || taskData.dueDate) updateData.due_date_c = taskData.due_date_c || taskData.dueDate;
      if (taskData.assigned_to_c || taskData.assignedTo) updateData.assigned_to_c = taskData.assigned_to_c || taskData.assignedTo;
      if (taskData.contact_id_c) updateData.contact_id_c = parseInt(taskData.contact_id_c);
      if (taskData.deal_id_c) updateData.deal_id_c = parseInt(taskData.deal_id_c);
      
      if ((taskData.status_c === "Completed" || taskData.status === "Completed")) {
        updateData.completed_at_c = new Date().toISOString();
      } else if (taskData.status_c !== "Completed" && taskData.status !== "Completed") {
        updateData.completed_at_c = null;
      }
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        if (successful.length > 0) {
          return successful[0].data;
        }
      }
      
      throw new Error("Failed to update task");
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.deleteRecord('task_c', {
        RecordIds: [parseInt(id)]
      });
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.success;
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async toggleComplete(id) {
    try {
      const task = await this.getById(id);
      if (!task) throw new Error("Task not found");
      
      const newStatus = task.status_c === "Completed" ? "Pending" : "Completed";
      const updateData = {
        status_c: newStatus
      };
      
      if (newStatus === "Completed") {
        updateData.completed_at_c = new Date().toISOString();
      } else {
        updateData.completed_at_c = null;
      }
      
      return await this.update(id, updateData);
    } catch (error) {
      console.error("Error toggling task completion:", error);
      throw error;
    }
  },

  async getOverdue() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const now = new Date().toISOString();
      
      const response = await apperClient.fetchRecords('task_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "assigned_to_c"}}
        ],
        where: [
          {"FieldName": "status_c", "Operator": "NotEqualTo", "Values": ["Completed"]},
          {"FieldName": "due_date_c", "Operator": "LessThan", "Values": [now]}
        ]
      });
      
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching overdue tasks:", error);
      return [];
    }
  },

  async getUpcoming(days = 7) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const now = new Date().toISOString();
      const futureDate = new Date(Date.now() + (days * 24 * 60 * 60 * 1000)).toISOString();
      
      const response = await apperClient.fetchRecords('task_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "assigned_to_c"}}
        ],
        where: [
          {"FieldName": "status_c", "Operator": "NotEqualTo", "Values": ["Completed"]},
          {"FieldName": "due_date_c", "Operator": "GreaterThanOrEqualTo", "Values": [now]},
          {"FieldName": "due_date_c", "Operator": "LessThanOrEqualTo", "Values": [futureDate]}
        ]
      });
      
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching upcoming tasks:", error);
      return [];
    }
  }
};