import React, { useState, useEffect } from "react";

function LinkCard({ link, API_BASE_URL }) {
    const [copied, setCopied] = useState(false);
    const shortUrl = `${API_BASE_URL}/${link.shortCode}`;

    const handleCopy = () => {
        // Use document.execCommand for reliability in iframes
        const textArea = document.createElement("textarea");
        textArea.value = shortUrl;
        
        // Make it invisible and non-disruptive
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        
        textArea.select();
        
        try {
            document.execCommand('copy');
            setCopied(true);
            // Reset the "copied" state after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    };

    return (
        <div className="bg-white border-gray-300 text-black border p-4 rounded-lg flex flex-row w-full"> {/* Use rounded-lg for consistency */}
            <div className="flex-1 overflow-hidden"> {/* Added overflow-hidden */}
                <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-gray-800">Short URL:</p>
                    {/* Make the short URL a clickable link */}
                    <a 
                        href={shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        )}
                    </button>
                </div>
                <p className="text-sm truncate" title={link.originalURL}>
                    <span className="font-semibold text-gray-600">Original URL:</span>{" "}
                    <span className="text-gray-500">{link.originalURL}</span>
                </p>
            </div>
            {/* Kebab Menu Dropdown */}
            <div className="dropdown dropdown-end">
                <button tabIndex={0} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-gray-500">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                    </svg>
                </button>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    {/* Note: Edit/Delete functionality is not implemented, but the UI is here */}
                    <li>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit
                        </a>
                    </li>
                    {/* I've re-wired this to use the same handleCopy function */}
                    <li onClick={handleCopy}>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </a>
                    </li>
                    <li>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share
                        </a>
                    </li>
                    <div className="divider my-0"></div>
                    <li>
                        <a className="text-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default function Home() {
    // State for the form
    const [link, setLink] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [surl, setSurl] = useState(""); 

    // State for the dashboard
    const [myLinks, setMyLinks] = useState([]); // Holds the array of all user's links
    const [stats, setStats] = useState({ clicks: 0, count: 0 });

    const API_BASE_URL = "http://localhost:3000";

    // --- 1. FETCH INITIAL LINKS ON PAGE LOAD ---
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) throw new Error('No token found');

                const response = await fetch(`${API_BASE_URL}/api/links`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch links');
                }
                
                const data = await response.json();
                setMyLinks(data);
                const totalClicks = data.reduce((acc, link) => acc + link.clickCount, 0);
                setStats({ clicks: totalClicks, count: data.length });

            } catch (err) {
                console.error("Error fetching links:", err);
                setError("Could not load your links.");
            }
        };

        fetchLinks();
    }, []); 

    // --- 2. HANDLE NEW LINK CREATION ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSurl("");
        setLoading(true);

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) throw new Error('No token found');

            const response = await fetch(`${API_BASE_URL}/api/shorten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ originalURL: link })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to create link');
            }

            // --- 3. UPDATE STATE ---
            // We get the newLinkObject back from the API
            const newLinkObject = await response.json();
            // Add the new link to the TOP of our state array
            setMyLinks(prevLinks => [newLinkObject, ...prevLinks]);
            // Update stats
            setStats(prevStats => ({
                ...prevStats, 
                count: prevStats.count + 1 
            }));

            // Set the short URL for display
            setSurl(`${API_BASE_URL}/${newLinkObject.shortCode}`);
            setLink(""); // Clear the input field

        } catch (err) {
            console.error("Error:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Main container with white background */}
            <div className="min-h-screen bg-white"> 
                <div className="drawer drawer-open">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Flex container for the two main columns */}
                        <div className="flex flex-row lg:flex-row p-4 lg:p-8 gap-6">
                            
                            {/* --- COLUMN 1: FORM & STATS --- */}
                            <div className="flex flex-col gap-6 lg:w-1/3">
                                {/* --- CREATE LINK CARD (Adjusted classes) --- */}
                                <div className="bg-white rounded-xl p-8 border border-gray-200"> {/* Added shadow-md, border */}
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Shorten</h2> {/* Adjusted title */}
                                    <p className="text-sm text-gray-500 mb-6">Shorten a link quickly without any settings</p> {/* Added description */}
                                    
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="form-control">
                                            {/* Input field */}
                                            <input
                                                type="text"
                                                id="input-url"
                                                className="input input-bordered input-neutral w-full" // Removed join-item
                                                placeholder="Paste a link to shorten" // Added placeholder
                                                value={link}
                                                onChange={(e) => setLink(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {/* Shorten button */}
                                        <button type="submit" className="btn bg-black text-white w-full" disabled={loading}> {/* Changed to black button */}
                                            {loading ? "Shortening..." : "Shorten"}
                                        </button>
                                    </form>

                                    {surl && (
                                        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center space-y-2 border border-gray-200"> {/* Light gray background, border */}
                                            <p className="text-sm font-semibold">Your shortened URL is ready:</p>
                                            <div className="join w-full">
                                                <input 
                                                    type="text"
                                                    readOnly
                                                    value={surl}
                                                    className="input input-bordered join-item w-full text-blue-600" // text-blue-600 for short link
                                                />
                                                <button 
                                                    className="btn btn-secondary join-item"
                                                    onClick={() => navigator.clipboard.writeText(surl)}
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {error && (
                                        <p className="text-sm text-red-500 mt-4"> {/* Changed error color */}
                                            {error}
                                        </p>
                                    )}
                                </div>
                                
                                {/* --- QUICK STATS CARD (Adjusted classes) --- */}
                                <div className="bg-white rounded-xl p-8 border border-gray-200"> {/* Added shadow-md, border */}
                                    <div className="mb-6">
                                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Quick Stats</h1> {/* Changed title to Quick Stats */}
                                        <p className="text-sm text-gray-500">Overview of your links</p>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 font-medium">Total Clicks</span>
                                            <span className="text-2xl font-semibold text-gray-700">{stats.clicks}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 font-medium">Total Links</span>
                                            <span className="text-lg font-semibold text-blue-600">{stats.count}</span> {/* text-blue-600 for consistency */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- COLUMN 2: MY LINKS TABLE (Adjusted classes) --- */}
                            <div className="flex-1 bg-white rounded-xl p-8 border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Links</h2>
                                {myLinks.length === 0 && !loading ? (
                                    <p className="text-gray-500">You haven't created any links yet.</p>
                                ) : (
                                    // Replaced the table with a flex column of LinkCards
                                    <div className="flex flex-col gap-4">
                                        {myLinks.map((link) => (
                                            <LinkCard 
                                                key={link._id} 
                                                link={link} 
                                                API_BASE_URL={API_BASE_URL} 
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* --- SIDEBAR (Adjusted classes) --- */}
                    <div className="drawer-side is-drawer-close:overflow-visible">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        {/* Changed bg-base-200 to bg-white for sidebar background */}
                        <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-white border-r border-gray-200 flex flex-col items-start min-h-full"> {/* Added border-r */}
                            <ul className="menu w-full grow">
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4 my-1.5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                        <span className="is-drawer-close:hidden">Homepage</span>
                                    </button>
                                </li>
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4 my-1.5"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                        <span className="is-drawer-close:hidden">Settings</span>
                                    </button>
                                </li>
                            </ul>
                            <div className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Open">
                                <label htmlFor="my-drawer-4" className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4 my-1.5"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}