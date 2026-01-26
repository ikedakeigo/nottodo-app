import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/sonner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">{children}</main>
        </div>
      </div>
      <Toaster />
    </QueryProvider>
  )
}
