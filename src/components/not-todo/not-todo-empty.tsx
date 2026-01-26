'use client'

import { useState } from 'react'
import { Ban, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotToDoAddDialog } from './not-todo-add-dialog'

export function NotToDoEmpty() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Ban className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">
        NotToDoがありません
      </h3>
      <p className="text-sm text-muted-foreground max-w-[250px] mb-4">
        集中するために、今日やらないことを決めましょう
      </p>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        NotToDoを追加
      </Button>

      <NotToDoAddDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
