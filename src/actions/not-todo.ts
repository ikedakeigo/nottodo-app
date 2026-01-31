'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const priorityEnum = z.enum(['NONE', 'LOW', 'MEDIUM', 'HIGH'])

const dateString = z.string().refine(
  (val) => !val || !isNaN(Date.parse(val)),
  { message: '有効な日付形式で入力してください' }
)

const createNotTodoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200),
  date: z.string(),
  categoryId: z.string().optional(),
  dueDate: dateString.optional(),
  priority: priorityEnum.optional(),
})

const updateNotTodoSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  isCompleted: z.boolean().optional(),
  categoryId: z.string().nullable().optional(),
  dueDate: dateString.nullable().optional(),
  priority: priorityEnum.optional(),
})

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  // ユーザーがPrismaに存在することを確認（存在しなければ作成）
  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name,
        avatarUrl: user.user_metadata?.avatar_url,
      },
    })

    // デフォルトカテゴリを作成
    await prisma.category.createMany({
      data: [
        { name: '仕事', color: '#3B82F6', icon: 'briefcase', userId: user.id },
        { name: '私生活', color: '#10B981', icon: 'home', userId: user.id },
        { name: '健康', color: '#F59E0B', icon: 'heart', userId: user.id },
        { name: 'SNS', color: '#8B5CF6', icon: 'smartphone', userId: user.id },
      ],
    })
  }

  return user
}

export async function createNotTodo(input: z.infer<typeof createNotTodoSchema>) {
  const user = await getAuthUser()
  const validated = createNotTodoSchema.parse(input)

  const notTodo = await prisma.notTodo.create({
    data: {
      title: validated.title,
      date: new Date(validated.date),
      categoryId: validated.categoryId || null,
      dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
      priority: validated.priority || 'NONE',
      userId: user.id,
    },
    include: {
      category: true,
    },
  })

  revalidatePath('/dashboard')
  return notTodo
}

export async function updateNotTodo(id: string, input: z.infer<typeof updateNotTodoSchema>) {
  const user = await getAuthUser()
  const validated = updateNotTodoSchema.parse(input)

  const updateData: Record<string, unknown> = {}
  if (validated.title !== undefined) updateData.title = validated.title
  if (validated.isCompleted !== undefined) updateData.isCompleted = validated.isCompleted
  if (validated.categoryId !== undefined) updateData.categoryId = validated.categoryId
  if (validated.priority !== undefined) updateData.priority = validated.priority
  if (validated.dueDate !== undefined) {
    updateData.dueDate = validated.dueDate ? new Date(validated.dueDate) : null
  }

  const notTodo = await prisma.notTodo.update({
    where: {
      id,
      userId: user.id,
    },
    data: updateData,
    include: {
      category: true,
    },
  })

  revalidatePath('/dashboard')
  return notTodo
}

export async function toggleNotTodo(id: string) {
  const user = await getAuthUser()

  const current = await prisma.notTodo.findUnique({
    where: { id, userId: user.id },
  })

  if (!current) throw new Error('Not found')

  const notTodo = await prisma.notTodo.update({
    where: { id },
    data: { isCompleted: !current.isCompleted },
    include: { category: true },
  })

  revalidatePath('/dashboard')
  return notTodo
}

export async function deleteNotTodo(id: string) {
  const user = await getAuthUser()

  await prisma.notTodo.delete({
    where: {
      id,
      userId: user.id,
    },
  })

  revalidatePath('/dashboard')
}

export async function getNotTodosByDate(date: string) {
  const user = await getAuthUser()

  return prisma.notTodo.findMany({
    where: {
      userId: user.id,
      date: new Date(date),
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
