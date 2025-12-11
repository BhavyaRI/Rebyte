import React, { useState } from "react";

const DataTable = ({ data }) => {
  console.log("DataTable rendering with data:", data);
  
  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No data to display.
      </div>
    );
  }

  return (
    <div className="w-full block mt-6">
      {/* Data Rows */}
      <div className="space-y-0">
        {data.map((item, index) => {
          // Get first letter for avatar
          const firstLetter = (item._id || "U").charAt(0).toUpperCase();
          
          return (
            <div
              key={index}
              className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors rounded-lg px-2"
            >
              {/* Left side: Avatar + Name + Count */}
              <div className="flex items-center gap-4">
                {/* Avatar Circle */}
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-700 font-medium text-sm">
                    {firstLetter}
                  </span>
                </div>
                
                {/* Name and Clicks */}
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium text-base">
                    {item._id || "Unknown"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {item.count} {item.count === 1 ? 'click' : 'clicks'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AnalyticsTableCard = ({ title, data1, data2, data3 }) => {
  const [activeTab, setActiveTab] = useState(0);
  let tabs = [];
  let subtitle = "";

  if (title === "Geography") {
    subtitle = "Top countries and cities";
    tabs = [
      { label: "Countries", data: data1 },
      { label: "Cities", data: data2 },
    ];
  } else if (title === "Technology") {
    subtitle = "Top devices, OS, and browsers";
    tabs = [
      { label: "Browser", data: data1 },
      { label: "Os", data: data2 },
      { label: "Device", data: data3 },
    ];
  }

  const validTabs = tabs.filter((tab) => tab.data !== undefined);

  return (
    <div className="w-full bg-white shadow-sm rounded-xl border border-gray-100">
      <div className="p-6">
        {/* Card Header */}
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>

        {/* Custom Tabs (matching the design) */}
        <div className="flex gap-6 mt-6 border-b border-gray-200">
          {validTabs.map((tab, index) => (
            <button
              key={index}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === index
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
              {/* Active indicator line */}
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="block w-full pb-2">
          <DataTable data={validTabs[activeTab]?.data} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTableCard;