import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Clock, MapPin, Monitor } from 'lucide-react';

// --- Helper Functions (Frontend) ---

/**
 * Formats a Date object into 'YYYY-MM-DD' for the API query
 * This is the correct, standard format to send to a backend.
 */
function toYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Gets the start and end date for a given preset.
 * @param {string} range - e.g., "7d", "30d", "90d", "all"
 * @returns {{startDate: string, endDate: string}}
 */
function getDateRange(range) {
  const endDate = new Date();
  const startDate = new Date();

  switch (range) {
    case "30d":
      startDate.setDate(endDate.getDate() - 30);
      break;
    case "90d":
      startDate.setDate(endDate.getDate() - 90);
      break;
    case "all":
      startDate.setFullYear(2000); // Use a very old date
      break;
    case "7d":
    default:
      startDate.setDate(endDate.getDate() - 7);
      break;
  }
  return {
    startDate: toYYYYMMDD(startDate),
    endDate: toYYYYMMDD(endDate),
  };
}

// --- Reusable UI Components ---

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {icon}
    </div>
    <p className="text-3xl font-bold text-gray-900 mt-2 truncate">{value}</p>
  </div>
);

const AnalyticsListCard = ({ title, data, onTabChange, activeTab, tabs }) => {
  // Use the correct keys from your backend aggregation
  const currentData = data[activeTab] || [];
  const total = currentData.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-full min-h-[300px]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="tabs tabs-boxed mb-4">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            className={`tab tab-sm sm:tab-md ${activeTab === tab.key ? 'tab-active' : ''}`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.name}
          </a>
        ))}
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <div key={item._id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700 truncate" title={item._id || 'Unknown'}>
                {item._id || 'Unknown'}
              </span>
              <div className='flex items-center space-x-2 flex-shrink-0'>
                <span className="font-medium text-gray-900">{item.count}</span>
                <span className="text-xs text-gray-400">
                  {total > 0 ? `(${(item.count / total * 100).toFixed(0)}%)` : ''}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No data for this category.</p>
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('7d');
  const { linkId } = useParams();
  
  const location = useLocation();
  // Get the full link object (passed from LinkCard's state prop)
  const link = location.state?.link; 

  const [geoTab, setGeoTab] = useState('countries');
  const [statsTab, setStatsTab] = useState('devices');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);

      // 1. Calculate dates on the frontend in YYYY-MM-DD format
      const { startDate, endDate } = getDateRange(dateRange);
      
      // 2. Build the correct URL to call your backend
      const url = `/api/analytics/${linkId}?startDate=${startDate}&endDate=${endDate}`;

      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to fetch analytics');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [linkId, dateRange]); // Refetch when linkId or dateRange changes

  return (
    // This assumes it's being rendered inside your AppLayout's <Outlet />
    <div className="bg-gray-50 p-4 lg:p-8 space-y-6"> 
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          {link && (
            <a 
              href={link.originalURL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-500 hover:text-blue-600 truncate max-w-xs sm:max-w-md"
              title={link.originalURL}
            >
              {link.originalURL}
            </a>
          )}
        </div>
        <div className="tabs tabs-boxed">
          {['7d', '30d', '90d', 'all'].map((range) => (
            <a
              key={range}
              className={`tab ${dateRange === range ? 'tab-active' : ''}`}
              onClick={() => setDateRange(range)}
            >
              {range === 'all' ? 'All time' : `Last ${range}`}
            </a>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-lg"></div>
        </div>
      )}
      
      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2.98V19a2 2 0 01-2 2H7a2 2 0 01-2-2V7c0-1.1.9-2 2-2h11.02a1 1 0 01.77.37l3 3.02z" /></svg>
            <span>Error: {error}</span>
          </div>
        </div>
      )}
      
      {data && !loading && !error && (
        <>
          {/* --- ROW 1: Quick Stats --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              title="Total Clicks" 
              value={data.totalClicks} 
              icon={<Clock size={20} className="text-gray-400" />} 
            />
            <StatCard 
              title="Top Country" 
              value={data.topCountry} 
              icon={<MapPin size={20} className="text-gray-400" />} 
            />
            <StatCard 
              title="Top Device" 
              value={data.topDevice} 
              icon={<Monitor size={20} className="text-gray-400" />} 
            />
          </div>

          {/* --- ROW 2: Graph --- */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Clicks over Time</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={data.clicksOverTime} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  {/* The XAxis label is your 'DD-MM-YYYY' string, now correctly sorted */}
                  <XAxis dataKey="_id" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#1d4ed8" 
                    strokeWidth={2} 
                    dot={false} 
                    name="Clicks"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* --- ROW 3: Detailed Lists --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsListCard
              title="Geographics"
              tabs={[
                { name: 'Countries', key: 'countries' },
                { name: 'Cities', key: 'cities' }
              ]}
              activeTab={geoTab}
              onTabChange={setGeoTab}
              data={{ countries: data.countries, cities: data.cities }}
            />
            <AnalyticsListCard
              title="Technology"
              tabs={[
                { name: 'Devices', key: 'devices' },
                { name: 'OS', key: 'os' },
                { name: 'Browsers', key: 'browsers' }
              ]}
              activeTab={statsTab}
              onTabChange={setStatsTab}
              // Use the correct keys from your backend 'result' object
              data={{ devices: data.devices, os: data.os, browsers: data.browsers }}
            />
          </div>
        </>
      )}
    </div>
  );
}

