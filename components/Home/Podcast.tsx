'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

// --- Type Definitions and Data remain the same ---
type PodcastEpisode = {
    id: number
    title: string
    description: string
    youtubeId: string
    publishedAt: string
    guestName: string
    guestBio: string
    highlights: string[]
    guestLinks: { label: string; url: string }[]
    podcastLinks: { label: string; url: string }[]
}

const podcastEpisodes: PodcastEpisode[] = [
    // ... Your original data remains the same ...
    {
        id: 1,
        title: 'Godfather of AI: They Keep Silencing Me But I’m Trying to Warn Them!',
        description:
            'Geoffrey Hinton is a British-Canadian computer scientist and cognitive scientist who is known as the "Godfather of AI". He is a professor emeritus at the University of Toronto and a former director of the Vector Institute for Artificial Intelligence. He is also a fellow of the Royal Society of Canada and the Royal Society of London.',
        youtubeId: 'giT0ytynSqg',
        publishedAt: '2025-11-02T19:00:00',
        guestName: 'Geoffrey Hinton',
        guestBio: 'Godfather of AI and pioneer of deep learning, speaking candidly about the future of humanity alongside rapidly advancing AI systems.',
        highlights: [
            "Why there's a real 20 % chance AI could lead to human extinction.",
            'How speaking out about AI got him silenced and what he’s doing now.',
            'The deep regret he feels for helping create AI and how he reconciles it.',
            'The six deadly threats AI poses to humanity right now.',
            'The upside: using AI to advance healthcare, boost productivity, and transform education.',
        ],
        guestLinks: [
            { label: 'Guest · Farcaster', url: 'https://warpcast.com/geoffreyhinton' },
            { label: 'Guest · Twitter', url: 'https://x.com/geoffreyhinton' },
            { label: 'Guest · Telegram', url: 'https://t.me/geoffreyhinton' },
        ],
        podcastLinks: [
            { label: 'Podcast · X', url: 'https://x.com/melonpunkpod' },
            { label: 'Podcast · Farcaster', url: 'https://warpcast.com/melonpunkpod' },
            { label: 'Podcast · Telegram', url: 'https://t.me/melonpunkpod' },
        ],
    },
    {
        id: 2,
        title: 'Sound Money, Smart Culture',
        description:
            'A crash course on how onchain music communities are rebooting distribution, patronage, and fandom with composable tools.',
        youtubeId: 'lK3N2rzf1R4',
        publishedAt: '2025-10-27T17:30:00',
        guestName: 'Mira Synth (Warpcast Music Club)',
        guestBio: 'Producer and curator building bridge experiences between touring artists and onchain collectors, experimenting with new patronage models.',
        highlights: [
            'Why onchain royalty splits outperform traditional sync deals.',
            'Case studies from Warpcast music clubs and IRL meetups.',
            'How Discord funnels and channel NFTs amplify superfans.',
            'Pricing experiments with subscription-backed releases.',
            'New creator tooling stacks for collaborative albums.',
        ],
        guestLinks: [
            { label: 'Guest · Farcaster', url: 'https://warpcast.com/mirasynth' },
            { label: 'Guest · X', url: 'https://x.com/mirasynth' },
        ],
        podcastLinks: [
            { label: 'Podcast · X', url: 'https://x.com/melonpunkpod' },
            { label: 'Podcast · Farcaster', url: 'https://warpcast.com/melonpunkpod' },
            { label: 'Podcast · Telegram', url: 'https://t.me/melonpunkpod' },
        ],
    },
    {
        id: 3,
        title: 'DeFi Builders Roundtable',
        description:
            'Protocol leads from across the multichain landscape on coordination, incentive design, and resilience during uncertain markets.',
        youtubeId: 'P_FT4m7g5kY',
        publishedAt: '2025-10-18T22:45:00',
        guestName: 'Orbit Labs Collective',
        guestBio: 'Distributed team shipping modular DeFi primitives with a focus on economic security and cross-chain liquidity.',
        highlights: [
            'Security budgets, shared audits, and red-team rotations.',
            'Designing incentives under volatile market conditions.',
            'Future of modular DeFi and the rise of intent layers.',
            'Cross-chain liquidity routing and MEV-aware design.',
            'Community governance upgrades that actually scale.',
        ],
        guestLinks: [
            { label: 'Guest · Farcaster', url: 'https://warpcast.com/orbitlabs' },
            { label: 'Guest · Telegram', url: 'https://t.me/orbitlabs' },
        ],
        podcastLinks: [
            { label: 'Podcast · X', url: 'https://x.com/melonpunkpod' },
            { label: 'Podcast · Farcaster', url: 'https://warpcast.com/melonpunkpod' },
            { label: 'Podcast · Telegram', url: 'https://t.me/melonpunkpod' },
        ],
    },
]
// --- Type Definitions and Data remain the same ---

// 1. YouTube IFrame API Loading Management
let youTubeApiPromise: Promise<void> | null = null
const loadYouTubeIframeApi = () => {
    if (typeof window === 'undefined') return Promise.resolve()
    if (youTubeApiPromise) return youTubeApiPromise

    // Check if API is already loaded
    if ((window as any).YT && typeof (window as any).YT.Player === 'function') {
        return Promise.resolve()
    }

    youTubeApiPromise = new Promise((resolve) => {
        const previous = (window as any).onYouTubeIframeAPIReady
            // Overwrite onYouTubeIframeAPIReady and ensure the previous one is called
            ; (window as any).onYouTubeIframeAPIReady = () => {
                previous?.()
                resolve()
            }
        const script = document.createElement('script')
        script.src = 'https://www.youtube.com/iframe_api'
        script.async = true
        document.body.appendChild(script)
    })
    return youTubeApiPromise
}

// 2. Custom Hook to encapsulate single YouTube player logic
const useYouTubePlayer = (videoId: string, containerId: string) => {
    const playerRef = useRef<any>(null)
    // -1: Unstarted, 0: Ended, 1: Playing, 2: Paused, 3: Buffering, 5: Cued
    const [playerState, setPlayerState] = useState<-1 | 0 | 1 | 2 | 3 | 5>(-1)
    const [isReady, setIsReady] = useState(false)
    const pendingActionRef = useRef<'play' | 'pause' | null>(null)

    // Get the current page's origin for playerVars
    const origin = typeof window !== 'undefined' ? window.location.origin : ''

    useEffect(() => {
        let cancelled = false

        loadYouTubeIframeApi().then(() => {
            if (cancelled || playerRef.current) return

            // Initialize the player
            const player = new (window as any).YT.Player(containerId, {
                videoId: videoId,
                host: 'https://www.youtube-nocookie.com',
                playerVars: {
                    rel: 0,
                    playsinline: 1,
                    origin,
                    autoplay: 0,
                },
                events: {
                    onReady: (event: any) => {
                        if (cancelled) return
                        setIsReady(true)

                        // Execute pending action after the player is ready
                        if (pendingActionRef.current === 'play') {
                            pendingActionRef.current = null
                            event.target.playVideo()
                        } else if (pendingActionRef.current === 'pause') {
                            event.target.pauseVideo()
                        }
                        pendingActionRef.current = null
                        setPlayerState(event.target.getPlayerState?.() ?? -1)
                    },
                    onStateChange: (event: any) => {
                        if (cancelled) return
                        const state = event.data
                        setPlayerState(state)
                    },
                },
            })

            playerRef.current = player
        })

        return () => {
            cancelled = true
            // Cleanup: Destroy the player instance
            playerRef.current?.destroy?.()
            playerRef.current = null
        }
    }, [videoId, containerId, origin])

    // Play/Pause control function
    const togglePlayback = useCallback(() => {
        const player = playerRef.current
        const YTPlayerState = (window as any).YT?.PlayerState

        if (!player || !YTPlayerState) {
            // API not loaded or player not instantiated, mark as pending play
            pendingActionRef.current = 'play'
            loadYouTubeIframeApi()
            return
        }

        const isPlayingNow = playerState === YTPlayerState.PLAYING || playerState === YTPlayerState.BUFFERING

        if (!isReady) {
            // Player is instantiated but not ready, mark action as pending
            pendingActionRef.current = isPlayingNow ? 'pause' : 'play'
            return
        }

        if (isPlayingNow) {
            player.pauseVideo()
        } else {
            player.playVideo()
        }
    }, [playerState, isReady])


    // Determine if currently playing 
    const isPlaying = playerState === 1 || playerState === 3 // 1: Playing, 3: Buffering

    return {
        playerState,
        isPlaying,
        togglePlayback,
        isReady,
    }
}

const getPlatformIcon = (label: string) => {
    const normalized = label.toLowerCase()

    if (normalized.includes('farcaster')) {
        return (
            <svg viewBox="0 0 1000 1000" className="h-4 w-4" aria-hidden="true">
                <path d="M257.778 155.556H742.222V844.445H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.445H257.778V155.556Z" fill="currentColor" />
                <path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.445H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z" fill="currentColor" />
                <path d="M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.445H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z" fill="currentColor" />
            </svg>
        )
    }

    if (normalized.includes('telegram')) {
        return (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M20.88 3.52a1.5 1.5 0 0 0-1.63-.26L3.7 10.07a1.5 1.5 0 0 0 .05 2.75l4.18 1.7 1.63 4.85a1.5 1.5 0 0 0 2.68.34l2.28-3.2 3.74 2.64a1.5 1.5 0 0 0 2.34-.94l2.13-12.1a1.5 1.5 0 0 0-.83-1.6zM9.61 13.16l6.6-4.21-4.4 4.89a1.5 1.5 0 0 0-.33.57l-.7 2.04-.93-2.77a1.5 1.5 0 0 0-.24-.43z"
                />
            </svg>
        )
    }

    if (normalized.includes('twitter') || normalized === 'x') {
        return (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.37 8.35 8.35 0 0 1-2.7 1.05 4.21 4.21 0 0 0-7.16 3.84A12 12 0 0 1 3.16 4.9a4.21 4.21 0 0 0 1.3 5.62 4.16 4.16 0 0 1-1.9-.52v.05a4.2 4.2 0 0 0 3.39 4.13 4.24 4.24 0 0 1-1.89.07 4.22 4.22 0 0 0 3.94 2.93A8.46 8.46 0 0 1 2 19.54a11.93 11.93 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.35 8.35 0 0 0 22.46 6z"
                />
            </svg>
        )
    }

    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
        </svg>
    )
}

// 3. Single Podcast Episode Component
function PodcastEpisodeItem({ episode, index }: { episode: PodcastEpisode; index: number }) {
    const containerId = `podcast-player-${episode.id}`
    const { isPlaying, togglePlayback, isReady } = useYouTubePlayer(
        episode.youtubeId,
        containerId,
    )

    const farcasterLink = episode.guestLinks.find((link) => link.label.toLowerCase().includes('farcaster'))
    const twitterLink = episode.guestLinks.find((link) => {
        const label = link.label.toLowerCase()
        return label.includes('twitter') || label === 'x'
    })

    const socialLinks = [
        farcasterLink ? { ...farcasterLink, title: 'Farcaster profile' } : null,
        twitterLink ? { ...twitterLink, title: 'Twitter profile' } : null,
    ].filter(Boolean) as ({ label: string; url: string; title: string })[]

    const isDark = index % 2 === 0
    const cardClasses = isDark
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white'
        : 'bg-white text-gray-900'
    const subTextClasses = isDark ? 'text-gray-300' : 'text-gray-600'
    const playButtonClasses = isDark
        ? 'border-white/80 bg-transparent text-white hover:bg-white hover:text-gray-900'
        : 'border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-yellow-200'
    const loadingButtonClasses = isDark
        ? 'border-white/20 bg-gray-900 text-gray-400'
        : 'border-gray-200 bg-gray-50 text-gray-400'
    const socialButtonClasses = isDark
        ? 'border-white/25 bg-white/5 text-gray-100 hover:border-white hover:text-white hover:bg-white/15'
        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-900 hover:text-gray-900'
    const highlightContainerClasses = isDark
        ? 'group rounded-lg border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm transition hover:border-white/30'
        : 'group rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-2 transition hover:border-gray-300'
    const highlightSummaryClasses = isDark
        ? 'text-[0.78rem] tracking-[0.12em] text-gray-200 group-open:text-white'
        : 'text-[0.78rem] tracking-[0.12em] text-gray-600 group-open:text-gray-900'
    const highlightIconClasses = isDark
        ? 'ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/25 text-[0.65rem] text-gray-200 transition-transform group-open:rotate-45 group-open:text-white'
        : 'ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-[0.65rem] text-gray-600 transition-transform group-open:rotate-45'
    const highlightContentClasses = isDark
        ? 'mt-1.5 space-y-1.5 text-xs text-gray-200'
        : 'mt-1.5 space-y-1.5 text-xs text-gray-700'
    const highlightItemClasses = isDark
        ? 'rounded-md bg-white/10 px-2.5 py-1.5 shadow-sm backdrop-blur-sm'
        : 'rounded-md bg-white/90 px-2.5 py-1.5 shadow-sm'

    return (
        <article
            className={`flex w-full flex-col gap-5 px-5 py-10 transition-colors duration-300 sm:px-12 ${cardClasses}`}
        >
            <header className="space-y-2">
                <h2 className={`text-3xl sm:text-4xl font-extrabold leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {episode.title}
                </h2>
            </header>

            {/* YouTube Player Container */}
            <div className="relative w-full overflow-hidden bg-black">
                <div className="relative w-full pt-[56.25%]">
                    <div id={containerId} className="absolute inset-0 h-full w-full" />
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <div className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <span className="text-xl font-semibold">{episode.guestName}</span>
                            {socialLinks.length > 0 && (
                                <div className="flex items-center gap-2">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${episode.guestName} on ${link.title}`}
                                            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg shadow-sm transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-105 ${socialButtonClasses}`}
                                        >
                                            {getPlatformIcon(link.label)}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <span className={`text-sm leading-relaxed ${subTextClasses}`}>{episode.guestBio}</span>
                    </div>

                    {/* Play/Pause Button */}
                    {isReady ? (
                        <button
                            type="button"
                            onClick={togglePlayback}
                            className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-200 hover:scale-105 ${playButtonClasses}`}
                        >
                            <span className="sr-only">{isPlaying ? 'Pause video' : 'Play video'}</span>
                            {isPlaying ? (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <rect x="6" y="5" width="4" height="14" rx="1" />
                                    <rect x="14" y="5" width="4" height="14" rx="1" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M8 5.25a1 1 0 0 1 1.53-.848l8.5 5.25a1 1 0 0 1 0 1.696l-8.5 5.25A1 1 0 0 1 8 16.75V5.25z" />
                                </svg>
                            )}
                        </button>
                    ) : (
                        <div
                            className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 select-none ${loadingButtonClasses}`}
                        >
                            <span className="sr-only">Video loading</span>
                            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-80" fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Links, Highlights, and Description sections remain the same... */}
                <details className={highlightContainerClasses}>
                    <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                        <span className={highlightSummaryClasses}>
                            Highlights
                        </span>
                        <span className={highlightIconClasses}>
                            +
                        </span>
                    </summary>
                    <div className={highlightContentClasses}>
                        {episode.highlights.map((point, idx) => (
                            <p key={idx} className={highlightItemClasses}>
                                {point}
                            </p>
                        ))}
                    </div>
                </details>
            </div>
        </article>
    )
}

// 4. Main Component
export function PodcastContent() {
    return (
        <section className="relative h-full min-h-full w-full">
            <div className="relative h-full min-h-full overflow-y-auto no-scrollbar" style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
                {podcastEpisodes.map((episode, index) => (
                    <PodcastEpisodeItem key={episode.id} episode={episode} index={index} />
                ))}
            </div>
        </section>
    )
}