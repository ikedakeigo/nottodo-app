import type { Category } from '@/types'
import {
  Briefcase,
  Home,
  Heart,
  Smartphone,
  Tag,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  home: Home,
  heart: Heart,
  smartphone: Smartphone,
}

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const Icon = category.icon ? iconMap[category.icon] || Tag : Tag

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
      }}
    >
      <Icon className={size === 'sm' ? 'mr-1 h-3 w-3' : 'mr-1.5 h-4 w-4'} />
      {category.name}
    </span>
  )
}
