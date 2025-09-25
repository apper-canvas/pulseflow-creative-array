import React, { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";
import { toast } from "react-toastify";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadTasks = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
      console.error("Task loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleEditTask = (task) => {
    // For this demo, we'll just show a toast
    toast.info("Task editing feature would be implemented here");
  };

  const handleDeleteTask = async (task) => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        await taskService.delete(task.Id);
        setTasks(prev => prev.filter(t => t.Id !== task.Id));
        toast.success("Task deleted successfully");
      } catch (err) {
        toast.error("Failed to delete task");
        console.error("Delete error:", err);
      }
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await taskService.toggleComplete(task.Id);
      setTasks(prev => prev.map(t => t.Id === task.Id ? updatedTask : t));
      toast.success(
        updatedTask.status === "Completed" 
          ? "Task marked as completed" 
          : "Task marked as pending"
      );
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Update error:", err);
    }
  };

  const handleAddTask = () => {
    toast.info("Add task feature would be implemented here");
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className="space-y-6">
      <Header
        title="Tasks"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAddTask}
        addLabel="Add Task"
      />

      {filteredTasks.length === 0 ? (
        <Empty
          title="No tasks found"
          message={searchTerm ? "Try adjusting your search criteria." : "Tasks will appear here as you create them from contacts and deals."}
          actionLabel="Add Task"
          onAction={handleAddTask}
          icon="CheckSquare"
        />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
};

export default Tasks;