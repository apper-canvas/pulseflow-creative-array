import React, { useEffect, useState } from "react";
import { contactService } from "@/services/api/contactService";
import { dealService } from "@/services/api/dealService";
import { taskService } from "@/services/api/taskService";
import { activityService } from "@/services/api/activityService";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import MetricCard from "@/components/molecules/MetricCard";
import ActivityItem from "@/components/molecules/ActivityItem";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Tasks from "@/components/pages/Tasks";

const Dashboard = () => {
  const [data, setData] = useState({
    contacts: [],
    deals: [],
    tasks: [],
    activities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setError("");
      setLoading(true);

      const [contacts, deals, tasks, activities] = await Promise.all([
        contactService.getAll(),
        dealService.getAll(),
        taskService.getAll(),
        activityService.getRecent(8)
      ]);

      setData({
        contacts,
        deals,
        tasks,
        activities
      });
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Dashboard loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) return <Loading type="dashboard" />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const metrics = {
totalContacts: data.contacts.length,
    activeDeals: data.deals.filter(d => !["Closed Won", "Closed Lost"].includes(d.stage_c || d.stage)).length,
    pipelineValue: data.deals
      .filter(d => !["Closed Won", "Closed Lost"].includes(d.stage_c || d.stage))
      .reduce((sum, d) => sum + (d.value_c || d.value || 0), 0),
    pendingTasks: data.tasks.filter(t => (t.status_c || t.status) === "Pending").length
  };

  // Get upcoming tasks (next 7 days)
  const upcomingTasks = data.tasks
    .filter(task => {
      if ((task.status_c || task.status) === "Completed") return false;
      const dueDate = new Date(task.due_date_c || task.dueDate);
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return dueDate >= now && dueDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your sales pipeline.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Contacts"
          value={metrics.totalContacts}
          icon="Users"
          change="+12%"
          changeType="positive"
        />
        <MetricCard
          title="Active Deals"
          value={metrics.activeDeals}
          icon="Target"
          change="+8%"
          changeType="positive"
        />
        <MetricCard
          title="Pipeline Value"
          value={formatCurrency(metrics.pipelineValue)}
          icon="DollarSign"
          change="+23%"
          changeType="positive"
        />
        <MetricCard
          title="Pending Tasks"
          value={metrics.pendingTasks}
          icon="CheckSquare"
          change="-5%"
          changeType="negative"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <Button variant="ghost" size="sm">
              <ApperIcon name="ExternalLink" className="w-4 h-4 ml-1" />
              View All
            </Button>
          </div>
          
          {data.activities.length === 0 ? (
            <Empty
              title="No activities yet"
              message="Activities will appear here as you interact with contacts and deals."
              icon="Activity"
            />
          ) : (
            <div className="space-y-1">
              {data.activities.map((activity) => (
                <ActivityItem key={activity.Id} activity={activity} />
              ))}
            </div>
          )}
        </Card>

        {/* Upcoming Tasks */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
            <Button variant="ghost" size="sm">
              <ApperIcon name="ExternalLink" className="w-4 h-4 ml-1" />
              View All
            </Button>
          </div>
          
          {upcomingTasks.length === 0 ? (
            <Empty
              title="No upcoming tasks"
              message="You're all caught up! New tasks will appear here."
              icon="CheckSquare"
            />
          ) : (
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
<div key={task.Id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    (task.priority_c || task.priority) === "High" ? "bg-error-500" :
                    (task.priority_c || task.priority) === "Medium" ? "bg-warning-500" : "bg-gray-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {task.title_c || task.title}
                    </p>
<p className="text-xs text-gray-500 mt-1">
                      Due: {format(new Date(task.due_date_c || task.dueDate), "MMM d, yyyy")}
                      <span className="mx-2">•</span>
                      {task.assigned_to_c || task.assignedTo || 'Unassigned'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Pipeline Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Pipeline Overview</h2>
          <Button variant="ghost" size="sm">
            <ApperIcon name="ExternalLink" className="w-4 h-4 ml-1" />
            View Pipeline
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"].map((stage) => {
const stageDeals = data.deals.filter(d => (d.stage_c || d.stage) === stage);
            const stageValue = stageDeals.reduce((sum, d) => sum + (d.value_c || d.value || 0), 0);
            
            return (
              <div key={stage} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{stageDeals.length}</p>
                <p className="text-sm font-medium text-gray-600 mb-1">{stage}</p>
                <p className="text-xs text-gray-500">{formatCurrency(stageValue)}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;