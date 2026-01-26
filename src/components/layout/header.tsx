import Link from 'next/link'
import { UserMenu } from './user-menu'
import { MobileNav } from './mobile-nav'
import { Ban, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-linear-to-r from-[#0079bf] to-[#026aa7] shadow-md">
      <div className="flex h-12 items-center px-3 sm:px-4 gap-2 sm:gap-4">
        {/* Mobile menu */}
        <MobileNav />

        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 sm:gap-2 font-bold text-white hover:opacity-90 transition-opacity"
        >
          <div className="bg-white/20 p-1 sm:p-1.5 rounded">
            <Ban className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <span className="text-base sm:text-lg tracking-tight">NotToDo</span>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/90 hover:bg-white/20 hover:text-white h-8 w-8 hidden sm:flex"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
