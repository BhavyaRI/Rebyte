import React from "react";
import { useState } from "react";
import LinkCard from "./LinkCard";

export default function LinkList({ myLinks, loading, API_BASE_URL,handleDelete ,onShowQr,handleClick,onEditLink}) {
  return (
    <div className="flex-1 min-h-[100px] bg-white rounded-xl p-8 border border-gray-300 min-w-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Links</h2>
      {myLinks.length === 0 && !loading ? (
        <p className="text-gray-500">You haven't created any links yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {myLinks.map((link) => (
            <LinkCard key={link._id} link={link} API_BASE_URL={API_BASE_URL} handleDelete={handleDelete} onShowQr={onShowQr} handleClick={handleClick} onEditLink={onEditLink} />
          ))}
        </div>
      )}
    </div>
  );
}