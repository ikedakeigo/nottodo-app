'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MobileNavProgress } from './mobile-nav-progress'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Menu,
  Home,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Ban,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'ダッシュボード', icon: Home, color: '#0079bf' },
  { href: '/dashboard/history', label: '履歴', icon: Calendar, color: '#61bd4f' },
  { href: '/dashboard/templates', label: 'テンプレート', icon: FileText, color: '#ff9f1a' },
  { href: '/dashboard/stats', label: '統計', icon: BarChart3, color: '#c377e0' },
  { href: '/dashboard/settings', label: '設定', icon: Settings, color: '#5e6c84' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/20 h-8 w-8"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-[#026aa7] border-0">
        <SheetHeader className="p-4 border-b border-white/10">
          <SheetTitle className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-1.5 rounded">
              <Ban className="h-5 w-5" />
            </div>
            <span className="font-bold">NotToDo</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/25 text-white shadow-sm'
                    : 'text-white/80 hover:bg-white/15 hover:text-white'
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                    isActive ? '' : 'bg-white/10'
                  )}
                  style={{ backgroundColor: isActive ? item.color : undefined }}
                >
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="flex-1">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Progress Section */}
        <MobileNavProgress onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
