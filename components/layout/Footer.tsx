import Image from "next/image";
import Link from "next/link";
import {
  buildGeneralWhatsAppLink,
  buildPhoneLink,
  formatPhoneDisplay,
} from "@/lib/contact";

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "كل العروض", href: "/listings" },
  { label: "عقارات للبيع", href: "/listings?deal=sale" },
  { label: "عقارات للإيجار", href: "/listings?deal=rent" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-green text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        {/* نبذة */}
        <div className="space-y-4">
          <div className="inline-block rounded-xl bg-white p-2">
            <Image
              src="/logo.png"
              alt="الغامدي العقاري"
              width={160}
              height={64}
              className="h-12 w-auto"
            />
          </div>
          <h2 className="text-lg font-bold">مكتب الغامدي العقاري</h2>
          <p className="text-sm leading-7 text-white/80">
            نعرض لكم أفضل العروض العقارية من أراضٍ وبيوت وشقق وعمارات، للبيع
            والإيجار، مع خدمة موثوقة وتواصل مباشر.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="mb-4 text-base font-bold">روابط سريعة</h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/80 transition hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* تواصل */}
        <div>
          <h3 className="mb-4 text-base font-bold">تواصل معنا</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={buildPhoneLink()}
                className="text-white/80 transition hover:text-white"
              >
                اتصال:{" "}
                <span dir="ltr" className="inline-block">
                  {formatPhoneDisplay()}
                </span>
              </a>
            </li>
            <li>
              <a
                href={buildGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 transition hover:text-white"
              >
                واتساب: راسلنا الآن
              </a>
            </li>
          </ul>

          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-green transition hover:bg-neutral-100"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </div>

      <div className="border-t border-white/15 py-4 text-center text-xs text-white/70">
 © جميع الحقوق محفوظة لمكتب الغامدي العقاري      </div>
    </footer>
  );
}