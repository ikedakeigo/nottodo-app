import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Prismaでユーザーが存在するか確認
      const existingUser = await prisma.user.findUnique({
        where: { id: data.user.id },
      })

      // OAuthの場合、初回ログイン時にユーザーを作成
      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.full_name,
            avatarUrl: data.user.user_metadata?.avatar_url,
          },
        })

        // デフォルトカテゴリを作成
        await prisma.category.createMany({
          data: [
            { name: '仕事', color: '#3B82F6', icon: 'briefcase', userId: data.user.id },
            { name: '私生活', color: '#10B981', icon: 'home', userId: data.user.id },
            { name: '健康', color: '#F59E0B', icon: 'heart', userId: data.user.id },
            { name: 'SNS', color: '#8B5CF6', icon: 'smartphone', userId: data.user.id },
          ],
        })
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // エラー時はログインページにリダイレクト
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
}
