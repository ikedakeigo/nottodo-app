'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CategorySelector } from '@/components/category/category-selector'
import { useCreateTemplate } from '@/hooks/use-templates'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  title: z.string().min(1, '内容を入力してください').max(200),
  categoryId: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface TemplateFormProps {
  onSuccess?: () => void
}

export function TemplateForm({ onSuccess }: TemplateFormProps) {
  const { mutate: createTemplate, isPending } = useCreateTemplate()

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
    createTemplate(
      {
        title: data.title,
        categoryId: data.categoryId,
      },
      {
        onSuccess: () => {
          reset()
          onSuccess?.()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">テンプレート内容</Label>
        <Input
          id="title"
          placeholder="テンプレートの内容を入力..."
          {...register('title')}
          disabled={isPending}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>カテゴリ</Label>
        <CategorySelector
          value={categoryId}
          onChange={(value) => setValue('categoryId', value)}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        テンプレートを作成
      </Button>
    </form>
  )
}
