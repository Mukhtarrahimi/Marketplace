"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import {
  Heart,
  Bell,
  Plus,
  Menu,
  MessageSquare,
  Home,
  User,
  LogOut,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/** ✅ Mock Auth */
function useAuthMock() {
  const isAuthenticated = false
  const user = isAuthenticated ? { name: "Rahimi", avatarUrl: "" } : null
  return { isAuthenticated, user }
}

const desktopLinks = [
  { label: "خانه", href: "/" },
  { label: "آگهی‌ها", href: "/ads" },
  { label: "درباره ما", href: "/about" },
  { label: "پشتیبانی", href: "/support" },
  { label: "رهنمایی", href: "/help" },
]

const drawerLinks = [
  { label: "خانه", href: "/", icon: Home },
  { label: "آگهی‌ها", href: "/ads", icon: Home },
  { label: "چت", href: "/messages", icon: MessageSquare },
  { label: "اعلانات", href: "/notifications", icon: Bell },
  { label: "پروفایل", href: "/panel/profile", icon: User },
]

function DesktopIconWithTooltip({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <TooltipProvider delayDuration={120}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="hidden rounded-md px-2 py-1 text-[11px] md:block"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuthMock()

  const createAdHref = isAuthenticated ? "/panel/ads/new" : "/register"

  return (
    <>
      {/* ✅ TOP NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ✅ Right: Logo + links */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 overflow-hidden rounded-md">
                <Image
                  src="/images/logo.png"
                  alt="Mix Bazar"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              {desktopLinks.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      active ? "text-primary" : "text-foreground/80"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* ✅ Left: actions */}
          <div className="flex items-center gap-2">
            {/* Create Ad - desktop */}
            <Button asChild className="hidden rounded-md md:inline-flex">
              <Link href={createAdHref} className="gap-2">
                <Plus className="h-4 w-4" />
                ثبت آگهی
              </Link>
            </Button>

            {/* ✅ Desktop tooltips (only desktop) */}
            <DesktopIconWithTooltip label="علاقه‌مندی‌ها">
              <Button
                variant="ghost"
                size="icon"
                className="hidden rounded-md md:inline-flex"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </DesktopIconWithTooltip>

            <DesktopIconWithTooltip label="اعلانات">
              <Button
                variant="ghost"
                size="icon"
                className="hidden rounded-md md:inline-flex"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </DesktopIconWithTooltip>

            <DesktopIconWithTooltip label="چت">
              <Button
                variant="ghost"
                size="icon"
                className="hidden rounded-md md:inline-flex"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </DesktopIconWithTooltip>

            {/* Desktop auth/profile */}
            <div className="hidden md:block">
              {!isAuthenticated ? (
                <Button variant="outline" asChild className="rounded-md">
                  <Link href="/login">ورود / ثبت نام</Link>
                </Button>
              ) : (
                <Avatar className="h-9 w-9 cursor-pointer rounded-full">
                  <AvatarImage src={user?.avatarUrl || ""} alt={user?.name || "profile"} />
                  <AvatarFallback className="bg-primary text-white">
                    {user?.name?.slice(0, 1) ?? "U"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>

            {/* ✅ Mobile hamburger + sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white",
                      "active:scale-[0.98]"
                    )}
                    aria-label="منو"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>

                {/* ✅ make it scrollable */}
                <SheetContent side="right" className="w-[300px] p-0 flex flex-col h-dvh">
                  {/* ✅ Top: ONLY ONE X (right) */}
                  <div className="flex items-center justify-end border-b p-3">
                    <SheetClose asChild>
                      <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md"
                        aria-label="بستن"
                      >
                        ✕
                      </button>
                    </SheetClose>
                  </div>

                  {/* ✅ Profile center (moved UP) */}
                  <div className="flex flex-col items-center justify-center px-6 py-5 -mt-2 text-center">
                    <Avatar className="h-16 w-16 rounded-full">
                      <AvatarImage src={user?.avatarUrl || ""} />
                      <AvatarFallback className="bg-primary text-white">
                        {isAuthenticated ? user?.name?.[0] : "G"}
                      </AvatarFallback>
                    </Avatar>

                    <p className="mt-3 text-sm font-bold">
                      {isAuthenticated ? user?.name : "کاربر مهمان"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">خوش آمدید</p>
                  </div>

                  {/* ✅ Links: scroll if too many */}
                  <nav className="flex-1 overflow-y-auto flex flex-col gap-1 px-3 pb-4">
                    {drawerLinks.map((item) => {
                      const Icon = item.icon
                      const active = pathname === item.href
                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-3 text-sm",
                              active ? "text-primary" : ""
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </Link>
                        </SheetClose>
                      )
                    })}

                    {/* ✅ Last item: login/logout (NOT a button) */}
                    <div className="mt-2 border-t pt-2">
                      {isAuthenticated ? (
                        <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-destructive">
                          <LogOut className="h-5 w-5" />
                          خروج
                        </button>
                      ) : (
                        <SheetClose asChild>
                          <Link
                            href="/login"
                            className="flex items-center gap-3 rounded-md px-3 py-3 text-sm"
                          >
                            <User className="h-5 w-5" />
                            ثبت نام / ورود
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ BOTTOM NAV (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center text-[11px]">
            <Home className="h-5 w-5" />
            خانه
          </Link>

          <Link
            href="/notifications"
            className="flex flex-col items-center text-[11px]"
          >
            <Bell className="h-5 w-5" />
            اعلانات
          </Link>

          <Link
            href={createAdHref}
            className="flex h-14 w-14 -translate-y-6 items-center justify-center rounded-full bg-primary text-white shadow-lg"
            aria-label="ثبت آگهی"
          >
            <Plus className="h-7 w-7" />
          </Link>

          <Link
            href="/messages"
            className="flex flex-col items-center text-[11px]"
          >
            <MessageSquare className="h-5 w-5" />
            چت
          </Link>

          <Link
            href={isAuthenticated ? "/panel/profile" : "/login"}
            className="flex flex-col items-center text-[11px]"
          >
            <User className="h-5 w-5" />
            پروفایل
          </Link>
        </div>
      </div>
    </>
  )
}
