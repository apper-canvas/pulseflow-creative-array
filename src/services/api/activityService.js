import activitiesData from "../mockData/activities.json";

let activities = [...activitiesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const activityService = {
  async getAll() {
    await delay(300);
    return [...activities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getById(id) {
    await delay(200);
    const activity = activities.find(a => a.Id === parseInt(id));
    if (!activity) {
      throw new Error("Activity not found");
    }
    return { ...activity };
  },

  async getByContactId(contactId) {
    await delay(200);
    return activities
      .filter(activity => activity.contactId === parseInt(contactId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getByDealId(dealId) {
    await delay(200);
    return activities
      .filter(activity => activity.dealId === parseInt(dealId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async create(activityData) {
    await delay(400);
    const newActivity = {
      Id: Math.max(...activities.map(a => a.Id), 0) + 1,
      ...activityData,
      createdAt: new Date().toISOString(),
      completedAt: activityData.type !== "Task" ? new Date().toISOString() : null
    };
    activities.push(newActivity);
    return { ...newActivity };
  },

  async getRecent(limit = 5) {
    await delay(200);
    return [...activities]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }
};