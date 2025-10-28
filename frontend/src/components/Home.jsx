import React, { useState, useEffect } from "react";
import LinkCard from "./Home/LinkCard";
import QuickStats from "./Home/QuickStats";
import LinkList from "./Home/LinkList";
import QuickShortenForm from "./Home/QuickShortenForm";
import SideBar from "./layout/SideBar";

export default function Home() {
  // State for the form

  // State for the dashboard
  const [myLinks, setMyLinks] = useState([]); // Holds the array of all user's links
  const [stats, setStats] = useState({ clicks: 0, count: 0 });
  const [listError, setListError] = useState(null);
  const [listLoading, setListLoading] = useState(true);

  const API_BASE_URL = "http://localhost:3000";

  // --- 1. FETCH INITIAL LINKS ON PAGE LOAD ---
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("No token found");

        const response = await fetch(`${API_BASE_URL}/api/links`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch links");
        }

        const data = await response.json();
        setMyLinks(data);
        const totalClicks = data.reduce(
          (acc, link) => acc + link.clickCount,
          0
        );
        setStats({ clicks: totalClicks, count: data.length });
      } catch (err) {
        console.error("Error fetching links:", err);
        setError("Could not load your links.");
      }
    };

    fetchLinks();
  }, []);

  // --- 2. HANDLE NEW LINK CREATION ---
  const handleLinkAdded = (newLink) => {
    setMyLinks((prevLinks) => [newLink, ...prevLinks]);
    setStats((prevStats) => ({
      ...prevStats,
      count: prevStats.count + 1,
    }));
  };

  return (
    <>
      {/* Main container with white background */}
      <div className="min-h-screen bg-white">
        <div className="drawer drawer-open">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Flex container for the two main columns */}
            <div className="flex flex-row lg:flex-row p-4 lg:p-8 gap-6 items-start">
              {/* --- COLUMN 1: FORM & STATS --- */}
              <div className="flex flex-col gap-6 lg:w-1/3">
                {/* --- CREATE LINK CARD (Adjusted classes) --- */}
                <QuickShortenForm API_BASE_URL={API_BASE_URL} onLinkAdded={handleLinkAdded}/>
                {/* --- QUICK STATS CARD (Adjusted classes) --- */}
                <QuickStats stats={stats} />
              </div>

              {/* --- COLUMN 2: MY LINKS TABLE (Adjusted classes) --- */}
              {LinkList({ myLinks, API_BASE_URL })}
            </div>
          </div>
          {/* --- SIDEBAR (Adjusted classes) --- */}
          {SideBar()}
        </div>
      </div>
    </>
  );
}
