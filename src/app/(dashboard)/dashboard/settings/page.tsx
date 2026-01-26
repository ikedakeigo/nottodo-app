'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCategories, useDeleteCategory } from '@/hooks/use-categories'
import { Loader2, Trash2 } from 'lucide-react'
import type { Category } from '@/types'

export default function SettingsPage() {
  const { data: categories, isLoading } = useCategories()
  const { mutate: deleteCategory } = useDeleteCategory()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">設定</h1>

      <Card>
        <CardHeader>
          <CardTitle>カテゴリ管理</CardTitle>
          <CardDescription>
            NotToDoを分類するためのカテゴリを管理します
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-2">
              {categories?.map((category: Category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>アカウント</CardTitle>
          <CardDescription>
            アカウント設定を管理します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            アカウント設定機能は今後追加予定です
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
