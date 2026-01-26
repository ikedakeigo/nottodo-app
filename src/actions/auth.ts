'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  // Prismaでユーザーレコード作成
  if (authData.user) {
    await prisma.user.create({
      data: {
        id: authData.user.id,
        email: authData.user.email!,
      },
    })

    // デフォルトカテゴリを作成
    await prisma.category.createMany({
      data: [
        { name: '仕事', color: '#3B82F6', icon: 'briefcase', userId: authData.user.id },
        { name: '私生活', color: '#10B981', icon: 'home', userId: authData.user.id },
        { name: '健康', color: '#F59E0B', icon: 'heart', userId: authData.user.id },
        { name: 'SNS', color: '#8B5CF6', icon: 'smartphone', userId: authData.user.id },
      ],
    })
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }
}
