import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { citiesQuery, filteredListingsQuery } from "@/lib/queries";
import type { CityOption, ListingCardData } from "@/types/listing";
import ListingCard from "@/components/listings/ListingCard";
import FilterBar, { type Filters } from "@/components/listings/FilterBar";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const pick = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : v) ?? "";

async function Results({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const filters: Filters = {
    deal: pick(sp.deal),
    type: pick(sp.type),
    landUse: pick(sp.landUse),
    city: pick(sp.city),
  };

  const [listings, cities] = await Promise.all([
    client.fetch<ListingCardData[]>(filteredListingsQuery, filters),
    client.fetch<CityOption[]>(citiesQuery),
  ]);

  return (
    <>
      <FilterBar cities={cities} values={filters} />

      <p className="mb-4 text-sm text-neutral-500">
        {listings.length} عرض
      </p>

      {listings.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l._id} listing={l} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-neutral-500">
          لا توجد عروض مطابقة للبحث.
        </p>
      )}
    </>
  );
}

export default function ListingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-brand-green">العروض</h1>
      <Suspense fallback={<p className="text-neutral-500">جارٍ التحميل...</p>}>
        <Results searchParams={searchParams} />
      </Suspense>
    </main>
  );
}