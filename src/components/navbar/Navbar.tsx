"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Heart, Bell, Headset, ChevronDown, LogOut, PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/data/users";

type UserLike = {
  name?: string;
  avatar?: string;
  isLoggedIn?: boolean;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Brand (کمی ملایم‌تر از #0732fe)
const BRAND = "#1d4ed8"; // آبی ملایم‌تر
const BRAND_SOFT = "rgba(29, 78, 216, 0.10)";

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
  "کرخ/سرخ‌رود (اگر لازم است حذف کنید)",
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
  const user = (currentUser as UserLike | null) ?? null;
  const isLoggedIn = Boolean(user?.isLoggedIn || (user?.avatar && user?.name));

  const [mobileOpen, setMobileOpen] = useState(false);

  // search section
  const [searchValue, setSearchValue] = useState("");
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [provinceQuery, setProvinceQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("ولایت");
  const [selectedCategory, setSelectedCategory] = useState<string>("کتگوری");

  // user menu
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notificationsCount = 0;

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
    setUserMenuOpen(false);
  };

  return (
    <header dir="rtl" className="w-full bg-white">
      {/* TOP NAV */}
      <nav className="w-full border-b bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* RIGHT: Logo + Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              {/* اگر webp روی بک‌گراند سفید دیده نمی‌شود، یا فایل شفاف نیست یا رنگش نزدیک به سفید است.
                  اینجا کیفیت/نمایش بهتر: priority + sizes + object-contain + style */}
              <Image
                src="/images/logo.webp"
                alt="Logo"
                width={44}
                height={44}
                priority
                sizes="44px"
                className="object-contain"
                style={{
                  filter: "contrast(1.15) saturate(1.1)",
                }}
              />
            </Link>

            <div className="hidden items-center text-sm md:flex" style={{ gap: "28px" }}>
              <Link
                href="/"
                className="font-medium text-slate-700 transition"
                style={{ color: undefined }}
              >
                خانه
              </Link>
              <Link
                href="/products"
                className="font-medium text-slate-700 transition"
              >
                همه آگهی‌ها
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 font-medium text-slate-700 transition"
              >
                <Headset className="h-4 w-4" />
                پشتیبانی
              </Link>
            </div>
          </div>

          {/* LEFT: Auth / Icons / Avatar */}
          <div className="hidden items-center gap-3 md:flex">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button
                    className="rounded-xl px-4"
                    style={{ backgroundColor: BRAND }}
                  >
                    ثبت‌نام / ورود
                  </Button>
                </Link>

                <Link
                  href="/favorites"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white transition hover:bg-slate-50"
                  aria-label="علاقه‌مندی‌ها"
                >
                  <Heart className="h-5 w-5 text-slate-700" />
                </Link>

                <Link
                  href="/notifications"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white transition hover:bg-slate-50"
                  aria-label="نوتیفیکیشن"
                >
                  <Bell className="h-5 w-5 text-slate-700" />
                  <span
                    className="absolute -left-2 -top-2 min-w-[20px] rounded-full px-1 text-center text-[11px] font-semibold leading-5 text-white shadow-sm"
                    style={{ backgroundColor: BRAND }}
                  >
                    {notificationsCount}
                  </span>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* دکمه ثبت آگهی (مثل دیوار) */}
                <Link href="/new">
                  <Button
                    className="h-10 rounded-xl px-4"
                    style={{ backgroundColor: BRAND }}
                  >
                    <PlusCircle className="ml-2 h-4 w-4" />
                    ثبت آگهی
                  </Button>
                </Link>

                {/* فقط عکس پروفایل (بدون نام) + منوی جذاب */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setProvinceOpen(false);
                      setCategoryOpen(false);
                      setUserMenuOpen((s) => !s);
                    }}
                    className={cn(
                      "group flex items-center gap-2 rounded-2xl border bg-white p-1 transition",
                      "hover:bg-slate-50"
                    )}
                    aria-label="پروفایل"
                  >
                    <span
                      className="relative h-10 w-10 overflow-hidden rounded-2xl border bg-slate-100"
                      style={{
                        boxShadow: `0 0 0 4px ${BRAND_SOFT}`,
                      }}
                    >
                      {user?.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: BRAND }}
                        >
                          U
                        </div>
                      )}
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-500 transition group-hover:text-slate-700" />
                  </button>

                  {userMenuOpen && (
                    <>
                      <button
                        aria-label="close"
                        className="fixed inset-0 z-10 cursor-default"
                        onClick={() => closeAllDropdowns()}
                      />
                      <div className="absolute left-0 top-[52px] z-20 w-64 rounded-2xl border bg-white p-2 shadow-lg">
                        <div className="rounded-xl px-3 py-2">
                          <div className="text-sm font-semibold text-slate-800">
                            {user?.name ?? "حساب کاربری"}
                          </div>
                          <div className="mt-0.5 text-xs text-slate-500">
                            خوش آمدید 👋
                          </div>
                        </div>

                        <div className="my-2 h-px bg-slate-100" />

                        <Link
                          href="/profile"
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          پروفایل من
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: BRAND }}
                          />
                        </Link>

                        <Link
                          href="/my-ads"
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          آگهی‌های من
                          <span className="text-xs text-slate-400">›</span>
                        </Link>

                        <Link
                          href="/favorites"
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          علاقه‌مندی‌ها
                          <Heart className="h-4 w-4 text-slate-500" />
                        </Link>

                        <Link
                          href="/notifications"
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          نوتیفیکیشن‌ها
                          <span
                            className="min-w-[22px] rounded-full px-2 text-center text-[11px] font-semibold text-white"
                            style={{ backgroundColor: BRAND }}
                          >
                            {notificationsCount}
                          </span>
                        </Link>

                        <div className="my-2 h-px bg-slate-100" />

                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          onClick={() => {
                            // اینجا لاجیک خروج را خودت وصل کن
                            setUserMenuOpen(false);
                          }}
                        >
                          خروج
                          <LogOut className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="منو"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mx-auto mt-3 flex max-w-7xl flex-col gap-3 border-t pt-3 md:hidden">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm font-medium text-slate-700">
                خانه
              </Link>
              <Link href="/products" className="text-sm font-medium text-slate-700">
                همه آگهی‌ها
              </Link>
              <Link href="/support" className="text-sm font-medium text-slate-700">
                پشتیبانی
              </Link>
            </div>

            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/login" className="flex-1">
                  <Button
                    className="w-full rounded-xl"
                    style={{ backgroundColor: BRAND }}
                  >
                    ثبت‌نام / ورود
                  </Button>
                </Link>

                <Link
                  href="/favorites"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white"
                  aria-label="علاقه‌مندی‌ها"
                >
                  <Heart className="h-5 w-5 text-slate-700" />
                </Link>

                <Link
                  href="/notifications"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white"
                  aria-label="نوتیفیکیشن"
                >
                  <Bell className="h-5 w-5 text-slate-700" />
                  <span
                    className="absolute -left-2 -top-2 min-w-[20px] rounded-full px-1 text-center text-[11px] font-semibold leading-5 text-white shadow-sm"
                    style={{ backgroundColor: BRAND }}
                  >
                    {notificationsCount}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/new" className="flex-1">
                  <Button
                    className="w-full rounded-xl"
                    style={{ backgroundColor: BRAND }}
                  >
                    <PlusCircle className="ml-2 h-4 w-4" />
                    ثبت آگهی
                  </Button>
                </Link>
                <Link
                  href="/profile"
                  className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border bg-slate-100"
                  aria-label="پروفایل"
                >
                  {user?.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: BRAND }}
                    >
                      U
                    </div>
                  )}
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* SEARCH BAR SECTION (under navbar) */}
      <div className="w-full bg-white px-4 pb-5 pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 rounded-2xl border bg-white p-3 shadow-sm md:flex-row md:items-center">
            {/* Main search - bigger */}
            <div className="flex-1">
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="جستجوی محصول، شهر، دسته‌بندی..."
                className="h-12 rounded-xl text-base"
              />
            </div>

            {/* Province */}
            <div className="relative w-full md:w-[220px]">
              <button
                type="button"
                onClick={() => {
                  setCategoryOpen(false);
                  setUserMenuOpen(false);
                  setProvinceOpen((s) => !s);
                }}
                className="flex h-12 w-full items-center justify-between rounded-xl border bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
                  <div className="absolute right-0 top-[54px] z-20 w-full rounded-2xl border bg-white p-2 shadow-lg">
                    <Input
                      value={provinceQuery}
                      onChange={(e) => setProvinceQuery(e.target.value)}
                      placeholder="جستجوی ولایت..."
                      className="h-10 rounded-xl"
                      autoFocus
                    />
                    <div className="mt-2 max-h-64 overflow-auto rounded-xl">
                      {filteredProvinces.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            setSelectedProvince(p);
                            setProvinceOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
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

            {/* Category */}
            <div className="relative w-full md:w-[280px]">
              <button
                type="button"
                onClick={() => {
                  setProvinceOpen(false);
                  setUserMenuOpen(false);
                  setCategoryOpen((s) => !s);
                }}
                className="flex h-12 w-full items-center justify-between rounded-xl border bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
                  <div className="absolute right-0 top-[54px] z-20 w-full rounded-2xl border bg-white p-2 shadow-lg">
                    <Input
                      value={categoryQuery}
                      onChange={(e) => setCategoryQuery(e.target.value)}
                      placeholder="جستجوی کتگوری..."
                      className="h-10 rounded-xl"
                      autoFocus
                    />
                    <div className="mt-2 max-h-64 overflow-auto rounded-xl">
                      {filteredCategories.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(c);
                            setCategoryOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
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
              <Button
                className="h-12 w-full rounded-xl px-6 md:w-auto"
                style={{ backgroundColor: BRAND }}
                onClick={() => {
                  // router.push(...)
                }}
              >
                جستجو
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
