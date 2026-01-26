import { Ban, Plus } from 'lucide-react'

export function NotToDoEmpty() {
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
      <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
        <Plus className="h-4 w-4 mr-2" />
        NotToDoを追加
      </button>
    </div>
  )
}
