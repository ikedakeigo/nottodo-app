// Priority types
export type Priority = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH'

export const PRIORITY_CONFIG = {
  NONE: { label: 'なし', color: '#9CA3AF', order: 0 },
  LOW: { label: '低', color: '#10B981', order: 1 },
  MEDIUM: { label: '中', color: '#F59E0B', order: 2 },
  HIGH: { label: '高', color: '#EF4444', order: 3 },
} as const

// Database model types
export interface User {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
}

export interface NotTodo {
  id: string
  title: string
  isCompleted: boolean
  date: Date
  dueDate: Date | null
  priority: Priority
  userId: string
  categoryId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string | null
  savedMinutes?: number
  userId: string
  createdAt: Date
}

export interface Template {
  id: string
  title: string
  usageCount: number
  userId: string
  categoryId: string | null
  createdAt: Date
}

// Extended types with relations
export type NotTodoWithCategory = NotTodo & {
  category: Category | null
}

export type TemplateWithCategory = Template & {
  category: Category | null
}

// Stats types
export interface DailyStats {
  date: string
  totalCount: number
  completedCount: number
  completionRate: number
}

// Input types
export interface CreateNotTodoInput {
  title: string
  date: string
  categoryId?: string
  dueDate?: string
  priority?: Priority
}

export interface UpdateNotTodoInput {
  title?: string
  isCompleted?: boolean
  categoryId?: string | null
  dueDate?: string | null
  priority?: Priority
}

export interface CreateCategoryInput {
  name: string
  color: string
  icon?: string
  savedMinutes?: number
}

export interface UpdateCategoryInput {
  name?: string
  color?: string
  icon?: string | null
  savedMinutes?: number
}

export interface CreateTemplateInput {
  title: string
  categoryId?: string
}

export interface UpdateTemplateInput {
  title?: string
  categoryId?: string | null
}
