import App from '@/components/pages/app'
import { APP_URL } from '@/lib/constants'
import type { Metadata } from 'next'

const frame = {
  version: 'next',
  imageUrl: `${APP_URL}/images/feed.png`,
  button: {
    title: 'Launch Melon Punk',
    action: {
      type: 'launch_frame',
      name: 'A maverick media outlet.',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: 'yellow',
    },
  },
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Melon Punk',
    openGraph: {
      title: 'Melon Punk',
      description: 'A maverick media outlet.',
    },
    other: {
      'fc:frame': JSON.stringify(frame),
    },
  }
}

export default function Home() {
  return <App />
}
