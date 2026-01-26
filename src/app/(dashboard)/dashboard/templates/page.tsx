'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TemplateList } from '@/components/template/template-list'
import { TemplateForm } from '@/components/template/template-form'
import { Plus } from 'lucide-react'

export default function TemplatesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">テンプレート</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新規作成
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>テンプレートを作成</DialogTitle>
            </DialogHeader>
            <TemplateForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>テンプレート一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <TemplateList />
        </CardContent>
      </Card>
    </div>
  )
}
