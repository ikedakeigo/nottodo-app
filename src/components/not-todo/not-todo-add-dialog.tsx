'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { useCreateNotTodo } from '@/hooks/use-not-todos'
import { useUIStore } from '@/stores/ui-store'

const formSchema = z.object({
  title: z.string().min(1, '内容を入力してください').max(200),
  categoryId: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

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
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const categoryId = watch('categoryId')

  const onSubmit = (data: FormData) => {
    createNotTodo(
      {
        title: data.title,
        date: format(selectedDate, 'yyyy-MM-dd'),
        categoryId: data.categoryId,
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
