export const dealService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
const response = await apperClient.fetchRecords('deal_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "sales_rep_id_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "company_id_c"}}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}]
      });
      
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching deals:", error?.response?.data?.message || error);
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
      
const response = await apperClient.getRecordById('deal_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "sales_rep_id_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "company_id_c"}}
        ]
      });
      
      return response?.data || null;
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(dealData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
const params = {
        records: [{
          Name: dealData.title_c || dealData.title,
          title_c: dealData.title_c || dealData.title,
          value_c: dealData.value_c || parseFloat(dealData.value),
          stage_c: dealData.stage_c || dealData.stage || "Lead",
          probability_c: dealData.probability_c || parseInt(dealData.probability),
          sales_rep_id_c: dealData.sales_rep_id_c ? parseInt(dealData.sales_rep_id_c) : null,
          created_at_c: new Date().toISOString(),
          updated_at_c: new Date().toISOString(),
          notes_c: dealData.notes_c || dealData.notes,
          contact_id_c: dealData.contact_id_c || (dealData.contactId ? parseInt(dealData.contactId) : null),
          company_id_c: dealData.company_id_c || (dealData.companyId ? parseInt(dealData.companyId) : null)
        }]
      };
      
      const response = await apperClient.createRecord('deal_c', params);
      
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
      
      throw new Error("Failed to create deal");
    } catch (error) {
      console.error("Error creating deal:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, dealData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const updateData = {
        Id: parseInt(id),
        updated_at_c: new Date().toISOString()
      };
      
      if (dealData.title_c || dealData.title) {
        updateData.title_c = dealData.title_c || dealData.title;
        updateData.Name = dealData.title_c || dealData.title;
      }
      if (dealData.value_c || dealData.value) updateData.value_c = dealData.value_c || parseFloat(dealData.value);
      if (dealData.stage_c || dealData.stage) updateData.stage_c = dealData.stage_c || dealData.stage;
if (dealData.probability_c || dealData.probability) updateData.probability_c = dealData.probability_c || parseInt(dealData.probability);
      if (dealData.sales_rep_id_c) updateData.sales_rep_id_c = parseInt(dealData.sales_rep_id_c);
      if (dealData.notes_c || dealData.notes) updateData.notes_c = dealData.notes_c || dealData.notes;
      if (dealData.contact_id_c || dealData.contactId) updateData.contact_id_c = dealData.contact_id_c || parseInt(dealData.contactId);
      if (dealData.company_id_c || dealData.companyId) updateData.company_id_c = dealData.company_id_c || parseInt(dealData.companyId);
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('deal_c', params);
      
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
      
      throw new Error("Failed to update deal");
    } catch (error) {
      console.error("Error updating deal:", error?.response?.data?.message || error);
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
      
      const response = await apperClient.deleteRecord('deal_c', {
        RecordIds: [parseInt(id)]
      });
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.success;
    } catch (error) {
      console.error("Error deleting deal:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async getByStage(stage) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('deal_c', {
fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "sales_rep_id_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "company_id_c"}}
        ],
        where: [
          {"FieldName": "stage_c", "Operator": "EqualTo", "Values": [stage]}
        ]
      });
      
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching deals by stage:", error);
      return [];
    }
}
};