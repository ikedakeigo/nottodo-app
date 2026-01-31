'use client'

import { PRIORITY_CONFIG, type Priority } from '@/types'
import { Flag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PriorityBadgeProps {
  priority: Priority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  if (priority === 'NONE') return null

  const config = PRIORITY_CONFIG[priority]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium',
        className
      )}
      style={{
        backgroundColor: `${config.color}20`,
        color: config.color,
      }}
    >
      <Flag className="h-3 w-3" fill={config.color} />
      {config.label}
    </span>
  )
}
