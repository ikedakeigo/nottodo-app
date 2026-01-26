'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const createTemplateSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200),
  categoryId: z.string().optional(),
})

const updateTemplateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  categoryId: z.string().nullable().optional(),
})

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function getTemplates() {
  const user = await getAuthUser()

  return prisma.template.findMany({
    where: {
      userId: user.id,
    },
    include: {
      category: true,
    },
    orderBy: {
      usageCount: 'desc',
    },
  })
}

export async function createTemplate(input: z.infer<typeof createTemplateSchema>) {
  const user = await getAuthUser()
  const validated = createTemplateSchema.parse(input)

  const template = await prisma.template.create({
    data: {
      title: validated.title,
      categoryId: validated.categoryId || null,
      userId: user.id,
    },
    include: {
      category: true,
    },
  })

  revalidatePath('/dashboard/templates')
  return template
}

export async function updateTemplate(id: string, input: z.infer<typeof updateTemplateSchema>) {
  const user = await getAuthUser()
  const validated = updateTemplateSchema.parse(input)

  const template = await prisma.template.update({
    where: {
      id,
      userId: user.id,
    },
    data: validated,
    include: {
      category: true,
    },
  })

  revalidatePath('/dashboard/templates')
  return template
}

export async function deleteTemplate(id: string) {
  const user = await getAuthUser()

  await prisma.template.delete({
    where: {
      id,
      userId: user.id,
    },
  })

  revalidatePath('/dashboard/templates')
}

export async function useTemplate(id: string, date: string) {
  const user = await getAuthUser()

  const template = await prisma.template.findUnique({
    where: { id, userId: user.id },
  })

  if (!template) throw new Error('Not found')

  // NotToDoを作成
  const notTodo = await prisma.notTodo.create({
    data: {
      title: template.title,
      date: new Date(date),
      categoryId: template.categoryId,
      userId: user.id,
    },
    include: {
      category: true,
    },
  })

  // 使用回数をインクリメント
  await prisma.template.update({
    where: { id },
    data: { usageCount: { increment: 1 } },
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/templates')
  return notTodo
}
