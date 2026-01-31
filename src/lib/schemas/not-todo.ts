import { z } from 'zod'

export const priorityEnum = z.enum(['NONE', 'LOW', 'MEDIUM', 'HIGH'])

export const notTodoFormSchema = z.object({
  title: z.string().min(1, '内容を入力してください').max(200),
  categoryId: z.string().optional(),
  dueDate: z.date().optional(),
  priority: priorityEnum.optional(),
})

export type NotTodoFormData = z.infer<typeof notTodoFormSchema>
