import React, { useEffect, useState } from "react";
import { contactService } from "@/services/api/contactService";
import { dealService } from "@/services/api/dealService";
import { taskService } from "@/services/api/taskService";
import { endOfMonth, format, startOfMonth, subDays } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import MetricCard from "@/components/molecules/MetricCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Card from "@/components/atoms/Card";

const Reports = () => {
  const [data, setData] = useState({
    contacts: [],
    deals: [],
    tasks: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReportsData = async () => {
    try {
      setError("");
      setLoading(true);

      const [contacts, deals, tasks] = await Promise.all([
        contactService.getAll(),
        dealService.getAll(),
        taskService.getAll()
      ]);

      setData({
        contacts,
        deals,
        tasks
      });
    } catch (err) {
      setError("Failed to load reports data");
      console.error("Reports loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReportsData();
  }, []);

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadReportsData} />;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate metrics
  const totalRevenue = data.deals
.filter(d => (d.stage_c || d.stage) === "Closed Won")
    .reduce((sum, d) => sum + (d.value_c || d.value || 0), 0);

  const pipelineValue = data.deals
    .filter(d => !["Closed Won", "Closed Lost"].includes(d.stage_c || d.stage))
    .reduce((sum, d) => sum + (d.value_c || d.value || 0), 0);

  const winRate = data.deals.length > 0 
    ? ((data.deals.filter(d => (d.stage_c || d.stage) === "Closed Won").length / data.deals.length) * 100).toFixed(1)
    : 0;

  const avgDealSize = data.deals.filter(d => (d.stage_c || d.stage) === "Closed Won").length > 0
    ? totalRevenue / data.deals.filter(d => (d.stage_c || d.stage) === "Closed Won").length
    : 0;

  // Pipeline breakdown by stage
  const stageBreakdown = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"]
    .map(stage => {
      const stageDeals = data.deals.filter(d => (d.stage_c || d.stage) === stage);
      return {
        stage,
        count: stageDeals.length,
        value: stageDeals.reduce((sum, d) => sum + (d.value_c || d.value || 0), 0)
      };
    });

  // Contact status breakdown
const contactBreakdown = ["Lead", "Qualified", "Customer", "Inactive"]
    .map(status => ({
      status,
      count: data.contacts.filter(c => (c.status_c || c.status) === status).length
    }));

// Task completion metrics
  const totalTasks = data.tasks.length;
  const completedTasks = data.tasks.filter(t => (t.status_c || t.status) === "Completed").length;
  const taskCompletionRate = data.tasks.length > 0 
    ? ((completedTasks / totalTasks) * 100).toFixed(1)
    : 0;

  // Define conversion rate (win rate is the same metric)
  const conversionRate = winRate;
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Track your sales performance and team productivity.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon="DollarSign"
          change="+18%"
          changeType="positive"
        />
        <MetricCard
          title="Pipeline Value"
          value={formatCurrency(pipelineValue)}
          icon="TrendingUp"
          change="+12%"
          changeType="positive"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon="Target"
          change="+2.3%"
          changeType="positive"
        />
        <MetricCard
          title="Avg Deal Size"
          value={formatCurrency(avgDealSize)}
          icon="BarChart3"
          change="+8%"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pipeline Breakdown */}
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <ApperIcon name="Target" className="w-5 h-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Pipeline Breakdown</h2>
          </div>
          
          <div className="space-y-4">
            {stageBreakdown.map((item) => (
              <div key={item.stage} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.stage}</p>
                  <p className="text-sm text-gray-600">{item.count} deals</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(item.value)}</p>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ 
                        width: `${pipelineValue > 0 ? (item.value / pipelineValue) * 100 : 0}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Distribution */}
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <ApperIcon name="Users" className="w-5 h-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Contact Distribution</h2>
          </div>
<div className="space-y-4">
            {contactBreakdown.map((item) => (
              <div key={item.status} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
item.status === "Customer" ? "bg-success-500" :
                    item.status === "Qualified" ? "bg-primary-500" :
                    item.status === "Lead" ? "bg-warning-500" : "bg-gray-400"
}`} />
                  <div className="flex-1 ml-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{item.status}</span>
                      <span className="text-sm text-gray-600">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          item.status === "Customer" ? "bg-success-500" :
                          item.status === "Qualified" ? "bg-primary-500" :
                          item.status === "Lead" ? "bg-warning-500" : "bg-gray-400"
                        }`}
                        style={{ 
                          width: `${data.contacts.length > 0 ? (item.count / data.contacts.length) * 100 : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <ApperIcon name="Activity" className="w-5 h-5 text-primary-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Activity Summary</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
            <p className="text-3xl font-bold text-primary-700 mb-2">{data.contacts.length}</p>
            <p className="text-primary-600 font-medium">Total Contacts</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-success-50 to-success-100 rounded-lg">
            <p className="text-3xl font-bold text-success-700 mb-2">{data.deals.length}</p>
            <p className="text-success-600 font-medium">Total Deals</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-warning-50 to-warning-100 rounded-lg">
            <p className="text-3xl font-bold text-warning-700 mb-2">{taskCompletionRate}%</p>
            <p className="text-warning-600 font-medium">Task Completion</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reports;