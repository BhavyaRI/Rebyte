import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LinkCard({ link, API_BASE_URL, handleDelete, onShowQr, handleClick }) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const publicBaseURL = window.location.origin;
  const shortUrl = `${publicBaseURL}/r/${link.shortCode}`;

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = shortUrl;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);

    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }

    document.body.removeChild(textArea);
  };

  const handleAnalytics = () => {
    const clickAnalyticsUrl = `/analytics/${link._id}`;
    
  }

  
  return (
    <div className="bg-white border-gray-300 text-black border p-4 rounded-lg flex flex-row w-full">
      {" "}
      <div className="flex-1 overflow-hidden min-w-0">
        {" "}
        <div className="flex items-center gap-2 mb-2">
          <p className="font-semibold text-gray-800">Short URL:</p>
          <a
            href="#"
            onClick={(e) => handleClick(e, shortUrl)}
            className="text-blue-600 hover:underline truncate"
            title={shortUrl}
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="btn btn-ghost btn-xs btn-square"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="text-sm flex" title={link.originalURL}>
          <span className="font-semibold text-gray-600 mr-1 ">
            Original URL:
          </span>
          <span className="text-gray-500 truncate min-w-0 max-w-md">
            {link.originalURL}
          </span>
        </p>
      </div>
      {/*Menu Dropdown */}
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-500"
          >
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
        >
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit
            </a>
          </li>
          <li onClick={handleCopy}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </a>
          </li>
          <li onClick={() => navigate(`/analytics/${link._id}`, { state: { link } })}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chart-no-axes-column-icon lucide-chart-no-axes-column"
              >
                <path d="M5 21v-6" />
                <path d="M12 21V3" />
                <path d="M19 21V9" />
              </svg>
              Analysis
            </a>
          </li>
          <li onClick={() => onShowQr(link)}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-qr-code-icon lucide-qr-code"
              >
                <rect width="5" height="5" x="3" y="3" rx="1" />
                <rect width="5" height="5" x="16" y="3" rx="1" />
                <rect width="5" height="5" x="3" y="16" rx="1" />
                <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                <path d="M21 21v.01" />
                <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                <path d="M3 12h.01" />
                <path d="M12 3h.01" />
                <path d="M12 16v.01" />
                <path d="M16 12h1" />
                <path d="M21 12v.01" />
                <path d="M12 21v-1" />
              </svg>
              QR code
            </a>
          </li>
          <div className="divider my-0"></div>
          <li onClick={() => handleDelete(link._id)}>
            <a className="text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LinkCard;
