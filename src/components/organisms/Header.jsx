import React from "react";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ 
  title, 
  searchValue, 
  onSearchChange, 
  onAddClick,
  addLabel = "Add New",
  showAdd = true,
  showSearch = true
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        {showSearch && (
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            placeholder={`Search ${title.toLowerCase()}...`}
            className="w-full sm:w-64"
          />
        )}
        {showAdd && onAddClick && (
          <Button onClick={onAddClick}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {addLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;