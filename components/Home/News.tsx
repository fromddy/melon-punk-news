'use client'

import React from "react";

type NewsItem = {
    id: number;
    title: string;
    summary: string;
    url: string;
    date: string; // ISO string, precise to minutes
};

// Sample news data (date precise to minutes)
const newsData: NewsItem[] = [
    {
        id: 1,
        title: "Monad Airdrop",
        summary: "Monad airdrop results finally revealed",
        url: "https://claim.monad.xyz",
        date: "2025-10-30T21:30:00",
    },
    {
        id: 2,
        title: "🚀 BOOM! ",
        summary: "Stablecoin transaction volume on Ethereum hit a colossal $2.82 TRILLION in October! 🤯",
        url: "https://x.com/BMNRBullz/status/1985273657279627454",
        date: "2025-11-05T21:30:00",
    },
];

export function News() {
    // Sort by full time (newest first)
    const sortedNews = newsData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="flex flex-col space-y-6">
            {sortedNews.map((news) => (
                <a
                    key={news.id}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-6 rounded-lg bg-yellow-50 border-2 border-yellow-200 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] hover:border-yellow-400 transition-all duration-200 cursor-pointer block"
                    style={{
                        fontFamily: "'Times New Roman', serif",
                    }}
                >
                    {/* Old newspaper paper texture background */}
                    <div className="absolute inset-0 bg-[url('/paper-texture.png')] bg-repeat opacity-10 rounded-lg pointer-events-none"></div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-snug border-b border-gray-400 pb-1">
                        {news.title}
                    </h2>
                    <p className="text-gray-800 mb-3 text-justify">{news.summary}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 hover:text-gray-900 font-semibold underline">
                            Read more
                        </span>
                        {/* Display full date to minutes */}
                        <span className="text-gray-600 text-sm italic">
                            {new Date(news.date).toLocaleString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                </a>
            ))}
        </div>
    );
}