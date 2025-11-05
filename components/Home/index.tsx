'use client'

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

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden" style={{ backgroundColor: '#ffde5a', ...negativeMargin }}>


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
      <main className="flex-1 overflow-auto w-full">
        <div className="w-full space-y-6 px-4 sm:px-6 py-4">
          <News />
        </div>
      </main>
    </div>
  )
}