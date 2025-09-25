import tasksData from "../mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(400);
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay(400);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...tasks[index],
      ...taskData,
      Id: parseInt(id)
    };
    
    if (taskData.status === "Completed" && !tasks[index].completedAt) {
      updatedTask.completedAt = new Date().toISOString();
    } else if (taskData.status !== "Completed") {
      updatedTask.completedAt = null;
    }
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const deletedTask = { ...tasks[index] };
    tasks.splice(index, 1);
    return deletedTask;
  },

  async toggleComplete(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const task = tasks[index];
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    const completedAt = newStatus === "Completed" ? new Date().toISOString() : null;
    
    const updatedTask = {
      ...task,
      status: newStatus,
      completedAt
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async getOverdue() {
    await delay(200);
    const now = new Date();
    return tasks.filter(task => 
      task.status !== "Completed" && 
      new Date(task.dueDate) < now
    );
  },

  async getUpcoming(days = 7) {
    await delay(200);
    const now = new Date();
    const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return tasks.filter(task => 
      task.status !== "Completed" && 
      new Date(task.dueDate) >= now &&
      new Date(task.dueDate) <= futureDate
    );
  }
};