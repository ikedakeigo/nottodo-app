'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useNotTodos } from '@/hooks/use-not-todos'
import { useUIStore } from '@/stores/ui-store'
import { Button } from '@/components/ui/button'
import { Clock, TrendingUp } from 'lucide-react'

export function SidebarProgress() {
  const [mounted, setMounted] = useState(false)
  const selectedDate = useUIStore((state) => state.selectedDate)
  const { data: notTodos } = useNotTodos(selectedDate)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate progress
  const totalCount = notTodos?.length || 0
  const completedItems = notTodos?.filter((item) => item.isCompleted) || []
  const completedCount = completedItems.length
  const progressRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  // Calculate saved time based on category's savedMinutes (default 30 min)
  const savedMinutes = completedItems.reduce((total, item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const minutes = (item.category as any)?.savedMinutes ?? 30
    return total + minutes
  }, 0)
  const savedHours = Math.floor(savedMinutes / 60)
  const savedMins = savedMinutes % 60

  // Show skeleton during SSR/hydration
  if (!mounted) {
    return (
      <div className="p-3 border-t border-white/10 space-y-2">
        <div className="rounded-md bg-white/10 p-3 animate-pulse">
          <div className="h-4 bg-white/20 rounded mb-2 w-20" />
          <div className="h-2 bg-white/20 rounded-full mb-1" />
          <div className="h-3 bg-white/20 rounded w-16" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 border-t border-white/10 space-y-2">
      {/* Progress Card */}
      <Link href="/dashboard/stats">
        <Button
          variant="ghost"
          className="w-full h-auto p-3 rounded-md bg-white/10 hover:bg-white/20 text-left justify-start"
        >
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/70 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                本日の進捗
              </span>
              <span className="text-xs text-white font-bold">{progressRate}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-[#61bd4f] rounded-full transition-all duration-500"
                style={{ width: `${progressRate}%` }}
              />
            </div>
            <p className="text-xs text-white/80">
              {completedCount}/{totalCount} 達成
            </p>
          </div>
        </Button>
      </Link>

      {/* Saved Time Card */}
      {completedCount > 0 && (
        <div className="rounded-md bg-[#61bd4f]/20 p-3">
          <div className="flex items-center gap-2 text-white">
            <Clock className="h-4 w-4 text-[#61bd4f]" />
            <div>
              <p className="text-xs text-white/70">時間が生まれた!</p>
              <p className="text-sm font-bold">
                {savedHours > 0 ? `${savedHours}時間` : ''}
                {savedMins > 0 ? `${savedMins}分` : ''}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
