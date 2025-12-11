import React from "react";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-normal text-gray-600">{title}</h2>
        <Icon className="w-5 h-5 text-gray-900" />
      </div>
      
      <p className="text-5xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatCard;