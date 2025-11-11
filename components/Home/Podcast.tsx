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
    guestBio: string[]
    highlights: string[]
    guestLinks: { label: string; url: string }[]
}

const podcastEpisodes: PodcastEpisode[] = [
    // ... Your original data remains the same ...
    {
        id: 1,
        title: '我们可以对Optimism保持乐观吗?',
        description:
            'Optimism中文力量 Marcus访谈',
        youtubeId: 'b8ZbCB-tK_o',
        publishedAt: '2025-9-04T17:30:00',
        guestName: 'Marcus',
        guestBio: ['OP GovNerd, OP中文力量 founder', 'LXDAO 核心贡献者'],
        highlights: [
            'Optimism 与 以太坊的关系',
            '基于Op Stack的Superchain生态战略',
            '探讨了Optimism的去中心化治理',
            '$OP 的价值锚定和市场现状',
            'Optimism 和 Base的深度合作关系',
            'Optimism mainnet上值得关注的有趣的应用',
            '如何参与到Op生态的建设当中',
        ],
        guestLinks: [
            { label: 'Guest · Farcaster', url: '' },
            { label: 'Guest · Twitter', url: 'https://x.com/Bitzack_01' },
            { label: 'Guest · Telegram', url: 'https://t.me/Marcuszheng' },
        ],
    },
    {
        id: 2,
        title: '去中心化社交协议 Farcaster 的设计哲学',
        description:
            '去中心化社交协议 Farcaster 的设计哲学',
        youtubeId: 'LHEh1W6BPeU',
        publishedAt: '2025-10-10T17:30:00',
        guestName: ' 0xLuo (on farcaster)',
        guestBio: ['Farcaster 中文宣传委员'],
        highlights: [
            'Farcaster 和 Twitter 相比的差异性优势',
            'Farcaster 和 Base App 的关系',
            'Farcaster 上的 Mini App & Wallet',
            'Farcaster 的设计哲学和发展畅想',
        ],
        guestLinks: [
            { label: 'Guest · Farcaster', url: 'https://farcaster.xyz/0xluo.eth' },
            { label: 'Guest · Twitter', url: '' },
            { label: 'Guest · Telegram', url: '' },
        ],
    },
    {
        id: 3,
        title: '漫谈RWA',
        description:
            '漫谈RWA',
        youtubeId: 'r4Y-zjkveMY',
        publishedAt: '2025-10-14T17:30:00',
        guestName: 'francis404',
        guestBio: ['研究员'],
        highlights: [
            'RWA',
            '稳定币',
            '币股',
        ],
        guestLinks: [
            { label: 'Guest · Farcaster', url: '' },
            { label: 'Guest · Twitter', url: 'https://x.com/francis404eth' },
            { label: 'Guest · Telegram', url: '' },
        ],
    },

    {
        id: 4,
        title: '我的硬件钱包私钥能被***破解吗？',
        description:
            '我的硬件钱包私钥能被***破解吗？',
        youtubeId: 'AJ2oigCeNeA',
        publishedAt: '2025-10-15T17:30:00',
        guestName: 'Pablo',
        guestBio: ['PlanckerDAO contributor'],
        highlights: [
            '随机性对钱包私钥生成的重要性',
            '散户如何安全的使用硬件钱包',
            '如何科学地进行助记词备份',
            '团队如何正确地进行账户管理',
        ],
        guestLinks: [
            { label: 'Guest · Farcaster', url: '' },
            {
                label: 'Guest · Twitter', url: 'https://x.com/silenlee'
            },
            { label: 'Guest · Telegram', url: '' },
        ],
    },
    {
        id: 5,
        title: '从爆亏失眠到手抓百倍, 00后打狗瓦学弟图哥的memecoin历险记',
        description:
            '从爆亏失眠到手抓百倍, 00后打狗瓦学弟图哥的memecoin历险记',
        youtubeId: 'QEgnZ-yrluI',
        publishedAt: '2025-11-7T17:30:00',
        guestName: '图哥',
        guestBio: ['00后打狗瓦学弟'],
        highlights: [
            'memecoin 市场不同阶段的特征 crypto交易员的时间管理策略',
            '失眠的夜, 大一遭遇黑天鹅一晚爆亏3/4',
            '专注OHM 3, 3 赛道, 一个月百倍回报',
            'NFT时代, 拉3个人进discord 得白名单,1个月后赚20w',
            '新一轮牛市的策略变化',
            '在memecoin领域一共赚了多少钱',
            'Solana, BNB, Base 上meme生态的不同风格',
            '如何解读base团队向外界释放探索发币的意图',
            'base人生, ping, 中, viturals, AIXBT 等',
            '如何看待doge, pepe这一类远古OG memecoin',
            '对新手memecoin玩家的良心建议',

        ],
        guestLinks: [
            { label: 'Guest · Farcaster', url: 'https://farcaster.xyz/tudd' },
            {
                label: 'Guest · Twitter', url: 'https://x.com/bitbob9'
            },
            { label: 'Guest · Telegram', url: '' },
        ],
    },
    {
        id: 6,
        title: 'Uniswap v4 深入浅出',
        description:
            'Uniswap v4 深入浅出',
        youtubeId: 'JbMuSWJy97w',
        publishedAt: '2025-11-11T17:30:00',
        guestName: 'wongSSH',
        guestBio: ['DeFi 合约工程师', '项目获得了uniswap foundation的grant'],
        highlights: [
            'uniswap 的基本功能',
            'uniswap v0, v1, v2, v3 版本的迭代',
            'v1 开始支持一个流动性池中有多个流动性提供者',
            'v2开始支持任意两种代币组池子',
            'v3比v2复杂特别多, 提供设置区间流动性的功能',
            '无常损失',
            '自动做市商 和 订单簿 的对比',
            'uniswap 和 hyperliquid 的区别',
            '永续合约',
            'hyperliquid 和 中心化交易所 的区别',
            'uniswap v4 的架构和工程上的优化',
            ' - 单体架构(Singleton)',
            ' - 重新引入了原生ETH',
            ' - 闪电记账系统 flash accounting ',
            'uniswap v4 Hooks ',
            '普通用户如何防范常见的风险',
        ],
        guestLinks: [
            { label: 'Guest · Farcaster', url: '' },
            { label: 'Guest · Twitter', url: 'https://x.com/wong_ssh' },
            { label: 'Guest · Telegram', url: '' },
        ],
    },
]

