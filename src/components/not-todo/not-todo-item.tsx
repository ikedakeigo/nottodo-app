'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { CategoryBadge } from '@/components/category/category-badge'
import { PriorityBadge } from '@/components/not-todo/priority-badge'
import { DueDateBadge } from '@/components/not-todo/due-date-badge'
import { useToggleNotTodo, useDeleteNotTodo } from '@/hooks/use-not-todos'
import type { NotTodoWithCategory } from '@/types'
import { Trash2, Pencil, MoreHorizontal, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isPast, isToday } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NotToDoItemProps {
  notTodo: NotTodoWithCategory
  onEdit?: (id: string) => void
}

export function NotToDoItem({ notTodo, onEdit }: NotToDoItemProps) {
  const { mutate: toggle } = useToggleNotTodo()
  const { mutate: deleteNotTodo } = useDeleteNotTodo()

  const isOverdue = notTodo.dueDate && !notTodo.isCompleted && isPast(new Date(notTodo.dueDate)) && !isToday(new Date(notTodo.dueDate))

  return (
    <div
      className={cn(
        'group relative bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer',
        'border-l-4',
        isOverdue && 'bg-red-50 dark:bg-red-950/20',
        notTodo.isCompleted
          ? 'border-l-[#61bd4f] bg-[#61bd4f]/5'
          : notTodo.category?.color
            ? `border-l-[${notTodo.category.color}]`
            : 'border-l-[#0079bf]'
      )}
      style={{
        borderLeftColor: notTodo.isCompleted
          ? '#61bd4f'
          : notTodo.category?.color || '#0079bf',
      }}
    >
      <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4">
        {/* Checkbox */}
        <div className="pt-0.5 shrink-0">
          <Checkbox
            checked={notTodo.isCompleted}
            onCheckedChange={() => toggle(notTodo.id)}
            className={cn(
              'h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 transition-colors',
              notTodo.isCompleted
                ? 'bg-[#61bd4f] border-[#61bd4f] text-white'
                : 'border-muted-foreground/40 hover:border-primary'
            )}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
          <p
            className={cn(
              'text-xs sm:text-sm font-medium leading-relaxed wrap-break-word',
              notTodo.isCompleted && 'line-through text-muted-foreground'
            )}
          >
            {notTodo.title}
          </p>

          {/* Bottom row with badges */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {notTodo.category && (
              <CategoryBadge category={notTodo.category} />
            )}
            {notTodo.priority && notTodo.priority !== 'NONE' && (
              <PriorityBadge priority={notTodo.priority} />
            )}
            {notTodo.dueDate && (
              <DueDateBadge
                dueDate={new Date(notTodo.dueDate)}
                isCompleted={notTodo.isCompleted}
              />
            )}
            {notTodo.isCompleted && (
              <span className="inline-flex items-center gap-1 text-xs text-[#61bd4f] font-medium">
                <CheckCircle2 className="h-3 w-3" />
                <span className="hidden sm:inline">達成</span>
              </span>
            )}
          </div>
        </div>

        {/* Actions dropdown */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(notTodo.id)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  編集
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => deleteNotTodo(notTodo.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
