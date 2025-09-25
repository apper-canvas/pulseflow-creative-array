import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon,
  trend
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <ApperIcon name={icon} className="w-5 h-5 text-primary-600" />
        </div>
        {change && (
          <div className={`flex items-center text-sm ${
            changeType === "positive" ? "text-success-600" : 
            changeType === "negative" ? "text-error-600" : "text-gray-600"
          }`}>
            <ApperIcon 
              name={changeType === "positive" ? "TrendingUp" : changeType === "negative" ? "TrendingDown" : "Minus"} 
              className="w-3 h-3 mr-1" 
            />
            {change}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </Card>
  );
};

export default MetricCard;