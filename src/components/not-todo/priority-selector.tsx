'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PRIORITY_CONFIG, type Priority } from '@/types'
import { Flag } from 'lucide-react'

interface PrioritySelectorProps {
  value?: Priority
  onChange: (value: Priority | undefined) => void
}

export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  return (
    <Select
      value={value || 'NONE'}
      onValueChange={(val) => onChange(val === 'NONE' ? undefined : val as Priority)}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="優先度" />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(PRIORITY_CONFIG) as Priority[]).map((priority) => {
          const config = PRIORITY_CONFIG[priority]
          return (
            <SelectItem key={priority} value={priority}>
              <span className="flex items-center gap-2">
                <Flag
                  className="h-3 w-3"
                  style={{ color: config.color }}
                  fill={priority !== 'NONE' ? config.color : 'transparent'}
                />
                {config.label}
              </span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
