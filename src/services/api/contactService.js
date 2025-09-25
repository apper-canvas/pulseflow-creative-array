export const contactService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('contact_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "position_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "source_c"}},
          {"field": {"Name": "assigned_to_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      });
      
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching contacts:", error?.response?.data?.message || error);
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
      
      const response = await apperClient.getRecordById('contact_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "position_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "source_c"}},
          {"field": {"Name": "assigned_to_c"}},
          {"field": {"Name": "notes_c"}}
        ]
      });
      
      return response?.data || null;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(contactData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const fullName = `${contactData.first_name_c || contactData.firstName || ''} ${contactData.last_name_c || contactData.lastName || ''}`.trim();
      
      const params = {
        records: [{
          Name: fullName,
          first_name_c: contactData.first_name_c || contactData.firstName,
          last_name_c: contactData.last_name_c || contactData.lastName,
          email_c: contactData.email_c || contactData.email,
          phone_c: contactData.phone_c || contactData.phone,
          company_c: contactData.company_c || contactData.company,
          position_c: contactData.position_c || contactData.position,
          status_c: contactData.status_c || contactData.status || "Lead",
          source_c: contactData.source_c || contactData.source,
          assigned_to_c: contactData.assigned_to_c || contactData.assignedTo,
          notes_c: contactData.notes_c || contactData.notes
        }]
      };
      
      const response = await apperClient.createRecord('contact_c', params);
      
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
      
      throw new Error("Failed to create contact");
    } catch (error) {
      console.error("Error creating contact:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, contactData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const updateData = {
        Id: parseInt(id)
      };
      
      if (contactData.first_name_c || contactData.firstName) updateData.first_name_c = contactData.first_name_c || contactData.firstName;
      if (contactData.last_name_c || contactData.lastName) updateData.last_name_c = contactData.last_name_c || contactData.lastName;
      if (contactData.email_c || contactData.email) updateData.email_c = contactData.email_c || contactData.email;
      if (contactData.phone_c || contactData.phone) updateData.phone_c = contactData.phone_c || contactData.phone;
      if (contactData.company_c || contactData.company) updateData.company_c = contactData.company_c || contactData.company;
      if (contactData.position_c || contactData.position) updateData.position_c = contactData.position_c || contactData.position;
      if (contactData.status_c || contactData.status) updateData.status_c = contactData.status_c || contactData.status;
      if (contactData.source_c || contactData.source) updateData.source_c = contactData.source_c || contactData.source;
      if (contactData.assigned_to_c || contactData.assignedTo) updateData.assigned_to_c = contactData.assigned_to_c || contactData.assignedTo;
      if (contactData.notes_c || contactData.notes) updateData.notes_c = contactData.notes_c || contactData.notes;
      
      const fullName = `${updateData.first_name_c || ''} ${updateData.last_name_c || ''}`.trim();
      if (fullName) updateData.Name = fullName;
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('contact_c', params);
      
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
      
      throw new Error("Failed to update contact");
    } catch (error) {
      console.error("Error updating contact:", error?.response?.data?.message || error);
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
      
      const response = await apperClient.deleteRecord('contact_c', {
        RecordIds: [parseInt(id)]
      });
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.success;
    } catch (error) {
      console.error("Error deleting contact:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('contact_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "company_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "first_name_c", "operator": "Contains", "values": [query]}
              ],
              "operator": ""
            },
            {
              "conditions": [
                {"fieldName": "last_name_c", "operator": "Contains", "values": [query]}
              ],
              "operator": ""
            },
            {
              "conditions": [
                {"fieldName": "email_c", "operator": "Contains", "values": [query]}
              ],
              "operator": ""
            },
            {
              "conditions": [
                {"fieldName": "company_c", "operator": "Contains", "values": [query]}
              ],
              "operator": ""
            }
          ]
        }]
      });
      
      return response?.data || [];
    } catch (error) {
      console.error("Error searching contacts:", error);
      return [];
    }
  }
};