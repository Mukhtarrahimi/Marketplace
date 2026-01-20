"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, LayoutGrid } from "lucide-react";

const BRAND = "#1f49ff";

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
  "کرخ/سرخ‌رود",
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

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchBarSection() {
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
    <div className="w-full bg-white px-4 pb-5 pt-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 rounded-md border bg-white p-3 shadow-sm md:flex-row md:items-center">
          {/* Search (بزرگ‌تر) */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="جستجوی محصول، شهر، دسته‌بندی..."
              className="h-11 rounded-sm pr-10 text-base"
            />
          </div>

          {/* Province */}
          <div className="relative w-full md:w-[210px]">
            <button
              type="button"
              onClick={() => {
                setCategoryOpen(false);
                setProvinceOpen((s) => !s);
              }}
              className={cn(
                "flex h-11 w-full items-center justify-between rounded-sm border bg-white px-3 text-sm font-medium text-slate-700",
                "transition hover:bg-slate-50"
              )}
            >
              <span className="flex items-center gap-2 truncate">
                <MapPin className="h-4 w-4 text-slate-500" />
                {selectedProvince}
              </span>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND }} />
            </button>

            {provinceOpen && (
              <>
                <button
                  aria-label="close"
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={closeAllDropdowns}
                />
                <div className="absolute right-0 top-[50px] z-20 w-full rounded-md border bg-white p-2 shadow-lg">
                  <Input
                    value={provinceQuery}
                    onChange={(e) => setProvinceQuery(e.target.value)}
                    placeholder="جستجوی ولایت..."
                    className="h-10 rounded-sm"
                    autoFocus
                  />
                  <div className="mt-2 max-h-64 overflow-auto rounded-sm">
                    {filteredProvinces.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setSelectedProvince(p);
                          setProvinceOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
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
          <div className="relative w-full md:w-[250px]">
            <button
              type="button"
              onClick={() => {
                setProvinceOpen(false);
                setCategoryOpen((s) => !s);
              }}
              className={cn(
                "flex h-11 w-full items-center justify-between rounded-sm border bg-white px-3 text-sm font-medium text-slate-700",
                "transition hover:bg-slate-50"
              )}
            >
              <span className="flex items-center gap-2 truncate">
                <LayoutGrid className="h-4 w-4 text-slate-500" />
                {selectedCategory}
              </span>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND }} />
            </button>

            {categoryOpen && (
              <>
                <button
                  aria-label="close"
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={closeAllDropdowns}
                />
                <div className="absolute right-0 top-[50px] z-20 w-full rounded-md border bg-white p-2 shadow-lg">
                  <Input
                    value={categoryQuery}
                    onChange={(e) => setCategoryQuery(e.target.value)}
                    placeholder="جستجوی کتگوری..."
                    className="h-10 rounded-sm"
                    autoFocus
                  />
                  <div className="mt-2 max-h-64 overflow-auto rounded-sm">
                    {filteredCategories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(c);
                          setCategoryOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
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
            <Button className="h-11 w-full rounded-sm px-6 md:w-auto cursor-pointer" style={{ backgroundColor: BRAND }}>
              جستجو
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
