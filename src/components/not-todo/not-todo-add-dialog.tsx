'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { CategorySelector } from '@/components/category/category-selector'
import { PrioritySelector } from '@/components/not-todo/priority-selector'
import { DueDatePicker } from '@/components/not-todo/due-date-picker'
import { useCreateNotTodo } from '@/hooks/use-not-todos'
import { useUIStore } from '@/stores/ui-store'
import { notTodoFormSchema, type NotTodoFormData } from '@/lib/schemas/not-todo'
import type { Priority } from '@/types'

interface NotToDoAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotToDoAddDialog({ open, onOpenChange }: NotToDoAddDialogProps) {
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
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>NotToDoを追加</DialogTitle>
          <DialogDescription>
            今日やらないことを入力してください
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="今日やらないことを入力..."
              {...register('title')}
              disabled={isPending}
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">カテゴリ（任意）</label>
            <CategorySelector
              value={categoryId}
              onChange={(value) => setValue('categoryId', value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">優先度（任意）</label>
              <PrioritySelector
                value={priority as Priority | undefined}
                onChange={(value) => setValue('priority', value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">期限（任意）</label>
              <DueDatePicker
                value={dueDate}
                onChange={(value) => setValue('dueDate', value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              追加
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
