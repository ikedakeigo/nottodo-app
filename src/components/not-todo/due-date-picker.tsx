'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DueDatePickerProps {
  value?: Date | null
  onChange: (date: Date | undefined) => void
}

export function DueDatePicker({ value, onChange }: DueDatePickerProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    onChange(date)
    setOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(undefined)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[160px] justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            <span className="flex items-center gap-1 flex-1">
              {format(value, 'M/d (E)', { locale: ja })}
              <X
                className="h-3 w-3 ml-auto hover:text-destructive"
                onClick={handleClear}
              />
            </span>
          ) : (
            <span>期限なし</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={handleSelect}
          locale={ja}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
