'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CategorySelector } from '@/components/category/category-selector'
import { useCreateNotTodo } from '@/hooks/use-not-todos'
import { useUIStore } from '@/stores/ui-store'
import { Plus, Loader2 } from 'lucide-react'

const formSchema = z.object({
  title: z.string().min(1, '内容を入力してください').max(200),
  categoryId: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export function NotToDoForm() {
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
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            placeholder="今日やらないことを入力..."
            {...register('title')}
            disabled={isPending}
            className="h-9 bg-muted/50 border-border/50 focus:bg-card focus:border-primary/50 transition-all placeholder:text-muted-foreground/60 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <CategorySelector
            value={categoryId}
            onChange={(value) => setValue('categoryId', value)}
          />
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
      </div>
      {errors.title && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
          {errors.title.message}
        </p>
      )}
    </form>
  )
}
