import dealsData from "../mockData/deals.json";
import contactsData from "../mockData/contacts.json";
import companiesData from "../mockData/companies.json";
import { salesRepService } from "./salesRepService.js";

let deals = [...dealsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const enrichDealWithRelatedData = async (deal) => {
  const contact = contactsData.find(c => c.Id === deal.contactId);
  const company = companiesData.find(c => c.Id === deal.companyId);
  
// Sales rep lookup handled in frontend for better performance
  
  return {
    ...deal,
    contactName: contact ? `${contact.firstName} ${contact.lastName}` : null,
    companyName: company ? company.name : null,
};
};

export const dealService = {
  async getAll() {
    await delay(300);
    return deals.map(enrichDealWithRelatedData);
  },

  async getById(id) {
    await delay(200);
    const deal = deals.find(d => d.Id === parseInt(id));
    if (!deal) {
      throw new Error("Deal not found");
    }
    return enrichDealWithRelatedData(deal);
  },

async create(dealData) {
    await delay(400);
    const newDeal = {
      Id: Math.max(...deals.map(d => d.Id), 0) + 1,
      ...dealData,
      salesRepId: dealData.salesRepId ? parseInt(dealData.salesRepId) : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    deals.push(newDeal);
    return await enrichDealWithRelatedData(newDeal);
  },

async update(id, dealData) {
    await delay(400);
    const index = deals.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Deal not found");
    }
    
    const updatedDeal = {
      ...deals[index],
      ...dealData,
      Id: parseInt(id),
      salesRepId: dealData.salesRepId ? parseInt(dealData.salesRepId) : null,
      updatedAt: new Date().toISOString()
    };
    
    deals[index] = updatedDeal;
    return await enrichDealWithRelatedData(updatedDeal);
  },

  async delete(id) {
    await delay(300);
    const index = deals.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Deal not found");
    }
    
    const deletedDeal = { ...deals[index] };
    deals.splice(index, 1);
    return deletedDeal;
  },

  async getByStage(stage) {
    await delay(200);
    return deals
      .filter(deal => deal.stage === stage)
      .map(enrichDealWithRelatedData);
  }
};