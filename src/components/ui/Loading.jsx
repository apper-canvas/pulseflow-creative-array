import React from "react";

const Loading = ({ type = "dashboard" }) => {
  if (type === "table") {
    return (
      <div className="animate-pulse space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-16 h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-3 bg-gray-200 rounded"></div>
              <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="w-12 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded mb-2"></div>
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-card">
        <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="w-3/4 h-4 bg-gray-200 rounded mb-1"></div>
                <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;