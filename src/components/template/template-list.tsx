'use client'

import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { CategoryBadge } from '@/components/category/category-badge'
import { useTemplates, useDeleteTemplate, useUseTemplate } from '@/hooks/use-templates'
import { Loader2, Trash2, Plus, FileText } from 'lucide-react'
import type { TemplateWithCategory } from '@/types'

export function TemplateList() {
  const { data: templates, isLoading } = useTemplates()
  const { mutate: deleteTemplate } = useDeleteTemplate()
  const { mutate: useTemplateAction, isPending } = useUseTemplate()

  const handleUse = (id: string) => {
    useTemplateAction({
      id,
      date: format(new Date(), 'yyyy-MM-dd'),
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!templates?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">
          テンプレートがありません
        </h3>
        <p className="text-sm text-muted-foreground/80 mt-1">
          よく使うNotToDoをテンプレートとして保存しましょう
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {templates.map((template: TemplateWithCategory) => (
        <div
          key={template.id}
          className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{template.title}</p>
            <p className="text-xs text-muted-foreground">
              使用回数: {template.usageCount}
            </p>
          </div>
          {template.category && (
            <CategoryBadge category={template.category} />
          )}
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUse(template.id)}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span className="ml-1">使用</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTemplate(template.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
