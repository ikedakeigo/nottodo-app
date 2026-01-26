'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  useTemplate,
} from '@/actions/template'
import type { CreateTemplateInput, UpdateTemplateInput } from '@/types'

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: () => getTemplates(),
  })
}

export function useCreateTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateTemplateInput) => createTemplate(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTemplateInput }) =>
      updateTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })
}

export function useUseTemplate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, date }: { id: string; date: string }) =>
      useTemplate(id, date),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notTodos', variables.date] })
      queryClient.invalidateQueries({ queryKey: ['templates'] })
    },
  })
}
