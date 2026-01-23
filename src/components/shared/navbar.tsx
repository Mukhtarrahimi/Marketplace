"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Heart,
  Bell,
  Plus,
  Menu,
  MessageSquare,
  Home,
  User,
  LogOut,
  Globe,
  Info,
  LifeBuoy,
  BookOpen,
  LayoutGrid,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* Mock Auth */
function useAuthMock() {
  const isAuthenticated = false;
  const user = isAuthenticated ? { name: "Rahimi", avatarUrl: "" } : null;
  return { isAuthenticated, user };
}

/* Language  */
type Lang = "fa" | "ps" | "en";
function useLangMock() {
  const [lang, setLang] = React.useState<Lang>("fa");
  return { lang, setLang };
}

const desktopLinks = [
  { label: "خانه", href: "/" },
  { label: "آگهی‌ها", href: "/ads" },
  { label: "درباره ما", href: "/about" },
  { label: "پشتیبانی", href: "/support" },
  { label: "رهنمایی", href: "/help" },
];

/* Drawer Links for mobile */
const drawerLinks = [
  { label: "خانه", href: "/", icon: Home },
  { label: "آگهی‌ها", href: "/ads", icon: LayoutGrid },
  { label: "چت", href: "/messages", icon: MessageSquare },
  { label: "اعلانات", href: "/notifications", icon: Bell },
  { label: "پروفایل", href: "/panel/profile", icon: User },
  { label: "درباره ما", href: "/about", icon: Info },
  { label: "پشتیبانی", href: "/support", icon: LifeBuoy },
  { label: "رهنمایی", href: "/help", icon: BookOpen },
];

// for label when cursor in that show
function DesktopIconWithTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
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
  );
}

function LangLabel(lang: Lang) {
  if (lang === "fa") return "فارسی";
  if (lang === "ps") return "پشتو";
  return "English";
}

export function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthMock();
  const { lang, setLang } = useLangMock();

  const createAdHref = isAuthenticated ? "/panel/ads/new" : "/register";

  return (
    <>
      {/*  TOP NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/*  Right */}
          <div className="flex items-center gap-6">
            {/* Logo */}
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

            {/*  Language*/}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "hidden md:inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm",
                    "transition hover:bg-muted",
                  )}
                  aria-label="انتخاب زبان"
                >
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="font-medium">{LangLabel(lang)}</span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-40 rounded-md">
                <DropdownMenuItem onClick={() => setLang("fa")}>
                  فارسی
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("ps")}>
                  پشتو
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLang("en")}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop links */}
            <nav className="hidden items-center gap-6 md:flex">
              {desktopLinks.map((item) => {
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

          {/* Left*/}
          <div className="flex items-center gap-2">
            {/* Create Ad - desktop */}
            <Button asChild className="hidden rounded-md md:inline-flex">
              <Link href={createAdHref} className="gap-2">
                <Plus className="h-4 w-4" />
                ثبت آگهی
              </Link>
            </Button>

            {/* Desktop tooltips (only desktop) */}
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
                  <AvatarImage
                    src={user?.avatarUrl || ""}
                    alt={user?.name || "profile"}
                  />
                  <AvatarFallback className="bg-primary text-white">
                    {user?.name?.slice(0, 1) ?? "U"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>

            {/* Mobile hamburger + sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white",
                      "active:scale-[0.98]",
                    )}
                    aria-label="منو"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-[300px] p-0 flex flex-col h-dvh"
                >
                  {/* Top */}
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

                  {/*  Profile center */}
                  <div className="flex flex-col items-center justify-center px-6 py-1 text-center">
                    <Avatar className="h-16 w-16 rounded-full">
                      <AvatarImage src={user?.avatarUrl || ""} />
                      <AvatarFallback className="bg-primary text-white">
                        {isAuthenticated ? user?.name?.[0] : "G"}
                      </AvatarFallback>
                    </Avatar>

                    <p className="mt-3 text-sm font-bold">
                      {isAuthenticated ? user?.name : "کاربر مهمان"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      خوش آمدید
                    </p>
                  </div>

                  {/*  Language switch */}
                  <div className="px-5 pb-4">
                    <div className="flex items-center justify-between rounded-md border px-3 py-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="font-medium">زبان</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <button
                          onClick={() => setLang("fa")}
                          className={cn(
                            "px-2 py-1 rounded-md border",
                            lang === "fa" && "border-primary text-primary",
                          )}
                        >
                          FA
                        </button>

                        <button
                          onClick={() => setLang("ps")}
                          className={cn(
                            "px-2 py-1 rounded-md border",
                            lang === "ps" && "border-primary text-primary",
                          )}
                        >
                          PS
                        </button>

                        <button
                          onClick={() => setLang("en")}
                          className={cn(
                            "px-2 py-1 rounded-md border",
                            lang === "en" && "border-primary text-primary",
                          )}
                        >
                          EN
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Divider*/}
                  <div className="mx-6 border-t border-gray-200/70" />

                  {/* Links*/}
                  <nav className="flex-1 overflow-y-auto flex flex-col gap-1 px-3 py-4">
                    {drawerLinks.map((item) => {
                      const Icon = item.icon;
                      const active = pathname === item.href;

                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-3 text-sm",
                              active ? "text-primary" : "",
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </Link>
                        </SheetClose>
                      );
                    })}

                    {/* login/logout */}
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

      {/*  BOTTOM NAV (Mobile Only) */}
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
  );
}
