'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SidebarProgress } from './sidebar-progress'
import {
  Home,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'ダッシュボード', icon: Home, color: '#0079bf' },
  { href: '/dashboard/history', label: '履歴', icon: Calendar, color: '#61bd4f' },
  { href: '/dashboard/templates', label: 'テンプレート', icon: FileText, color: '#ff9f1a' },
  { href: '/dashboard/stats', label: '統計', icon: BarChart3, color: '#c377e0' },
  { href: '/dashboard/settings', label: '設定', icon: Settings, color: '#5e6c84' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col bg-[#026aa7] min-h-[calc(100vh-48px)]">
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-white/25 text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/15 hover:text-white'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                  isActive ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/15'
                )}
                style={{ backgroundColor: isActive ? item.color : undefined }}
              >
                <item.icon className="h-4 w-4" />
              </div>
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="h-4 w-4 opacity-70" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section - Progress */}
      <SidebarProgress />
    </aside>
  )
}
