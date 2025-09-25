export const companyService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords('company_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "industry_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "website_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}}
        ],
        orderBy: [{"fieldName": "name_c", "sorttype": "ASC"}]
      });
      
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching companies:", error?.response?.data?.message || error);
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
      
      const response = await apperClient.getRecordById('company_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "industry_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "website_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "updated_at_c"}}
        ]
      });
      
      return response?.data || null;
    } catch (error) {
      console.error(`Error fetching company ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(companyData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Name: companyData.name_c || companyData.name,
          name_c: companyData.name_c || companyData.name,
          industry_c: companyData.industry_c || companyData.industry,
          size_c: companyData.size_c || companyData.size,
          website_c: companyData.website_c || companyData.website,
          address_c: companyData.address_c || companyData.address,
          phone_c: companyData.phone_c || companyData.phone,
          created_at_c: new Date().toISOString(),
          updated_at_c: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.createRecord('company_c', params);
      
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
      
      throw new Error("Failed to create company");
    } catch (error) {
      console.error("Error creating company:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, companyData) {
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
      
      if (companyData.name_c || companyData.name) {
        updateData.name_c = companyData.name_c || companyData.name;
        updateData.Name = companyData.name_c || companyData.name;
      }
      if (companyData.industry_c || companyData.industry) updateData.industry_c = companyData.industry_c || companyData.industry;
      if (companyData.size_c || companyData.size) updateData.size_c = companyData.size_c || companyData.size;
      if (companyData.website_c || companyData.website) updateData.website_c = companyData.website_c || companyData.website;
      if (companyData.address_c || companyData.address) updateData.address_c = companyData.address_c || companyData.address;
      if (companyData.phone_c || companyData.phone) updateData.phone_c = companyData.phone_c || companyData.phone;
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('company_c', params);
      
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
      
      throw new Error("Failed to update company");
    } catch (error) {
      console.error("Error updating company:", error?.response?.data?.message || error);
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
      
      const response = await apperClient.deleteRecord('company_c', {
        RecordIds: [parseInt(id)]
      });
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.success;
    } catch (error) {
      console.error("Error deleting company:", error?.response?.data?.message || error);
      throw error;
    }
  }
};