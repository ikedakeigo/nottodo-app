import { Suspense } from 'react'
import { NotToDoForm } from '@/components/not-todo/not-todo-form'
import { NotToDoList } from '@/components/not-todo/not-todo-list'
import { DatePicker } from '@/components/common/date-picker'
import { ProgressRing } from '@/components/stats/progress-ring'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Ban, Target, TrendingUp } from 'lucide-react'

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 sm:pb-4 border-b border-border">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Ban className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground">今日やらないこと</h1>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">集中するために、やらないことを決めよう</p>
          </div>
        </div>
        <DatePicker />
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Main content - NotToDo List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-sm border-0 bg-card">
            <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-base font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Not ToDo リスト
                </CardTitle>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                  アクティブ
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
              <Suspense fallback={<LoadingSpinner />}>
                <NotToDoForm />
              </Suspense>
              <div className="border-t border-border/50 pt-3 sm:pt-4">
                <Suspense fallback={<LoadingSpinner />}>
                  <NotToDoList />
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Progress */}
        <div className="space-y-4">
          <Card className="shadow-sm border-0 bg-card">
            <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3 border-b border-border/50">
              <CardTitle className="text-sm sm:text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#61bd4f]" />
                今日の達成状況
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-3 sm:pt-4">
              <Suspense fallback={<LoadingSpinner />}>
                <ProgressRing />
              </Suspense>
            </CardContent>
          </Card>

          {/* Quick tips card - hidden on mobile */}
          <Card className="shadow-sm border-0 bg-linear-to-br from-[#0079bf]/5 to-[#00c2e0]/5 hidden sm:block">
            <CardContent className="p-3 sm:p-4">
              <h4 className="font-medium text-sm mb-2 text-foreground">💡 ヒント</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                やらないことを決めることで、本当に大切なことに集中できます。
                毎日3〜5個のNotToDoを設定するのがおすすめです。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
