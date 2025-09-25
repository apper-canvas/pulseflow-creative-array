// Mock data extracted from existing deals for consistency
const salesRepsData = [
  { Id: 1, name: "Michael Johnson", email: "mjohnson@company.com", active: true },
  { Id: 2, name: "Sarah Williams", email: "swilliams@company.com", active: true },
  { Id: 3, name: "David Brown", email: "dbrown@company.com", active: true },
  { Id: 4, name: "Emily Davis", email: "edavis@company.com", active: true },
  { Id: 5, name: "Robert Wilson", email: "rwilson@company.com", active: true },
  { Id: 6, name: "Jennifer Garcia", email: "jgarcia@company.com", active: true }
];

let salesReps = [...salesRepsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const salesRepService = {
  async getAll() {
    await delay(300);
    return salesReps.filter(rep => rep.active);
  },

  async getById(id) {
    await delay(200);
    const salesRep = salesReps.find(rep => rep.Id === parseInt(id));
    if (!salesRep) {
      throw new Error("Sales representative not found");
    }
    return salesRep;
  },

  async getByName(name) {
    await delay(200);
    return salesReps.find(rep => rep.name === name);
  }
};