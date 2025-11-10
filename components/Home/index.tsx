'use client'

import { useEffect, useState, useMemo } from 'react'
import { FarcasterActions } from '@/components/Home/FarcasterActions'
import { User } from '@/components/Home/User'
import { WalletActions } from '@/components/Home/WalletActions'
import { NotificationActions } from './NotificationActions'
import CustomOGImageAction from './CustomOGImageAction'
import { Haptics } from './Haptics'
import { News } from "./News"
import { PodcastContent } from './Podcast'
import { GamingContent } from './Gaming'
import { APP_URL } from '@/lib/constants'
import type { SafeAreaInsets } from '@/types'


export function Demo({ insets }: { insets?: SafeAreaInsets }) {

  const logoURL = APP_URL + "/images/icon.png";
  const negativeMargin = {
    marginTop: insets?.top ? `-${insets.top}px` : 0,
    marginBottom: insets?.bottom ? `-${insets.bottom}px` : 0,
    marginLeft: insets?.left ? `-${insets.left}px` : 0,
    marginRight: insets?.right ? `-${insets.right}px` : 0,
  };

  useEffect(() => {
    // Prevent body scroll
    const preventScroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const mainElement = document.querySelector('main[class*="overflow-y-auto"]');

      // Only allow scrolling within the main element
      if (mainElement && mainElement.contains(target)) {
        return;
      }

      // Prevent scrolling on body
      if (!target.closest('main[class*="overflow-y-auto"]')) {
        e.preventDefault();
      }
    };

    document.body.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const [activeTab, setActiveTab] = useState<'ethNews' | 'podcast' | 'gaming'>('ethNews');

  const tabItems = useMemo(
    () => [
      { id: 'ethNews' as const, label: 'ETH News' },
      { id: 'podcast' as const, label: 'Podcast' },
      { id: 'gaming' as const, label: 'Gaming' },
    ],
    []
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'podcast':
        return <PodcastContent />;
      case 'gaming':
        return <GamingContent />;
      case 'ethNews':
      default:
        return <News />;
    }
  };

  const contentWrapperClass = useMemo(() => {
    if (activeTab === 'podcast') {
      return 'w-full space-y-0';
    }
    return 'w-full space-y-6 px-4 sm:px-6 py-4';
  }, [activeTab]);

  const mainClassName = useMemo(() => {
    const base = 'flex-1 overflow-y-auto overflow-x-hidden w-full';
    return activeTab === 'podcast' ? base : `${base} pb-28`;
  }, [activeTab]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden" style={{ backgroundColor: '#ffde5a', ...negativeMargin }}>


      <header
        className="flex-shrink-0 py-2 px-3 border-b border-yellow-400 shadow-sm sticky top-0 z-10"
        style={{ backgroundColor: '#ffde5a' }}
      >
        <div className="flex items-center justify-center space-x-2">
          {/* Logo image */}
          <img
            src={logoURL}        // Replace with your logo path
            alt="Melon Punk Logo"
            className="w-11 h-11 sm:w-13 sm:h-13 object-contain"
          />
          {/* Title */}
          <h1
            className="text-lg sm:text-xl font-bold text-gray-900 tracking-wide drop-shadow-sm"
            style={{ fontFamily: 'var(--font-comic-neue), "Comic Neue", cursive' }}
          >
            Melon Punk
          </h1>
        </div>
      </header>

      {/* Scrollable news area */}
      <main
        className={mainClassName}
        style={{
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
          backgroundColor: activeTab === 'podcast' ? '#ffffff' : 'transparent',
        }}
      >
        <div className={contentWrapperClass}>
          {renderContent()}
        </div>
      </main>

      <nav
        className="flex-shrink-0 border-t border-yellow-500 shadow-inner backdrop-blur-md"
        style={{
          background: 'linear-gradient(180deg, rgba(255,222,90,0.92) 0%, rgba(203,138,25,0.9) 100%)',
          paddingBottom: insets?.bottom ?? 6,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 -4px 12px rgba(120,70,15,0.35)',
        }}
      >
        <div className="flex items-center justify-around px-3 py-1.5">
          {tabItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`cyber-btn ${isActive ? 'cyber-btn-active' : 'cyber-btn-idle'} flex-1 mx-1 uppercase tracking-[0.22em] text-[0.7rem] sm:text-sm`}
                style={{ fontFamily: 'var(--font-comic-neue), "Comic Neue", cursive' }}
              >
                <span className="relative z-10 block px-3 py-1.5 whitespace-nowrap">{tab.label}</span>
                {isActive && <span className="cyber-btn-indicator" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  )
}