const parsePublishedAt = (value: string) => {
    const direct = new Date(value)
    if (!Number.isNaN(direct.getTime())) return direct

    const [datePart = '', timePart = ''] = value.split(/[T ]/)
    const [year = '0', month = '1', day = '1'] = datePart.split('-')
    const [hour = '0', minute = '0', second = '0'] = timePart.split(':')

    return new Date(
        Number(year),
        Math.max(Number(month) - 1, 0),
        Number(day),
        Number(hour),
        Number(minute),
        Number(second),
    )
}

const sortedEpisodes = [...podcastEpisodes].sort(
    (a, b) => parsePublishedAt(b.publishedAt).getTime() - parsePublishedAt(a.publishedAt).getTime(),
)
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

    const farcasterLink = episode.guestLinks.find(
        (link) => link.url && link.label.toLowerCase().includes('farcaster'),
    )
    const twitterLink = episode.guestLinks.find((link) => {
        const label = link.label.toLowerCase()
        return link.url && (label.includes('twitter') || label === 'x')
    })
    const telegramLink = episode.guestLinks.find(
        (link) => link.url && link.label.toLowerCase().includes('telegram'),
    )

    const socialLinks = [
        farcasterLink ? { ...farcasterLink, title: 'Farcaster profile' } : null,
        twitterLink ? { ...twitterLink, title: 'Twitter profile' } : null,
        telegramLink ? { ...telegramLink, title: 'Telegram profile' } : null,
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
        <article className={`flex w-full flex-col gap-5 px-5 py-10 transition-colors duration-300 sm:px-12 ${cardClasses}`}>
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
                        <div className={`flex flex-col gap-1 text-sm leading-relaxed ${subTextClasses}`}>
                            {episode.guestBio.map((line, idx) => (
                                <span key={idx}>{line}</span>
                            ))}
                        </div>
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
                {sortedEpisodes.map((episode, index) => (
                    <PodcastEpisodeItem key={episode.id} episode={episode} index={index} />
                ))}
            </div>
        </section>
    )
}