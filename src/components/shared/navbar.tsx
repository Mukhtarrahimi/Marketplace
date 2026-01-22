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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/* ✅ Mock Auth */
function useAuthMock() {
  const isAuthenticated = false
  const user = isAuthenticated
    ? { name: "Rahimi", avatarUrl: "" }
    : null

  return { isAuthenticated, user }
}

/* ✅ Links */
const navLinks = [
  { label: "خانه", href: "/", icon: Home },
  { label: "اعلانات", href: "/notifications", icon: Bell },
  { label: "چت", href: "/messages", icon: MessageSquare },
  { label: "پروفایل", href: "/panel/profile", icon: User },
]

export function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuthMock()

  const createAdHref = isAuthenticated ? "/panel/ads/new" : "/register"

  return (
    <>
      {/* ✅ TOP NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image
                src="/images/logo.png"
                alt="Mix Bazar Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <span className="hidden text-base font-bold sm:inline">
              MIX BAZAR
            </span>
          </Link>

          {/* ✅ Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild className="rounded-md">
              <Link href={createAdHref}>
                <Plus className="h-4 w-4" />
                ثبت آگهی
              </Link>
            </Button>

            <Button size="icon" variant="ghost">
              <Heart className="h-5 w-5" />
            </Button>

            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>

            <Button size="icon" variant="ghost">
              <MessageSquare className="h-5 w-5" />
            </Button>

            {!isAuthenticated ? (
              <Button variant="outline" asChild>
                <Link href="/login">ورود / ثبت نام</Link>
              </Button>
            ) : (
              <Avatar className="h-9 w-9 cursor-pointer rounded-full">
                <AvatarImage src={user?.avatarUrl || ""} />
                <AvatarFallback>
                  {user?.name?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {/* ✅ Mobile Menu فقط لوگو + منو */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              {/* ✅ Drawer */}
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle className="text-right">
                    حساب کاربری
                  </SheetTitle>
                </SheetHeader>

                {/* ✅ Profile */}
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-12 w-12 rounded-full">
                    <AvatarImage src={user?.avatarUrl || ""} />
                    <AvatarFallback className="bg-primary text-white">
                      {isAuthenticated ? user?.name?.[0] : "G"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-bold">
                      {isAuthenticated ? user?.name : "کاربر مهمان"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      خوش آمدید 👋
                    </p>
                  </div>
                </div>

                {/* ✅ Menu Links */}
                <nav className="mt-8 flex flex-col gap-2">
                  {navLinks.map((item) => {
                    const Icon = item.icon
                    const active = pathname === item.href

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                          active
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>

                {/* ✅ Footer Action */}
                <div className="mt-10">
                  {isAuthenticated ? (
                    <Button variant="destructive" className="w-full">
                      <LogOut className="ml-2 h-4 w-4" />
                      خروج
                    </Button>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href="/login">ثبت نام / ورود</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ✅ BOTTOM NAV (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
        <div className="flex items-center justify-around py-2">
          {/* خانه */}
          <Link href="/" className="flex flex-col items-center text-xs">
            <Home className="h-5 w-5" />
            خانه
          </Link>

          {/* اعلان */}
          <Link
            href="/notifications"
            className="flex flex-col items-center text-xs"
          >
            <Bell className="h-5 w-5" />
            اعلانات
          </Link>

          {/* ✅ Create Ad وسط */}
          <Link
            href={createAdHref}
            className="flex h-14 w-14 -translate-y-6 items-center justify-center rounded-full bg-primary text-white shadow-lg"
          >
            <Plus className="h-7 w-7" />
          </Link>

          {/* چت */}
          <Link
            href="/messages"
            className="flex flex-col items-center text-xs"
          >
            <MessageSquare className="h-5 w-5" />
            چت
          </Link>

          {/* پروفایل */}
          <Link
            href={isAuthenticated ? "/panel/profile" : "/login"}
            className="flex flex-col items-center text-xs"
          >
            <User className="h-5 w-5" />
            پروفایل
          </Link>
        </div>
      </div>
    </>
  )
}
