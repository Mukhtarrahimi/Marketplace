"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { currentUser } from "@/data/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Mixbazar
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-4 md:flex">
          <Input placeholder="جستجوی محصول..." className="w-64" />

          <Link href="/products" className="text-sm hover:text-blue-600">
            آگهی ها
          </Link>

          <Button>ثبت آگهی</Button>

          {/* Avatar */}
          <img
            src={currentUser.avatar}
            className="h-9 w-9 rounded-full border"
          />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mt-3 flex flex-col gap-3 border-t pt-3 md:hidden">
          <Input placeholder="جستجوی محصول..." />

          <Link href="/products" className="text-sm hover:text-blue-600">
            آگهی ها
          </Link>

          <Button className="w-full">ثبت آگهی</Button>

          <div className="mt-2 flex items-center gap-3">
            <img
              src={currentUser.avatar}
              className="h-9 w-9 rounded-full border"
            />
            <span>{currentUser.name}</span>
          </div>
        </div>
      )}
    </nav>
  );
}
