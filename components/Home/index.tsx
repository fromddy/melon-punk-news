'use client'

import { useEffect } from 'react'
import { FarcasterActions } from '@/components/Home/FarcasterActions'
import { User } from '@/components/Home/User'
import { WalletActions } from '@/components/Home/WalletActions'
import { NotificationActions } from './NotificationActions'
import CustomOGImageAction from './CustomOGImageAction'
import { Haptics } from './Haptics'
import { News } from "./News"
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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden" style={{ backgroundColor: '#ffde5a', ...negativeMargin }}>


      <header className="flex-shrink-0 py-6 px-4 border-b border-yellow-400 shadow-sm sticky top-0 z-10" style={{ backgroundColor: '#ffde5a' }}>
        <div className="flex items-center justify-start space-x-4 pl-2">
          {/* Logo image */}
          <img
            src={logoURL}        // Replace with your logo path
            alt="Melon Punk Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-wide drop-shadow-sm"
            style={{ fontFamily: 'var(--font-comic-neue), "Comic Neue", cursive' }}
          >
            Melon Punk News
          </h1>
        </div>
      </header>

      {/* Scrollable news area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}>
        <div className="w-full space-y-6 px-4 sm:px-6 py-4">
          <News />
        </div>
      </main>
    </div>
  )
}