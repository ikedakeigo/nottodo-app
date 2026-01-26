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
}

export interface UpdateNotTodoInput {
  title?: string
  isCompleted?: boolean
  categoryId?: string | null
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
