import { CheckCircle2 } from 'lucide-react'

export function NotToDoEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium text-muted-foreground">
        NotToDoがありません
      </h3>
      <p className="text-sm text-muted-foreground/80 mt-1">
        今日やらないことを追加しましょう
      </p>
    </div>
  )
}
