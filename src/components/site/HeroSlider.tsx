"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const BRAND = "#1f49ff";

const slides = [
  {
    id: 1,
    title: "خرید و فروش آسان در سراسر افغانستان",
    desc: "آگهی خود را ثبت کنید و به هزاران نفر نمایش دهید",
    image: "/images/slider/slide1.jpg",
    link: "/products",
  },
  {
    id: 2,
    title: "موتر، خانه، موبایل و بیشتر",
    desc: "همه چیز در یک جا، سریع و مطمئن",
    image: "/images/slider/slide2.jpg",
    link: "/categories",
  },
  {
    id: 3,
    title: "آگهی خود را رایگان ثبت کنید",
    desc: "در کمتر از یک دقیقه آگهی بسازید",
    image: "/images/slider/slide3.jpg",
    link: "/new",
  },
  {
    id: 4,
    title: "بهترین پیشنهادات روز",
    desc: "فرصت‌ها را از دست ندهید",
    image: "/images/slider/slide4.jpg",
    link: "/products",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // autoplay
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white px-4 pt-4">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-md">
          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="relative min-w-full h-[200px] sm:h-[260px] md:h-[320px] lg:h-[360px]"
              >
                {/* Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="px-6 md:px-10 text-right text-white max-w-xl">
                    <h2 className="mb-2 text-lg font-bold sm:text-xl md:text-2xl">
                      {slide.title}
                    </h2>
                    <p className="mb-4 text-sm text-white/90 md:text-base">
                      {slide.desc}
                    </p>
                    <Link
                      href={slide.link}
                      className="inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-medium text-white transition"
                      style={{ backgroundColor: BRAND }}
                    >
                      مشاهده
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-white/80 p-2 backdrop-blur transition hover:bg-white"
            aria-label="قبلی"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md bg-white/80 p-2 backdrop-blur transition hover:bg-white"
            aria-label="بعدی"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full transition ${
                  current === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`اسلاید ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
