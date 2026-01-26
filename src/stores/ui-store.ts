import { create } from 'zustand'

interface UIState {
  selectedDate: Date
  isFormOpen: boolean
  editingId: string | null
  setSelectedDate: (date: Date) => void
  openForm: () => void
  closeForm: () => void
  setEditingId: (id: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  selectedDate: new Date(),
  isFormOpen: false,
  editingId: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  openForm: () => set({ isFormOpen: true }),
  closeForm: () => set({ isFormOpen: false, editingId: null }),
  setEditingId: (id) => set({ editingId: id, isFormOpen: true }),
}))
