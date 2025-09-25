import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";

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
return deals.filter(deal => (deal.stage_c || deal.stage) === stage);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto">
      {stages.map((stage) => {
        const stageDeals = getDealsByStage(stage);
        const stageCount = stageDeals.length;
        const stageValue = stageDeals.reduce((sum, deal) => sum + (deal.value_c || deal.value || 0), 0);
        
        return (
          <div key={stage} className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{stage}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{stageCount}</Badge>
                <span className="text-sm text-gray-600 font-medium">
                  {formatCurrency(stageValue)}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              {stageDeals.map((deal) => (
                <Card 
                  onClick={() => onDealClick?.(deal)}
                  key={deal.Id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
                >
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        {deal.title_c || deal.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {deal.company_id_c?.Name || deal.companyName || 'No Company'}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary-600">
                        {formatCurrency(deal.value_c || deal.value)}
                      </span>
                      <Badge variant="default">{deal.probability_c || deal.probability}%</Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                      {deal.expectedCloseDate ? format(new Date(deal.expectedCloseDate), "MMM d") : 'No date'}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {deal.sales_rep_id_c ? `Rep ID: ${deal.sales_rep_id_c}` : 'Unassigned'}
                      </span>
                      <div className="flex items-center text-gray-600">
                        <ApperIcon name="Clock" className="w-3 h-3 mr-1" />
                        {deal.updated_at_c ? format(new Date(deal.updated_at_c), "MMM d") : 'N/A'}
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