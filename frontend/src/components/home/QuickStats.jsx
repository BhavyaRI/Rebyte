import React from "react";
import { useState } from "react";

export default function QuickStats({ stats }) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-300">
      {" "}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Quick Stats</h1>{" "}
        <p className="text-sm text-gray-500">Overview of your links</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Total Clicks</span>
          <span className="text-2xl font-semibold text-gray-700">
            {stats.clicks}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Total Links</span>
          <span className="text-lg font-semibold text-blue-600">
            {stats.count}
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
