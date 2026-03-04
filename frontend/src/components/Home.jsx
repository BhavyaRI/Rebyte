import React, { useState, useEffect, useRef } from "react";
import LinkCard from "./home/LinkCard";
import QuickStats from "./home/QuickStats";
import LinkList from "./home/LinkList";
import QuickShortenForm from "./home/QuickShortenForm";
import SideBar from "./layout/Sidebar";
import { QRCodeSVG } from "qrcode.react";

export default function Home() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  // State for the dashboard
  const [myLinks, setMyLinks] = useState([]);
  const [stats, setStats] = useState({ clicks: 0, count: 0 });
  const [listError, setListError] = useState(null);
  const [listLoading, setListLoading] = useState(true);
  const [qrCodeLink, setQrCodeLink] = useState(null);

  const qrModalRef = useRef(null);

  const publicBaseURL = window.location.origin;
  const shortURL = qrCodeLink
    ? `${API_BASE_URL}/${qrCodeLink.shortCode}`
    : "";

  const handleShowQr = (link) => {
    setQrCodeLink(link);
    qrModalRef.current.showModal();
  };

  const handleDownload = () => {
    const svg = qrModalRef.current.querySelector("svg");
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const canvas = document.createElement("canvas");
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qrcode.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = url;
  };

  // --- 1. fetch initial link ---
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

  // --- 2. handle new link ---
  const handleLinkAdded = (newLink) => {
    setMyLinks((prevLinks) => [newLink, ...prevLinks]);
      setStats((prevStats) => ({
        ...prevStats,
        count: prevStats.count + 1,
      }));
  };

  const handleClick = (e, shortUrl) => {
    e.preventDefault();
    window.open(shortUrl, "_blank", "noopener,noreferrer");
    setStats((prevStats) => ({
      ...prevStats,
      clicks: prevStats.clicks + 1,
    }));
  };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/deleteLink/${_id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete the link");
      }
      setMyLinks((prevLinks) => prevLinks.filter((link) => link._id !== _id));
      setStats((prevStats) => {
        const deletedLink = myLinks.find((link) => link._id === _id);
        return {
          clicks: prevStats.clicks - (deletedLink ? deletedLink.clickCount : 0),
          count: prevStats.count - 1,
        };
      });
    } catch (error) {
      return console.error("Error deleting link:", error);
    }
  };

  const handleEditLink = (linkId, newOriginalURL) => {
    setMyLinks((prevLinks) =>
      prevLinks.map((link) =>
        link._id === linkId ? { ...link, originalURL: newOriginalURL } : link
      )
    );
  };

  return (
    <>
      {/* Main cnt*/}
      <div className="flex flex-row lg:flex-row p-4 lg:p-8 gap-6 items-start">
        {/* --- COLUMN 1: FORM & STATS --- */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          {/* --- CREATE LINK CARD--- */}
          <QuickShortenForm
            API_BASE_URL={API_BASE_URL}
            onLinkAdded={handleLinkAdded}
          />
          {/* --- QUICK STATS CARD--- */}
          <QuickStats stats={stats} />
        </div>

        {/* --- COLUMN 2: MY LINKS TABLE--- */}
        <LinkList
          myLinks={myLinks}
          API_BASE_URL={API_BASE_URL}
          handleDelete={handleDelete}
          onShowQr={handleShowQr}
          handleClick={handleClick}
          onEditLink={handleEditLink}
        />
      </div>
      <dialog id="qr_modal" className="modal" ref={qrModalRef}>
        <div className="modal-box flex flex-col items-center">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">QR Code</h3>

          {/* QR code*/}
          {qrCodeLink && (
            <>
              <div className="border p-4 rounded-lg bg-white">
                <QRCodeSVG
                  value={shortURL}
                  size={256}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"M"}
                  includeMargin={true}
                />
              </div>
              <p
                className="mt-4 text-sm text-gray-600"
                style={{ maxWidth: "256px", wordBreak: "break-all" }}
              >
                {shortURL}
              </p>
              <button onClick={handleDownload} className="btn btn-neutral mt-3">
                Download QR
              </button>
            </>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}