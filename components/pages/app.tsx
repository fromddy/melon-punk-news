'use client'

import { useEffect } from 'react'
import { Demo } from '@/components/Home'
import { useFrame } from '@/components/farcaster-provider'
import { SafeAreaContainer } from '@/components/safe-area-container'

export default function Home() {
  const { context, isLoading, isSDKLoaded, actions } = useFrame()

  useEffect(() => {
    // Every time the app opens, automatically call addMiniApp
    if (isSDKLoaded && actions) {
      actions.addMiniApp().catch((error) => {
        // User cancelled or error occurred, silently handle
        console.log('Add to Farcaster cancelled or error:', error)
      })
    }
  }, [isSDKLoaded, actions])

  if (isLoading) {
    return (
      <SafeAreaContainer insets={context?.client.safeAreaInsets}>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8">
          <h1 className="text-3xl font-bold text-center">Loading...</h1>
        </div>
      </SafeAreaContainer>
    )
  }

  if (!isSDKLoaded) {
    return (
      <SafeAreaContainer insets={context?.client.safeAreaInsets}>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8">
          <h1 className="text-3xl font-bold text-center">
            No farcaster SDK found, please use this miniapp in the farcaster app
          </h1>
        </div>
      </SafeAreaContainer>
    )
  }

  return (
    <SafeAreaContainer insets={context?.client.safeAreaInsets}>
      <Demo insets={context?.client.safeAreaInsets} />
    </SafeAreaContainer>
  )
}
