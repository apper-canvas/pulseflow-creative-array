import React from "react";
import Badge from "@/components/atoms/Badge";

const StatusIndicator = ({ status, type = "default" }) => {
  const getStatusConfig = (status, type) => {
    const configs = {
      contact: {
        "Lead": { variant: "primary", label: "Lead" },
        "Qualified": { variant: "warning", label: "Qualified" },
        "Customer": { variant: "success", label: "Customer" },
        "Inactive": { variant: "default", label: "Inactive" }
      },
      deal: {
        "Lead": { variant: "default", label: "Lead" },
        "Qualified": { variant: "primary", label: "Qualified" },
        "Proposal": { variant: "warning", label: "Proposal" },
        "Negotiation": { variant: "warning", label: "Negotiation" },
        "Closed Won": { variant: "success", label: "Closed Won" },
        "Closed Lost": { variant: "error", label: "Closed Lost" }
      },
      task: {
        "Pending": { variant: "warning", label: "Pending" },
        "In Progress": { variant: "primary", label: "In Progress" },
        "Completed": { variant: "success", label: "Completed" },
        "Cancelled": { variant: "error", label: "Cancelled" }
      },
      priority: {
        "Low": { variant: "default", label: "Low" },
        "Medium": { variant: "warning", label: "Medium" },
        "High": { variant: "error", label: "High" }
      }
    };

    return configs[type]?.[status] || { variant: "default", label: status };
  };

  const config = getStatusConfig(status, type);

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};

export default StatusIndicator;