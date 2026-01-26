'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { CategoryBadge } from '@/components/category/category-badge'
import { useToggleNotTodo, useDeleteNotTodo } from '@/hooks/use-not-todos'
import type { NotTodoWithCategory } from '@/types'
import { Trash2, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NotToDoItemProps {
  notTodo: NotTodoWithCategory
  onEdit?: (id: string) => void
}

export function NotToDoItem({ notTodo, onEdit }: NotToDoItemProps) {
  const { mutate: toggle } = useToggleNotTodo()
  const { mutate: deleteNotTodo } = useDeleteNotTodo()

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <Checkbox
        checked={notTodo.isCompleted}
        onCheckedChange={() => toggle(notTodo.id)}
      />
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm truncate',
            notTodo.isCompleted && 'line-through text-muted-foreground'
          )}
        >
          {notTodo.title}
        </p>
      </div>
      {notTodo.category && (
        <CategoryBadge category={notTodo.category} />
      )}
      <div className="flex gap-1">
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(notTodo.id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteNotTodo(notTodo.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  )
}
