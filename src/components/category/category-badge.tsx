import type { Category } from '@/types'
import {
  Briefcase,
  Home,
  Heart,
  Smartphone,
  Tag,
  Coffee,
  Book,
  Gamepad2,
  ShoppingCart,
  Dumbbell,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  home: Home,
  heart: Heart,
  smartphone: Smartphone,
  coffee: Coffee,
  book: Book,
  gamepad: Gamepad2,
  shopping: ShoppingCart,
  fitness: Dumbbell,
}

// Trello-style label colors with better contrast
const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#172b4d' : '#ffffff'
}

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const Icon = category.icon ? iconMap[category.icon] || Tag : Tag
  const textColor = category.color ? getContrastColor(category.color) : '#ffffff'

  return (
    <span
      className={`inline-flex items-center font-medium rounded transition-transform hover:scale-105 ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      }`}
      style={{
        backgroundColor: category.color || '#0079bf',
        color: textColor,
      }}
    >
      <Icon className={size === 'sm' ? 'mr-1.5 h-3 w-3' : 'mr-2 h-4 w-4'} />
      {category.name}
    </span>
  )
}
