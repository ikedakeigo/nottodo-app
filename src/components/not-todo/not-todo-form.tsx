'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CategorySelector } from '@/components/category/category-selector'
import { PrioritySelector } from '@/components/not-todo/priority-selector'
import { DueDatePicker } from '@/components/not-todo/due-date-picker'
import { useCreateNotTodo } from '@/hooks/use-not-todos'
import { useUIStore } from '@/stores/ui-store'
import { Plus, Loader2 } from 'lucide-react'
import { notTodoFormSchema, type NotTodoFormData } from '@/lib/schemas/not-todo'
import type { Priority } from '@/types'

export function NotToDoForm() {
  const [isMounted, setIsMounted] = useState(false)
  const selectedDate = useUIStore((state) => state.selectedDate)
  const { mutate: createNotTodo, isPending } = useCreateNotTodo()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NotTodoFormData>({
    resolver: zodResolver(notTodoFormSchema),
  })

  const categoryId = watch('categoryId')
  const priority = watch('priority')
  const dueDate = watch('dueDate')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSubmit = (data: NotTodoFormData) => {
    createNotTodo(
      {
        title: data.title,
        date: format(selectedDate, 'yyyy-MM-dd'),
        categoryId: data.categoryId,
        dueDate: data.dueDate ? format(data.dueDate, 'yyyy-MM-dd') : undefined,
        priority: data.priority,
      },
      {
        onSuccess: () => {
          reset()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* 入力欄と追加ボタン */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="今日やらないことを入力..."
            {...register('title')}
            disabled={isPending}
            className="h-9 bg-muted/50 border-border/50 focus:bg-card focus:border-primary/50 transition-all placeholder:text-muted-foreground/60 text-sm"
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="h-9 px-3 bg-primary hover:bg-primary/90 text-white font-medium shadow-sm hover:shadow transition-all text-sm"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          <span className="ml-1 hidden sm:inline">追加</span>
        </Button>
      </div>
      {/* セレクター群 */}
      {isMounted && (
        <div className="flex gap-2 flex-wrap">
          <CategorySelector
            value={categoryId}
            onChange={(value) => setValue('categoryId', value)}
          />
          <PrioritySelector
            value={priority as Priority | undefined}
            onChange={(value) => setValue('priority', value)}
          />
          <DueDatePicker
            value={dueDate}
            onChange={(value) => setValue('dueDate', value)}
          />
        </div>
      )}
      {errors.title && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
          {errors.title.message}
        </p>
      )}
    </form>
  )
}
