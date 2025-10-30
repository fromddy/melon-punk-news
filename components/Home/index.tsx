'use client'

import { FarcasterActions } from '@/components/Home/FarcasterActions'
import { User } from '@/components/Home/User'
import { WalletActions } from '@/components/Home/WalletActions'
import { NotificationActions } from './NotificationActions'
import CustomOGImageAction from './CustomOGImageAction'
import { Haptics } from './Haptics'
import { News } from "./News"
import { APP_URL } from '@/lib/constants'


export function Demo() {

  const logoURL = APP_URL + "/images/icon.png";
  return (
    <div className="flex flex-col h-screen overflow-x-hidden" style={{ backgroundColor: '#ffde5a' }}>


      <header className="flex-shrink-0 p-6 bg-yellow-200 border-b border-yellow-400 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-center space-x-4">
          {/* Logo 图片 */}
          <img
            src={logoURL}        // 替换成你的 logo 路径
            alt="Melon Punk Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
          {/* 标题 */}
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-wide drop-shadow-sm"
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            Melon Punk News
          </h1>
        </div>
        <div>
          <h1> Advertising Space for Rent 🪧 </h1>
        </div>
      </header>

      {/* 可滚动新闻区域 */}
      <main className="flex-1 overflow-auto px-4 sm:px-6 py-4">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <News />
        </div>
      </main>
    </div>
  )
}