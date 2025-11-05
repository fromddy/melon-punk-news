import type { SafeAreaInsets } from '@/types'

interface SafeAreaContainerProps {
  children: React.ReactNode
  insets?: SafeAreaInsets
}

export const SafeAreaContainer = ({
  children,
  insets,
}: SafeAreaContainerProps) => (
  <div
    className="flex h-screen w-screen flex-col overflow-hidden"
    style={{
      marginTop: insets?.top ?? 0,
      marginBottom: insets?.bottom ?? 0,
      marginLeft: insets?.left ?? 0,
      marginRight: insets?.right ?? 0,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  >
    {children}
  </div>
)
