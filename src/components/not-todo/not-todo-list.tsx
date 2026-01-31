'use client'

import { useEffect, useState, useMemo } from 'react'
import { useNotTodos } from '@/hooks/use-not-todos'
import { useUIStore } from '@/stores/ui-store'
import { useFilterStore } from '@/stores/filter-store'
import { NotToDoItem } from './not-todo-item'
import { NotToDoEmpty } from './not-todo-empty'
import { Loader2 } from 'lucide-react'
import { isPast, isToday, addDays, isBefore } from 'date-fns'
import type { NotTodoWithCategory } from '@/types'
import { PRIORITY_CONFIG } from '@/types'

export function NotToDoList() {
  const [isMounted, setIsMounted] = useState(false)
  const selectedDate = useUIStore((state) => state.selectedDate)
  const {
    categoryFilter,
    statusFilter,
    priorityFilter,
    dueDateFilter,
    sortBy,
  } = useFilterStore()
  const { data: notTodos, isLoading } = useNotTodos(selectedDate)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const filteredAndSorted = useMemo(() => {
    if (!notTodos) return []

    const filtered = notTodos.filter((item: NotTodoWithCategory) => {
      // Category filter
      if (categoryFilter && item.categoryId !== categoryFilter) return false

      // Status filter
      if (statusFilter === 'completed' && !item.isCompleted) return false
      if (statusFilter === 'active' && item.isCompleted) return false

      // Priority filter
      if (priorityFilter && item.priority !== priorityFilter) return false

      // Due date filter
      if (dueDateFilter !== 'all') {
        const dueDate = item.dueDate ? new Date(item.dueDate) : null
        const today = new Date()
        const weekEnd = addDays(today, 7)

        switch (dueDateFilter) {
          case 'overdue':
            if (!dueDate || !isPast(dueDate) || isToday(dueDate)) return false
            break
          case 'today':
            if (!dueDate || !isToday(dueDate)) return false
            break
          case 'this_week':
            if (!dueDate || isPast(dueDate) || !isBefore(dueDate, weekEnd)) return false
            break
          case 'no_due':
            if (dueDate) return false
            break
        }
      }

      return true
    })

    // Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'dueDate': {
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        }
        case 'priority': {
          const orderA = PRIORITY_CONFIG[a.priority]?.order ?? 0
          const orderB = PRIORITY_CONFIG[b.priority]?.order ?? 0
          return orderB - orderA // High priority first
        }
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
  }, [notTodos, categoryFilter, statusFilter, priorityFilter, dueDateFilter, sortBy])

  if (!isMounted || isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!filteredAndSorted.length) {
    return <NotToDoEmpty />
  }

  return (
    <div className="space-y-3">
      {filteredAndSorted.map((notTodo: NotTodoWithCategory) => (
        <NotToDoItem key={notTodo.id} notTodo={notTodo} />
      ))}
    </div>
  )
}
