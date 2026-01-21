"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const BRAND = "#1f49ff";

export type HeroSlide = {
  id: string | number;
  title: string;
  desc?: string;
  imageUrl: string;
  href?: string;
  badge?: string;
};

const demoSlides: HeroSlide[] = [
  {
    id: 1,
    title: "خرید و فروش آسان در سراسر افغانستان",
    desc: "آگهی خود را ثبت کنید و به هزاران نفر نمایش دهید",
    imageUrl: "/images/slider/slide1.jpg",
    href: "/products",
    badge: "جدید",
  },
  {
    id: 2,
    title: "موتر، خانه، موبایل و بیشتر",
    desc: "همه چیز در یک جا، سریع و مطمئن",
    imageUrl: "/images/slider/slide2.jpg",
    href: "/products",
    badge: "پیشنهادی",
  },
  {
    id: 3,
    title: "آگهی خود را رایگان ثبت کنید",
    desc: "در کمتر از یک دقیقه آگهی بسازید",
    imageUrl: "/images/slider/slide3.jpg",
    href: "/new",
    badge: "سریع",
  },
  {
    id: 4,
    title: "بهترین پیشنهادات روز",
    desc: "فرصت‌ها را از دست ندهید",
    imageUrl: "/images/slider/slide4.jpg",
    href: "/products",
    badge: "ویژه",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HeroSlider({
  slides = demoSlides,
  autoPlayMs = 6500,
}: {
  slides?: HeroSlide[];
  autoPlayMs?: number;
}) {
  const safeSlides = useMemo(() => (slides?.length ? slides : demoSlides), [slides]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = () => setIndex((p) => (p + 1) % safeSlides.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, autoPlayMs);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, autoPlayMs, safeSlides.length]);

  useEffect(() => {
    if (index > safeSlides.length - 1) setIndex(0);
  }, [safeSlides.length, index]);

  return (
    <section
      dir="rtl"
      className="w-full bg-white px-4 pt-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* مثل Navbar فاصله دارد */}
      <div className="mx-auto max-w-7xl">
        {/* radius کم مثل بقیه */}
        <div className="relative overflow-hidden rounded-md border bg-white shadow-sm">
          {/* Height ثابت/ریسپانسیف */}
          <div className="relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px]">
            {/* Track */}
            <div
              className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(${index * 100}%)` }}
            >
              {safeSlides.map((s) => (
                <div key={s.id} className="relative min-w-full">
                  <Image
                    src={s.imageUrl}
                    alt={s.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full px-5 sm:px-8">
                      <div className="max-w-2xl">
                        {s.badge ? (
                          <div
                            className="mb-3 inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold text-white"
                            style={{ backgroundColor: "rgba(31,73,255,0.9)" }}
                          >
                            {s.badge}
                          </div>
                        ) : null}

                        <h2 className="text-right text-xl font-extrabold leading-snug text-white sm:text-2xl md:text-3xl">
                          {s.title}
                        </h2>

                        {s.desc ? (
                          <p className="mt-3 text-right text-sm leading-7 text-white/90 sm:text-base">
                            {s.desc}
                          </p>
                        ) : null}

                        <div className="mt-5 flex justify-end gap-2">
                          <Link
                            href={s.href ?? "/products"}
                            className="inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-semibold text-white shadow-sm transition"
                            style={{ backgroundColor: BRAND }}
                          >
                            مشاهده
                          </Link>
                          <Link
                            href="/new"
                            className="inline-flex h-10 items-center justify-center rounded-md border border-white/35 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                          >
                            ثبت آگهی
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* bottom glow line */}
                  <div
                    className="absolute bottom-0 right-0 h-[2px] w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(31,73,255,0.75), transparent)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Dots پایین سمت چپ (داخل کادر) */}
            <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
              {safeSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-[6px] w-[6px] rounded-full transition",
                    i === index ? "bg-white" : "bg-white/50"
                  )}
                  aria-label={`اسلاید ${i + 1}`}
                />
              ))}
            </div>

            {/* Progress bar (اختیاری ولی خیلی شیک) */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
              <div
                key={index}
                className="h-full"
                style={{
                  width: "100%",
                  backgroundColor: "rgba(31,73,255,0.85)",
                  animation: paused ? "none" : `sliderProgress ${autoPlayMs}ms linear forwards`,
                }}
              />
            </div>

            <style jsx>{`
              @keyframes sliderProgress {
                from {
                  transform: translateX(100%);
                }
                to {
                  transform: translateX(0%);
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
