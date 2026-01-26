'use client'

import { useEffect, useState } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useUIStore } from '@/stores/ui-store'

export function DatePicker() {
  const { selectedDate, setSelectedDate } = useUIStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const goToPreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1))
  }

  const goToNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1))
  }

  const goToToday = () => {
    setSelectedDate(new Date())
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={goToPreviousDay}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-[200px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {mounted ? format(selectedDate, 'yyyy年M月d日 (E)', { locale: ja }) : <span className="opacity-0">Loading...</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" size="icon" onClick={goToNextDay}>
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" onClick={goToToday}>
        今日
      </Button>
    </div>
  )
}
