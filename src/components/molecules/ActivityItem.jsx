import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    const icons = {
      "Call": "Phone",
      "Email": "Mail",
      "Meeting": "Calendar",
      "Note": "FileText",
      "Task": "CheckSquare"
    };
    return icons[type] || "Activity";
  };

  const getActivityColor = (type) => {
    const colors = {
      "Call": "text-blue-500 bg-blue-100",
      "Email": "text-green-500 bg-green-100",
      "Meeting": "text-purple-500 bg-purple-100",
      "Note": "text-yellow-500 bg-yellow-100",
      "Task": "text-gray-500 bg-gray-100"
    };
    return colors[type] || "text-gray-500 bg-gray-100";
  };

  return (
    <div
    className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
    <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type_c || activity.type)}`}>
        <ApperIcon
            name={getActivityIcon(activity.type_c || activity.type)}
            className="w-4 h-4" />
    </div>
    <div className="flex-1">
        <div className="flex items-center">
            <p className="font-medium text-gray-900 text-sm">
                {activity.subject_c || activity.subject}
            </p>
            <span className="text-sm text-gray-500 ml-2">
                {format(new Date(activity.created_at_c || activity.createdAt), "MMM d, h:mm a")}
            </span>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {activity.description_c || activity.description}
        </p>
        <p className="text-xs text-gray-500 mt-1">by {activity.assigned_to_c || activity.assignedTo}
        </p></div>
</div>
  );
};

export default ActivityItem;