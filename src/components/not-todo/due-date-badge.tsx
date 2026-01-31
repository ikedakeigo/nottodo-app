'use client'

import { format, isToday, isTomorrow, isPast, differenceInDays } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DueDateBadgeProps {
  dueDate: Date
  isCompleted?: boolean
  className?: string
}

function getDueDateStatus(dueDate: Date, isCompleted: boolean) {
  if (isCompleted) {
    return { type: 'completed' as const, label: format(dueDate, 'M/d', { locale: ja }) }
  }

  if (isToday(dueDate)) {
    return { type: 'today' as const, label: '今日' }
  }

  if (isTomorrow(dueDate)) {
    return { type: 'tomorrow' as const, label: '明日' }
  }

  if (isPast(dueDate)) {
    const daysOverdue = differenceInDays(new Date(), dueDate)
    return { type: 'overdue' as const, label: `${daysOverdue}日超過` }
  }

  const daysUntil = differenceInDays(dueDate, new Date())
  if (daysUntil <= 7) {
    return { type: 'soon' as const, label: format(dueDate, 'M/d (E)', { locale: ja }) }
  }

  return { type: 'normal' as const, label: format(dueDate, 'M/d', { locale: ja }) }
}

export function DueDateBadge({ dueDate, isCompleted = false, className }: DueDateBadgeProps) {
  const status = getDueDateStatus(dueDate, isCompleted)

  const styles = {
    overdue: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    today: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    tomorrow: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    soon: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    normal: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    completed: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
  }

  const Icon = status.type === 'overdue' ? AlertCircle : Clock

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium',
        styles[status.type],
        isCompleted && 'line-through opacity-60',
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {status.label}
    </span>
  )
}
