import React, { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
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
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
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
    setEditingTask(task);
    setShowTaskForm(true);
  };

const handleDeleteTask = async (task) => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        setError("");
        await taskService.delete(task.Id);
        setTasks(prev => prev.filter(t => t.Id !== task.Id));
        toast.success("Task deleted successfully");
      } catch (err) {
        const errorMessage = err.message || "Failed to delete task";
        setError(errorMessage);
        toast.error(errorMessage);
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
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      setSubmitting(true);
      setError("");
      
      let updatedTask;
      if (editingTask) {
        // Update existing task
        updatedTask = await taskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(t => t.Id === editingTask.Id ? updatedTask : t));
        toast.success("Task updated successfully");
      } else {
        // Create new task
        updatedTask = await taskService.create(taskData);
        setTasks(prev => [...prev, updatedTask]);
        toast.success("Task created successfully");
      }
      
      handleCloseTaskForm();
    } catch (err) {
      const errorMessage = err.message || `Failed to ${editingTask ? 'update' : 'create'} task`;
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Task submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    setSubmitting(false);
  };

const filteredTasks = tasks.filter(task =>
    (task.title_c || task.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description_c || task.description || '').toLowerCase().includes(searchTerm.toLowerCase())
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

      {error && <Error message={error} />}

      {loading ? (
        <Loading />
      ) : filteredTasks.length === 0 ? (
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

      <TaskForm
        isOpen={showTaskForm}
        onClose={handleCloseTaskForm}
        task={editingTask}
        onSubmit={handleTaskSubmit}
        loading={submitting}
      />
    </div>
  );
};

export default Tasks;