'use client'

import { useNotTodos } from '@/hooks/use-not-todos'
import { useUIStore } from '@/stores/ui-store'
import type { NotTodoWithCategory } from '@/types'

export function ProgressRing() {
  const selectedDate = useUIStore((state) => state.selectedDate)
  const { data: notTodos, isLoading } = useNotTodos(selectedDate)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-pulse bg-muted rounded-full h-32 w-32" />
      </div>
    )
  }

  const totalCount = notTodos?.length || 0
  const completedCount = notTodos?.filter((n: NotTodoWithCategory) => n.isCompleted).length || 0
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColor = () => {
    if (percentage >= 71) return '#10B981' // green
    if (percentage >= 31) return '#F59E0B' // yellow
    return '#EF4444' // red
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <svg width="120" height="120" className="transform -rotate-90">
          {/* 背景の円 */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-muted"
          />
          {/* プログレスの円 */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{percentage}%</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          {completedCount} / {totalCount} 達成
        </p>
      </div>
    </div>
  )
}
