import { create } from 'zustand'

type StatusFilter = 'all' | 'completed' | 'active'

interface FilterState {
  categoryFilter: string | null
  statusFilter: StatusFilter
  setCategoryFilter: (categoryId: string | null) => void
  setStatusFilter: (status: StatusFilter) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  categoryFilter: null,
  statusFilter: 'all',
  setCategoryFilter: (categoryId) => set({ categoryFilter: categoryId }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  resetFilters: () => set({ categoryFilter: null, statusFilter: 'all' }),
}))
