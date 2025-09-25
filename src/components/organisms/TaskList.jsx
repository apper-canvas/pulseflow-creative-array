import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import StatusIndicator from "@/components/molecules/StatusIndicator";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const isTaskOverdue = (task) => {
    const dueDate = task.due_date_c || task.dueDate;
    const status = task.status_c || task.status;
    return status !== "Completed" && dueDate && new Date(dueDate) < new Date();
};

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No tasks found
            </div>
        );
    }

    return (
        <Card className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left py-4 px-4 font-medium text-gray-700 w-8"></th>
                            <th className="text-left py-4 px-4 font-medium text-gray-700">Task</th>
                            <th className="text-left py-4 px-4 font-medium text-gray-700">Priority</th>
                            <th className="text-left py-4 px-4 font-medium text-gray-700">Status</th>
                            <th className="text-left py-4 px-4 font-medium text-gray-700">Due Date</th>
                            <th className="text-left py-4 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr
                                key={task.Id} 
                                className={`hover:bg-gray-50 transition-colors ${
                                  isTaskOverdue(task) ? "bg-error-50" : ""
                                }`}
                            >
                                <td className="py-4 px-4">
                                    <button
                                        onClick={() => onToggleComplete(task)}
                                        className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center ${
                                            (task.status_c || task.status) === "Completed"
                                                ? "bg-success-500 border-success-500"
                                                : "border-gray-300 hover:border-primary-500"
                                        }`}
                                    >
                                        {(task.status_c || task.status) === "Completed" && (
                                            <ApperIcon name="Check" className="w-3 h-3 text-white" />
                                        )}
                                    </button>
                                </td>
                                <td className="py-4 px-4">
                                    <div>
                                        <p className={`font-medium ${
                                            (task.status_c || task.status) === "Completed" ? "line-through text-gray-500" : "text-gray-900"
                                        }`}>
                                            {task.title_c || task.title}
                                        </p>
                                        {(task.description_c || task.description) && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {task.description_c || task.description}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                  <StatusIndicator status={task.priority_c || task.priority} type="priority" />
                                </td>
                                <td className="py-4 px-4">
                                  <StatusIndicator status={task.status_c || task.status} type="task" />
                                </td>
                                <td className={`py-4 px-4 text-sm ${
                                    isTaskOverdue(task) ? "text-error-600 font-medium" : "text-gray-600"
                                  }`}>
                                  <div className="flex items-center">
                                    <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
                                    {(task.due_date_c || task.dueDate) ? 
                                      format(new Date(task.due_date_c || task.dueDate), "MMM d, yyyy") :
                                      'No due date'
                                    }
                                    {isTaskOverdue(task) && (
                                      <ApperIcon name="AlertTriangle" className="w-4 h-4 ml-2 text-error-600" />
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center space-x-2">
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