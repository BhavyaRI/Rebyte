import axios from "axios";
import React, { useState } from "react";

export default function Home() {
    const [link, setLink] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [surl, setSurl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(false);
        setError(null);
        setSurl("");
        try {
            const inputLink = { link };
            const token = localStorage.getItem('jwtToken');
            const response = await fetch('https://psychic-system-xxxp69rwj7j399gq-3000.app.github.dev/api/shorten',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ originalURL: `${inputLink}` })
                });

            const data = await response.json();
            console.log("Successful submit", inputLink);
            setSubmitted(true);
            setLoading(true);
            setSurl(data.shortUrl);
        } catch (err) {
            console.error("Error:", err?.response?.data || err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen">
                <div className="drawer drawer-open">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div className="flex flex-row p-4 lg:p-8">
                            <div className="flex flex-col mr-10">
                                <div className="card shadow-2xl bg-base-100 max-w-2xl mb-4 mx-auto">
                                    <div className="card-body">
                                        <h2 className="card-title">Enter the URL</h2>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="form-control">
                                                <label className="label mb-2" htmlFor="input-url">
                                                    <span className="label-text w-full block text-base">URL</span>
                                                </label>
                                                <div className="join w-full">
                                                    <input
                                                        type="text"
                                                        id="input-url"
                                                        className="input input-bordered input-neutral join-item w-full"
                                                        value={link}
                                                        onChange={(e) => setLink(e.target.value)}
                                                        required
                                                    />
                                                    <button type="submit" className="btn btn-neutral join-item">
                                                        {loading ? "..." : "Go"}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        {surl && (
                                            <div className="mt-6 p-4 bg-base-200 rounded-lg text-center space-y-2">
                                                <p className="text-sm font-semibold">Your shortened URL is ready:</p>
                                                <div className="join w-full">
                                                    <a
                                                        href={surl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="input input-bordered join-item w-full text-accent flex items-center justify-center hover:underline"
                                                    >
                                                        {surl}
                                                    </a>
                                                    <button className="btn btn-secondary join-item">Copy</button>
                                                </div>
                                            </div>
                                        )}

                                        {error && (
                                            <p className="text-sm text-error mt-4">
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md">
                                    <div className="mb-6">
                                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Quick Links</h1>
                                        <p className="text-sm text-gray-500">Get a quick overview of your links</p>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 font-medium">Total Clicks</span>
                                            <span className="text-2xl font-semibold text-gray-700">9</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700 font-medium">Total Links</span>
                                            <span className="text-lg font-semibold text-indigo-600">10</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="border-2 w-xl border-solid">
                                <p>Hello</p>

                            </div>
                        </div>
                    </div>
                    <div className="drawer-side is-drawer-close:overflow-visible">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
                            {/* Sidebar content here */}
                            <ul className="menu w-full grow">

                                {/* list item */}
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4 my-1.5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                        <span className="is-drawer-close:hidden">Homepage</span>
                                    </button>
                                </li>

                                {/* list item */}
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-4 my-1.5"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                        <span className="is-drawer-close:hidden">Settings</span>
                                    </button>
                                </li>
                            </ul>

                            {/* button to open/close drawer */}
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