import { create } from 'zustand'
import type { Priority } from '@/types'

type StatusFilter = 'all' | 'completed' | 'active'
type DueDateFilter = 'all' | 'overdue' | 'today' | 'this_week' | 'no_due'
type SortBy = 'createdAt' | 'dueDate' | 'priority'

interface FilterState {
  categoryFilter: string | null
  statusFilter: StatusFilter
  priorityFilter: Priority | null
  dueDateFilter: DueDateFilter
  sortBy: SortBy
  setCategoryFilter: (categoryId: string | null) => void
  setStatusFilter: (status: StatusFilter) => void
  setPriorityFilter: (priority: Priority | null) => void
  setDueDateFilter: (filter: DueDateFilter) => void
  setSortBy: (sort: SortBy) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  categoryFilter: null,
  statusFilter: 'all',
  priorityFilter: null,
  dueDateFilter: 'all',
  sortBy: 'createdAt',
  setCategoryFilter: (categoryId) => set({ categoryFilter: categoryId }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
  setDueDateFilter: (filter) => set({ dueDateFilter: filter }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () => set({
    categoryFilter: null,
    statusFilter: 'all',
    priorityFilter: null,
    dueDateFilter: 'all',
    sortBy: 'createdAt',
  }),
}))
