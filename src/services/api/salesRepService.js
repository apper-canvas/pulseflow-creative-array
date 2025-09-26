import mockSalesReps from '@/services/mockData/salesReps.json';

// Helper function for realistic delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const salesRepService = {
  async getAll() {
    try {
      await delay(200);
      return [...mockSalesReps];
    } catch (error) {
      console.error("Error fetching sales reps:", error);
      throw new Error("Failed to fetch sales representatives");
    }
  },

  async getById(id) {
    try {
      await delay(150);
      const salesRep = mockSalesReps.find(rep => rep.Id === parseInt(id));
      if (!salesRep) {
        throw new Error(`Sales representative with ID ${id} not found`);
      }
      return { ...salesRep };
    } catch (error) {
      console.error(`Error fetching sales rep ${id}:`, error);
      throw error;
    }
  },

  async create(salesRepData) {
    try {
      await delay(300);
      const newSalesRep = {
        Id: Math.max(...mockSalesReps.map(rep => rep.Id)) + 1,
        name: salesRepData.name,
        email: salesRepData.email,
        phone: salesRepData.phone || "",
        territory: salesRepData.territory || "",
        hireDate: new Date().toISOString().split('T')[0],
        quota: salesRepData.quota || 0,
        yearlySales: 0,
        active: true
      };
      
      mockSalesReps.push(newSalesRep);
      return { ...newSalesRep };
    } catch (error) {
      console.error("Error creating sales rep:", error);
      throw new Error("Failed to create sales representative");
    }
  },

  async update(id, salesRepData) {
    try {
      await delay(250);
      const index = mockSalesReps.findIndex(rep => rep.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Sales representative with ID ${id} not found`);
      }
      
      const updatedSalesRep = {
        ...mockSalesReps[index],
        ...salesRepData,
        Id: parseInt(id)
      };
      
      mockSalesReps[index] = updatedSalesRep;
      return { ...updatedSalesRep };
    } catch (error) {
      console.error(`Error updating sales rep ${id}:`, error);
      throw error;
    }
  },

  async delete(id) {
    try {
      await delay(200);
      const index = mockSalesReps.findIndex(rep => rep.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Sales representative with ID ${id} not found`);
      }
      
      mockSalesReps.splice(index, 1);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting sales rep ${id}:`, error);
      throw error;
    }
  },

  async getActiveReps() {
    try {
      await delay(150);
      return mockSalesReps.filter(rep => rep.active);
    } catch (error) {
      console.error("Error fetching active sales reps:", error);
      throw new Error("Failed to fetch active sales representatives");
    }
  }
};