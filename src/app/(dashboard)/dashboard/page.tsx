import { Suspense } from 'react'
import { NotToDoForm } from '@/components/not-todo/not-todo-form'
import { NotToDoList } from '@/components/not-todo/not-todo-list'
import { DatePicker } from '@/components/common/date-picker'
import { ProgressRing } from '@/components/stats/progress-ring'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">今日やらないこと</h1>
        <DatePicker />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Not ToDo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Suspense fallback={<LoadingSpinner />}>
              <NotToDoForm />
            </Suspense>
            <Suspense fallback={<LoadingSpinner />}>
              <NotToDoList />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今日の達成状況</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoadingSpinner />}>
              <ProgressRing />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
