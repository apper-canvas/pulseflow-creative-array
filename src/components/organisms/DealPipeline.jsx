import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const DealPipeline = ({ deals, onDealClick, onStageChange }) => {
  const stages = [
    { id: "Lead", name: "Lead", color: "bg-gray-100" },
    { id: "Qualified", name: "Qualified", color: "bg-blue-100" },
    { id: "Proposal", name: "Proposal", color: "bg-yellow-100" },
    { id: "Negotiation", name: "Negotiation", color: "bg-orange-100" },
    { id: "Closed Won", name: "Closed Won", color: "bg-green-100" },
    { id: "Closed Lost", name: "Closed Lost", color: "bg-red-100" }
  ];

  const getDealsByStage = (stage) => {
    return deals.filter(deal => deal.stage === stage);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stages.map((stage) => {
        const stageDeals = getDealsByStage(stage.id);
        const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
        
        return (
          <div key={stage.id} className="flex flex-col">
            <div className={`${stage.color} rounded-t-lg p-4 border-b`}>
              <h3 className="font-semibold text-gray-900">{stage.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">{stageDeals.length} deals</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(stageValue)}
                </span>
              </div>
            </div>
            
            <div className="space-y-3 p-4 min-h-[400px] bg-gray-50 rounded-b-lg">
              {stageDeals.map((deal) => (
                <Card 
                  key={deal.Id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
                  onClick={() => onDealClick(deal)}
                >
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 truncate">
                        {deal.title}
                      </h4>
                      <p className="text-sm text-gray-600">{deal.companyName}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatCurrency(deal.value)}
                      </span>
                      <Badge variant="default">{deal.probability}%</Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                      {format(new Date(deal.expectedCloseDate), "MMM d")}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{deal.assignedTo}</span>
                      <div className="flex items-center text-xs text-gray-500">
                        <ApperIcon name="Clock" className="w-3 h-3 mr-1" />
                        {format(new Date(deal.updatedAt), "MMM d")}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DealPipeline;