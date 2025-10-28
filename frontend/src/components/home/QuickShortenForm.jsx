import React from "react";
import { useState } from "react";

export default function QuickShortenForm({ API_BASE_URL, onLinkAdded }) {
  // All form-related state lives HERE
  const [link, setLink] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [surl, setSurl] = useState("");

  // The form's handleSubmit logic lives HERE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSurl("");
    setLoading(true);

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${API_BASE_URL}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ originalURL: link }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create link");
      }

      const newLinkObject = await response.json();

      // --- 3. COMMUNICATE UP TO PARENT ---
      // Call the prop function passed from Home.jsx
      onLinkAdded(newLinkObject);

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
    // This is the JSX from your "CREATE LINK CARD" (lines 274-329)
    <div className="bg-white rounded-xl p-8 border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Shorten</h2>
      <p className="text-sm text-gray-500 mb-6">
        Shorten a link quickly without any settings
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <input
            type="text"
            id="input-url"
            className="input input-bordered input-neutral w-full"
            placeholder="Paste a link to shorten"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn bg-black text-white w-full"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>
      {surl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center space-y-2 border border-gray-300">
          <p className="text-sm font-semibold">Your shortened URL is ready:</p>
          <div className="join w-full">
            <input
              type="text"
              readOnly
              value={surl}
              className="input input-bordered join-item w-full text-blue-600"
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
      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
    </div>
  );
}
