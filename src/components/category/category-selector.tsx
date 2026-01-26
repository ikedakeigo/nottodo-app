'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCategories } from '@/hooks/use-categories'
import type { Category } from '@/types'

interface CategorySelectorProps {
  value?: string
  onChange: (value: string | undefined) => void
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  const { data: categories, isLoading } = useCategories()

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="読み込み中..." />
        </SelectTrigger>
      </Select>
    )
  }

  return (
    <Select
      value={value || 'none'}
      onValueChange={(val) => onChange(val === 'none' ? undefined : val)}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="カテゴリ" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">カテゴリなし</SelectItem>
        {categories?.map((category: Category) => (
          <SelectItem key={category.id} value={category.id}>
            <span className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
