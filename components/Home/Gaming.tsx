'use client'

import React from 'react'

type GamingHighlight = {
    id: number
    title: string
    blurb: string
    platform: string
    link: string
    scheduledAt: string
}

export function GamingContent() {
    return (
        <section className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <div
                className="relative px-6 py-10 rounded-2xl border-4 border-yellow-200 bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 shadow-[0_10px_40px_rgba(255,199,0,0.35)]"
                style={{ fontFamily: 'var(--font-comic-neue), "Comic Neue", cursive' }}
            >
                <div className="absolute inset-0 bg-[url('/paper-texture.png')] bg-repeat opacity-10 rounded-2xl pointer-events-none"></div>

                <h2 className="relative z-10 text-4xl font-extrabold text-gray-900 tracking-[0.25em] uppercase mb-4">
                    Coming Soon
                </h2>
                <p className="relative z-10 text-lg text-gray-800 max-w-sm">
                    Legendary onchain gaming drops are loading... stay tuned for the next raid.
                </p>
            </div>
        </section>
    )
}

