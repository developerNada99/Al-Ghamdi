import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { listingsQuery } from "@/lib/queries";
import type { ListingCardData } from "@/types/listing";
import ListingCard from "@/components/listings/ListingCard";
import Link from "next/link";

async function Listings() {
  const listings = await client.fetch<ListingCardData[]>(listingsQuery);

  if (!listings.length) {
    return <p className="text-neutral-500">لا توجد عروض حاليًا.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <ListingCard key={l._id} listing={l} />
      ))}
    </div>
  );
}
const categories = [
  { label: "أراضي للبيع", href: "/listings?deal=sale&type=land" },
  { label: "بيوت للبيع", href: "/listings?deal=sale&type=house" },
  { label: "فلل", href: "/listings?deal=sale&type=villa" },
  { label: "شقق", href: "/listings?deal=sale&type=apartment" },
  { label: "عمارات", href: "/listings?deal=sale&type=building" },
  { label: "للإيجار", href: "/listings?deal=rent" },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-brand-green">أحدث العروض</h1>
      <div className="mb-8 flex flex-wrap gap-3">
  {categories.map((c) => (
    <Link
      key={c.href}
      href={c.href}
      className="rounded-full border border-brand-green px-4 py-2 text-sm font-semibold text-brand-green transition hover:bg-brand-green hover:text-white"
    >
      {c.label}
    </Link>
  ))}
</div>

<Link href="/listings" className="mb-6 inline-block text-sm text-brand-burgundy underline">
  عرض كل العروض
</Link>
      <Suspense fallback={<p className="text-neutral-500">جارٍ التحميل...</p>}>
        <Listings />
      </Suspense>
    </main>
  );
}