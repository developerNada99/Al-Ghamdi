import { buildPhoneLink, buildWhatsAppLink } from "@/lib/contact";

export default function ContactButtons({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={buildWhatsAppLink(title, slug)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 font-bold text-white transition hover:opacity-90"
      >
        تواصل عبر واتساب
      </a>
      <a
        href={buildPhoneLink()}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-brand-burgundy px-5 py-3 font-bold text-brand-burgundy transition hover:bg-brand-burgundy hover:text-white"
      >
        اتصل الآن
      </a>
    </div>
  );
}