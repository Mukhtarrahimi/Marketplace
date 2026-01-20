"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Heart, Bell, Headset, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchBarSection from "@/components/site/SearchBarSection";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const BRAND = "#1f49ff";
const BRAND_HOVER = "#1738cc";

export default function Navbar() {
  // فعلاً دیتایی نداری → لاگین نیست
  const isLoggedIn = false;
  const notificationsCount = 0;

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header dir="rtl" className="w-full bg-white">
      <nav className="w-full border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* Right */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={42}
                height={42}
                priority
                className="object-contain"
                style={{ filter: "contrast(1.15) saturate(1.05)" }}
              />
            </Link>

            <div className="hidden items-center text-sm md:flex" style={{ gap: "26px" }}>
              <Link
                href="/"
                className="font-medium text-slate-700 transition hover:text-[var(--brand)]"
                style={{ ["--brand" as any]: BRAND }}
              >
                خانه
              </Link>
              <Link
                href="/products"
                className="font-medium text-slate-700 transition hover:text-[var(--brand)]"
                style={{ ["--brand" as any]: BRAND }}
              >
                آگهی‌ها
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 font-medium text-slate-700 transition hover:text-[var(--brand)]"
                style={{ ["--brand" as any]: BRAND }}
              >
                <Headset className="h-4 w-4" />
                پشتیبانی
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-medium text-slate-700 transition hover:text-[var(--brand)]"
                style={{ ["--brand" as any]: BRAND }}
              >
                <Phone className="h-4 w-4" />
                تماس با ما
              </Link>
            </div>
          </div>

          {/* Left */}
          <div className="hidden items-center gap-2 md:flex">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button
                    className="h-10 rounded-md px-4 text-sm"
                    style={{ backgroundColor: BRAND }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_HOVER)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
                  >
                    ورود / ثبت‌نام
                  </Button>
                </Link>

                <IconButton href="/favorites" label="علاقه‌مندی‌ها">
                  <Heart className="h-5 w-5" />
                </IconButton>

                <IconButton href="/notifications" label="نوتیفیکیشن">
                  <Bell className="h-5 w-5" />
                  <Badge count={notificationsCount} brand={BRAND} />
                </IconButton>
              </>
            ) : (
              <Link
                href="/profile"
                className="group inline-flex items-center justify-center rounded-md border bg-white p-1 transition hover:bg-slate-50"
                aria-label="پروفایل"
                title="پروفایل"
              >
                <span
                  className="relative h-10 w-10 overflow-hidden rounded-md border bg-slate-100"
                  style={{ boxShadow: "0 0 0 3px rgba(31,73,255,0.12)" }}
                >
                  {/* بعداً وقتی دیتای پروفایل داشتی از آن بخوان */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/avatar.jpg"
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </span>
              </Link>
            )}
          </div>

          {/* Mobile */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="منو"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mx-auto mt-3 max-w-7xl border-t pt-3 md:hidden">
            <div className="flex flex-col gap-2">
              <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                خانه
              </Link>
              <Link href="/products" className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                آگهی‌ها
              </Link>
              <Link href="/support" className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                پشتیبانی
              </Link>
              <Link href="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                تماس با ما
              </Link>

              {!isLoggedIn ? (
                <div className="mt-2 flex items-center gap-2">
                  <Link href="/login" className="flex-1">
                    <Button className="h-10 w-full rounded-md text-sm" style={{ backgroundColor: BRAND }}>
                      ورود / ثبت‌نام
                    </Button>
                  </Link>

                  <IconButton href="/favorites" label="علاقه‌مندی‌ها">
                    <Heart className="h-5 w-5" />
                  </IconButton>

                  <IconButton href="/notifications" label="نوتیفیکیشن">
                    <Bell className="h-5 w-5" />
                    <Badge count={notificationsCount} brand={BRAND} />
                  </IconButton>
                </div>
              ) : (
                <Link
                  href="/profile"
                  className="mt-2 flex items-center justify-between rounded-md border bg-white p-2 hover:bg-slate-50"
                >
                  <span className="text-sm text-slate-700">پروفایل</span>
                  <span className="h-10 w-10 overflow-hidden rounded-md border bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/avatar.jpg" alt="avatar" className="h-full w-full object-cover" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Search Section (کامپوننت جدا) */}
      <SearchBarSection />
    </header>
  );
}

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white text-slate-700",
        "transition hover:bg-slate-50"
      )}
      aria-label={label}
      title={label}
    >
      {children}
    </Link>
  );
}

function Badge({ count, brand }: { count: number; brand: string }) {
  return (
    <span
      className="absolute -left-2 -top-2 min-w-[18px] rounded-full px-1 text-center text-[11px] font-semibold leading-5 text-white shadow-sm"
      style={{ backgroundColor: brand }}
    >
      {count}
    </span>
  );
}
