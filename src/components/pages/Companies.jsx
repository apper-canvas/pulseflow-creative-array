import React, { useEffect, useState } from "react";
import { companyService } from "@/services/api/companyService";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

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
(company.name_c || company.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.industry_c || company.industry || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <Error message={error} onRetry={loadCompanies} />;
  }

  return (
    <div className="space-y-6">
      <Header 
        title="Companies"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {/* Add company functionality */}}
        addLabel="Add Company"
      />

      {loading ? (
        <Loading />
      ) : filteredCompanies.length === 0 ? (
        <Empty 
          title="No companies found"
          description="Start by adding your first company or adjust your search criteria."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.Id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Building" className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{company.name_c || company.name}</h3>
                <p className="text-sm text-gray-600">{company.industry_c || company.industry}</p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <ApperIcon name="Users" className="w-4 h-4 mr-2" />
                  {company.size_c || company.size} employees
                </div>
                
                {(company.website_c || company.website) && (
                  <div className="flex items-center">
                    <ApperIcon name="Globe" className="w-4 h-4 mr-2" />
                    <a 
                      href={company.website_c || company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 truncate"
                    >
                      {company.website_c || company.website}
                    </a>
                  </div>
                )}
                
                {(company.phone_c || company.phone) && (
                  <div className="flex items-center">
                    <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
                    {company.phone_c || company.phone}
                  </div>
                )}
                
                {(company.address_c || company.address) && (
                  <div className="flex items-center">
                    <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                    <span className="truncate">{company.address_c || company.address}</span>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-3">
                  Added {format(new Date(company.created_at_c || company.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            </Card>
          ))}
</div>
      )}
    </div>
  );
};

export default Companies;