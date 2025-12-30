import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MousePointerClick, Globe, Smartphone, Calendar, ChevronDown } from "lucide-react";
import StatCard from "../components/analyticsPage/StatCard";
import ClicksChart from "../components/analyticsPage/ClicksChart";
import AnalyticsTableCard from "../components/analyticsPage/AnalyticsTableCard";

function normalizeChart(startDate, endDate, clickData) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dataMap = new Map(clickData.map((item) => [item._id, item.count]));
  const filled = [];
  const current = new Date(start);

  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    filled.push({
      _id: dateStr,
      count: dataMap.get(dateStr) || 0,
    });
    current.setDate(current.getDate() + 1);
  }
  return filled;
}

const LinkAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState("7d");
  
  const durationOptions = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" }
  ];
  
  const { linkId } = useParams();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const endDate = new Date();
      let startDate = new Date();
      startDate.setDate(endDate.getDate() - parseInt(duration));

      const endDateStr = endDate.toISOString().split("T")[0];
      const startDateStr = startDate.toISOString().split("T")[0];

      try {
        const token = localStorage.getItem("jwtToken");

        const response = await axios.get(
          `/api/analytics/${linkId}?startDate=${startDateStr}&endDate=${endDateStr}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const normalizedClicks = normalizeChart(
          startDateStr,
          endDateStr,
          response.data.clicksOverTime
        );

        setData({
          ...response.data,
          clicksOverTime: normalizedClicks,
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [duration, linkId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-error bg-gray-50 p-8">
        Could not load analytics data. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dropdown for duration */}
      <div className="flex justify-end mx-6 pt-6 pb-4">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-sm bg-white border-gray-200 hover:bg-gray-50 gap-2">
            <Calendar className="w-4 h-4" />
            {durationOptions.find(d => d.value === duration)?.label}
            <ChevronDown className="w-4 h-4" />
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52 mt-2 border border-gray-200">
            {durationOptions.map((option) => (
              <li key={option.value}>
                <a
                  onClick={() => setDuration(option.value)}
                  className={duration === option.value ? "active bg-gray-100" : ""}
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* stats card*/}
      <div className="flex flex-row gap-4 mx-6 mb-6">
        <div className="flex-1">
          <StatCard 
            title="Total Clicks" 
            value={data.totalClicks} 
            icon={MousePointerClick}
          />
        </div>
        
        <div className="flex-1">
          <StatCard 
            title="Top Country" 
            value={data.topCountry} 
            icon={Globe}
          />
        </div>

        <div className="flex-1">
          <StatCard 
            title="Top Device" 
            value={data.topDevice} 
            icon={Smartphone}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="mx-6 mb-6">
        <ClicksChart data={data.clicksOverTime} />
      </div>

      {/* Analytics card */}
      <div className="flex flex-row gap-4 mx-6 pb-8">
        <div className="flex-1">
          <AnalyticsTableCard
            title="Geography"
            data1={data.countries}
            data2={data.cities}
          />
        </div>
        <div className="flex-1">
          <AnalyticsTableCard
            title="Technology"
            data1={data.browsers}
            data2={data.os}
            data3={data.device}
          />
        </div>
      </div>
    </div>
  );
};

export default LinkAnalytics;