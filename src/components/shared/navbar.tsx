"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"
import { Heart, Bell, Plus, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * موقتاً برای فرانت:
 * بعداً این را با next-auth / clerk / backend عوض می‌کنی.
 */
function useAuthMock() {
  const isAuthenticated = false; // TODO: وصل به auth واقعی
  const user = isAuthenticated ? { name: "Rahimi", avatarUrl: "" } : null;

  return { isAuthenticated, user };
}

const navLinks = [
  { label: "خانه", href: "/" },
  { label: "آگهی‌ها", href: "/ads" },
  { label: "درباره ما", href: "/about" },
  { label: "پشتیبانی", href: "/support" },
  { label: "رهنمایی", href: "/help" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthMock();

  const createAdHref = isAuthenticated ? "/panel/ads/new" : "/register";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Right side: Logo + nav */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Mix Bazar"
              width={42}
              height={42}
              priority
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    active ? "text-primary" : "text-foreground/80",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Left side: actions */}
        <div className="flex items-center gap-2">
          {/* Create Ad */}
          <Button asChild className="rounded-md">
            <Link href={createAdHref} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">ثبت آگهی</span>
            </Link>
          </Button>

          {/* Favorites */}
          <Button variant="ghost" size="icon" className="rounded-md">
            <Heart className="h-5 w-5" />
            <span className="sr-only">علاقه‌مندی‌ها</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-md">
            <Bell className="h-5 w-5" />
            <span className="sr-only">اعلان‌ها</span>
          </Button>

          {/* Auth / Profile */}
          {!isAuthenticated ? (
            <Button variant="outline" asChild className="rounded-md">
              <Link href="/login">ورود / ثبت نام</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "ml-1 inline-flex items-center justify-center rounded-full outline-none ring-primary transition",
                    "focus-visible:ring-2 focus-visible:ring-offset-2",
                  )}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user?.avatarUrl || ""}
                      alt={user?.name || "profile"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.slice(0, 1) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className={cn(
                  "w-56 rounded-md",
                  // انیمیشن نرم (Radix + shadcn)
                  "data-[state=open]:animate-in data-[state=closed]:animate-out",
                  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                  "data-[side=bottom]:slide-in-from-top-1",
                )}
              >
                <DropdownMenuLabel className="text-right">
                  حساب کاربری
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/panel">داشبورد</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/panel/profile">پروفایل</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/panel/settings">تنظیمات</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-md">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">منو</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle className="text-right">منو</SheetTitle>
                </SheetHeader>

                <nav className="mt-6 flex flex-col gap-2">
                  {navLinks.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/80 hover:bg-muted",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
