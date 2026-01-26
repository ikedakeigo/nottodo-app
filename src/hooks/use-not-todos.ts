'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import {
  createNotTodo,
  updateNotTodo,
  toggleNotTodo,
  deleteNotTodo,
  getNotTodosByDate,
} from '@/actions/not-todo'
import type { CreateNotTodoInput, UpdateNotTodoInput } from '@/types'

export function useNotTodos(date: Date) {
  const dateStr = format(date, 'yyyy-MM-dd')

  return useQuery({
    queryKey: ['notTodos', dateStr],
    queryFn: () => getNotTodosByDate(dateStr),
  })
}

export function useCreateNotTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateNotTodoInput) => createNotTodo(input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notTodos', variables.date] })
    },
  })
}

export function useUpdateNotTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNotTodoInput }) =>
      updateNotTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notTodos'] })
    },
  })
}

export function useToggleNotTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => toggleNotTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notTodos'] })
    },
  })
}

export function useDeleteNotTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteNotTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notTodos'] })
    },
  })
}
