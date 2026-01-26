'use client'

import { useEffect, useState } from 'react'
import { useNotTodos } from '@/hooks/use-not-todos'
import { useUIStore } from '@/stores/ui-store'
import { useFilterStore } from '@/stores/filter-store'
import { NotToDoItem } from './not-todo-item'
import { NotToDoEmpty } from './not-todo-empty'
import { Loader2 } from 'lucide-react'
import type { NotTodoWithCategory } from '@/types'

export function NotToDoList() {
  const [isMounted, setIsMounted] = useState(false)
  const selectedDate = useUIStore((state) => state.selectedDate)
  const { categoryFilter, statusFilter } = useFilterStore()
  const { data: notTodos, isLoading } = useNotTodos(selectedDate)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const filtered = notTodos?.filter((item: NotTodoWithCategory) => {
    if (categoryFilter && item.categoryId !== categoryFilter) return false
    if (statusFilter === 'completed' && !item.isCompleted) return false
    if (statusFilter === 'active' && item.isCompleted) return false
    return true
  })

  if (!filtered?.length) {
    return <NotToDoEmpty />
  }

  return (
    <div className="space-y-3">
      {filtered.map((notTodo: NotTodoWithCategory) => (
        <NotToDoItem key={notTodo.id} notTodo={notTodo} />
      ))}
    </div>
  )
}
