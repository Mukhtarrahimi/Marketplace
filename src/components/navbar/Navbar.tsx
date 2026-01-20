"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Heart, Bell, Headset, Phone, User } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// برند (ملایم، نزدیک به رنگ شما ولی تیز نیست)
const BRAND = "#1f49ff";
const BRAND_HOVER = "#1738cc";

const AFG_PROVINCES = [
  "کابل",
  "هرات",
  "بلخ",
  "قندهار",
  "ننگرهار",
  "بدخشان",
  "بغلان",
  "بامیان",
  "دایکندی",
  "فراه",
  "فاریاب",
  "غزنی",
  "غور",
  "هلمند",
  "جوزجان",
  "کاپیسا",
  "خوست",
  "کنر",
  "کندز",
  "لغمان",
  "لوگر",
  "نیمروز",
  "نورستان",
  "اروزگان",
  "پکتیا",
  "پکتیکا",
  "پنجشیر",
  "پروان",
  "سمنگان",
  "سرپل",
  "تخار",
  "وردک",
  "زابل",
].slice(0, 34);

const CATEGORIES = [
  "وسایل نقلیه",
  "املاک",
  "موبایل و تبلت",
  "کالای دیجیتال",
  "خانه و آشپزخانه",
  "لوازم شخصی",
  "سرگرمی و فراغت",
  "اجتماعی",
  "استخدام و کاریابی",
  "خدمات",
  "صنعتی و اداری",
  "پوشاک",
  "حیوانات",
  "آموزش",
  "سایر",
];

export default function Navbar() {
  // فعلاً هیچ دیتایی نداریم → حالت پیش‌فرض: لاگین نیست
  const isLoggedIn = false;

  const notificationsCount = 0;

  const [mobileOpen, setMobileOpen] = useState(false);

  // search section
  const [searchValue, setSearchValue] = useState("");
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [provinceQuery, setProvinceQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("ولایت");
  const [selectedCategory, setSelectedCategory] = useState<string>("کتگوری");

  const filteredProvinces = useMemo(() => {
    const q = provinceQuery.trim().toLowerCase();
    if (!q) return AFG_PROVINCES;
    return AFG_PROVINCES.filter((p) => p.toLowerCase().includes(q));
  }, [provinceQuery]);

  const filteredCategories = useMemo(() => {
    const q = categoryQuery.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter((c) => c.toLowerCase().includes(q));
  }, [categoryQuery]);

  const closeAllDropdowns = () => {
    setProvinceOpen(false);
    setCategoryOpen(false);
  };

  return (
    <header dir="rtl" className="w-full bg-white">
      {/* TOP NAV */}
      <nav className="w-full border-b bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* RIGHT: Logo + Desktop links */}
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

          {/* LEFT: Actions */}
          <div className="hidden items-center gap-2 md:flex">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button
                    className="h-10 rounded-lg px-4 text-sm"
                    style={{ backgroundColor: BRAND }}
                    onMouseEnter={(e) => ((e.currentTarget.style.backgroundColor = BRAND_HOVER))}
                    onMouseLeave={(e) => ((e.currentTarget.style.backgroundColor = BRAND))}
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
                className="group inline-flex items-center justify-center rounded-lg border bg-white p-1 transition hover:bg-slate-50"
                aria-label="پروفایل"
              >
                <span
                  className="relative h-10 w-10 overflow-hidden rounded-lg border bg-slate-100"
                  style={{ boxShadow: "0 0 0 3px rgba(31,73,255,0.12)" }}
                >
                  {/* وقتی دیتای پروفایل داشتی، این img را از دیتای واقعی بخوان */}
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

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-white"
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
              <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                خانه
              </Link>
              <Link href="/products" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                آگهی‌ها
              </Link>
              <Link href="/support" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                پشتیبانی
              </Link>
              <Link href="/contact" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                تماس با ما
              </Link>

              {!isLoggedIn ? (
                <div className="mt-2 flex items-center gap-2">
                  <Link href="/login" className="flex-1">
                    <Button className="h-10 w-full rounded-lg text-sm" style={{ backgroundColor: BRAND }}>
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
                  className="mt-2 flex items-center justify-between rounded-lg border bg-white p-2 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <User className="h-4 w-4" />
                    پروفایل
                  </div>
                  <span className="h-10 w-10 overflow-hidden rounded-lg border bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/avatar.jpg" alt="avatar" className="h-full w-full object-cover" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* SEARCH BAR */}
      <div className="w-full bg-white px-4 pb-5 pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 rounded-xl border bg-white p-3 shadow-sm md:flex-row md:items-center">
            {/* Main search (بزرگ‌تر) */}
            <div className="flex-1">
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="جستجوی محصول، شهر، دسته‌بندی..."
                className="h-11 rounded-lg text-base"
              />
            </div>

            {/* Province (کم‌تر از سرچ) */}
            <div className="relative w-full md:w-[210px]">
              <button
                type="button"
                onClick={() => {
                  setCategoryOpen(false);
                  setProvinceOpen((s) => !s);
                }}
                className="flex h-11 w-full items-center justify-between rounded-lg border bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <span className="truncate">{selectedProvince}</span>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND }} />
              </button>

              {provinceOpen && (
                <>
                  <button
                    aria-label="close"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => closeAllDropdowns()}
                  />
                  <div className="absolute right-0 top-[50px] z-20 w-full rounded-xl border bg-white p-2 shadow-lg">
                    <Input
                      value={provinceQuery}
                      onChange={(e) => setProvinceQuery(e.target.value)}
                      placeholder="جستجوی ولایت..."
                      className="h-10 rounded-lg"
                      autoFocus
                    />
                    <div className="mt-2 max-h-64 overflow-auto rounded-lg">
                      {filteredProvinces.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setSelectedProvince(p);
                            setProvinceOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <span>{p}</span>
                          {selectedProvince === p ? (
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND }} />
                          ) : null}
                        </button>
                      ))}
                      {filteredProvinces.length === 0 && (
                        <div className="px-3 py-4 text-sm text-slate-500">چیزی پیدا نشد</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Category (کمی بیشتر از ولایت) */}
            <div className="relative w-full md:w-[250px]">
              <button
                type="button"
                onClick={() => {
                  setProvinceOpen(false);
                  setCategoryOpen((s) => !s);
                }}
                className="flex h-11 w-full items-center justify-between rounded-lg border bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <span className="truncate">{selectedCategory}</span>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND }} />
              </button>

              {categoryOpen && (
                <>
                  <button
                    aria-label="close"
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => closeAllDropdowns()}
                  />
                  <div className="absolute right-0 top-[50px] z-20 w-full rounded-xl border bg-white p-2 shadow-lg">
                    <Input
                      value={categoryQuery}
                      onChange={(e) => setCategoryQuery(e.target.value)}
                      placeholder="جستجوی کتگوری..."
                      className="h-10 rounded-lg"
                      autoFocus
                    />
                    <div className="mt-2 max-h-64 overflow-auto rounded-lg">
                      {filteredCategories.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(c);
                            setCategoryOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <span>{c}</span>
                          {selectedCategory === c ? (
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND }} />
                          ) : null}
                        </button>
                      ))}
                      {filteredCategories.length === 0 && (
                        <div className="px-3 py-4 text-sm text-slate-500">چیزی پیدا نشد</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Search button */}
            <div className="w-full md:w-auto">
              <Button className="h-11 w-full rounded-lg px-6 md:w-auto" style={{ backgroundColor: BRAND }}>
                جستجو
              </Button>
            </div>
          </div>
        </div>
      </div>
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
        "relative inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-white text-slate-700",
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
