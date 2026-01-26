import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Ban, CheckCircle2, Target, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Ban className="h-6 w-6 text-primary" />
            <span>Not ToDo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">ログイン</Button>
            </Link>
            <Link href="/signup">
              <Button>新規登録</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            今日、何を<span className="text-primary">やらない</span>？
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            NotToDoは、「やらないこと」を明確にして、
            本当に重要なことに集中するためのアプリです。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                無料で始める
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                ログイン
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            なぜ「やらないこと」を決めるのか？
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">集中力の向上</h3>
              <p className="text-muted-foreground">
                やらないことを決めることで、本当に重要なタスクに集中できます。
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">習慣の改善</h3>
              <p className="text-muted-foreground">
                毎日の誘惑を可視化し、自己管理能力を向上させます。
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">達成率の記録</h3>
              <p className="text-muted-foreground">
                日々の達成率を記録し、成長を実感できます。
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 border-t">
        <p className="text-center text-muted-foreground text-sm">
          &copy; 2024 Not ToDo. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
