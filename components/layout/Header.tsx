"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "الرئيسية", href: "/" },
  { label: "العروض", href: "/listings" },
  { label: "للبيع", href: "/listings?deal=sale" },
  { label: "للإيجار", href: "/listings?deal=rent" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* اللوجو + اسم المكتب */}
        <Link href="/" onClick={close} className="flex items-center gap-3">
          <Image
            src="/logoo.png"
            alt="الغامدي العقاري"
            width={160}
            height={64}
            priority
            className="h-10 w-auto sm:h-12"
          />
          <span className="border-r-2 border-brand-burgundy pr-3 text-sm font-bold text-brand-green sm:text-base">
            مكتب الغامدي العقاري
          </span>
        </Link>

        {/* روابط الشاشات الكبيرة */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-neutral-700 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition hover:text-brand-burgundy"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* زرار القايمة للموبايل */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          className="rounded-lg p-2 text-brand-green transition hover:bg-neutral-100 md:hidden"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* قايمة الموبايل */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-neutral-200 bg-white md:hidden"
          >
            <ul className="flex flex-col px-4 py-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className="block border-b border-neutral-100 py-3 text-base font-semibold text-neutral-800 last:border-b-0 hover:text-brand-burgundy"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}