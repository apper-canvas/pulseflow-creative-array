import React, { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { companyService } from "@/services/api/companyService";
import { format } from "date-fns";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadCompanies = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (err) {
      setError("Failed to load companies");
      console.error("Company loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadCompanies} />;

  return (
    <div className="space-y-6">
      <Header
        title="Companies"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        showAdd={false}
      />

      {filteredCompanies.length === 0 ? (
        <Empty
          title="No companies found"
          message={searchTerm ? "Try adjusting your search criteria." : "Companies will appear here as you add contacts and deals."}
          icon="Building"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.Id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Building" className="w-6 h-6 text-primary-600" />
                </div>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="ExternalLink" className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-600">{company.industry}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <ApperIcon name="Users" className="w-4 h-4 mr-2" />
                    {company.size} employees
                  </div>
                  
                  {company.website && (
                    <div className="flex items-center text-sm text-gray-600">
                      <ApperIcon name="Globe" className="w-4 h-4 mr-2" />
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                  
                  {company.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                      {company.phone}
                    </div>
                  )}
                  
                  {company.address && (
                    <div className="flex items-center text-sm text-gray-600">
                      <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                      <span className="line-clamp-2">{company.address}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Added {format(new Date(company.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies;