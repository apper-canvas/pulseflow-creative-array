import companiesData from "../mockData/companies.json";

let companies = [...companiesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const companyService = {
  async getAll() {
    await delay(300);
    return [...companies];
  },

  async getById(id) {
    await delay(200);
    const company = companies.find(c => c.Id === parseInt(id));
    if (!company) {
      throw new Error("Company not found");
    }
    return { ...company };
  },

  async create(companyData) {
    await delay(400);
    const newCompany = {
      Id: Math.max(...companies.map(c => c.Id), 0) + 1,
      ...companyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    companies.push(newCompany);
    return { ...newCompany };
  },

  async update(id, companyData) {
    await delay(400);
    const index = companies.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Company not found");
    }
    
    const updatedCompany = {
      ...companies[index],
      ...companyData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    companies[index] = updatedCompany;
    return { ...updatedCompany };
  },

  async delete(id) {
    await delay(300);
    const index = companies.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Company not found");
    }
    
    const deletedCompany = { ...companies[index] };
    companies.splice(index, 1);
    return deletedCompany;
  }
};