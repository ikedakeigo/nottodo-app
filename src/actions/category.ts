'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const createCategorySchema = z.object({
  name: z.string().min(1, 'カテゴリ名は必須です').max(50),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '有効な色コードを入力してください'),
  icon: z.string().optional(),
})

const updateCategorySchema = z.object({
  name: z.string().min(1).max(50).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  icon: z.string().nullable().optional(),
})

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function getCategories() {
  const user = await getAuthUser()

  return prisma.category.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}

export async function createCategory(input: z.infer<typeof createCategorySchema>) {
  const user = await getAuthUser()
  const validated = createCategorySchema.parse(input)

  const category = await prisma.category.create({
    data: {
      name: validated.name,
      color: validated.color,
      icon: validated.icon || null,
      userId: user.id,
    },
  })

  revalidatePath('/dashboard')
  return category
}

export async function updateCategory(id: string, input: z.infer<typeof updateCategorySchema>) {
  const user = await getAuthUser()
  const validated = updateCategorySchema.parse(input)

  const category = await prisma.category.update({
    where: {
      id,
      userId: user.id,
    },
    data: validated,
  })

  revalidatePath('/dashboard')
  return category
}

export async function deleteCategory(id: string) {
  const user = await getAuthUser()

  await prisma.category.delete({
    where: {
      id,
      userId: user.id,
    },
  })

  revalidatePath('/dashboard')
}
