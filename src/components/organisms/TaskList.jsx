import React from "react";
import Card from "@/components/atoms/Card";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
const isTaskOverdue = (task) => {
    return task.status !== "Completed" && new Date(task.dueDate) < new Date();
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Task</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Assigned To</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr 
                key={task.Id} 
                className={`hover:bg-gray-50 transition-colors ${
                  isTaskOverdue(task) ? "bg-error-50" : ""
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => onToggleComplete(task)}
                      className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center ${
                        task.status === "Completed"
                          ? "bg-success-500 border-success-500"
                          : "border-gray-300 hover:border-primary-500"
                      }`}
                    >
                      {task.status === "Completed" && (
                        <ApperIcon name="Check" className="w-3 h-3 text-white" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        task.status === "Completed" ? "line-through text-gray-500" : "text-gray-900"
                      }`}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <StatusIndicator status={task.priority} type="priority" />
                </td>
                <td className="py-4 px-4">
                  <StatusIndicator status={task.status} type="task" />
                </td>
                <td className="py-4 px-4">
                  <div className={`text-sm ${
                    isTaskOverdue(task) ? "text-error-600 font-medium" : "text-gray-600"
                  }`}>
                    {format(new Date(task.dueDate), "MMM d, yyyy")}
                    {isTaskOverdue(task) && (
                      <div className="flex items-center mt-1">
                        <ApperIcon name="AlertTriangle" className="w-3 h-3 mr-1" />
                        Overdue
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">{task.assignedTo}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(task)}
                    >
                      <ApperIcon name="Edit" className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(task)}
                      className="text-error-600 hover:text-error-700 hover:bg-error-50"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TaskList;