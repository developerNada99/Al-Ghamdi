import { Suspense } from "react";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { listingBySlugQuery } from "@/lib/queries";
import type { ListingDetails } from "@/types/listing";
import MediaSlider, { type MediaItem } from "@/components/listings/MediaSlider";
import ContactButtons from "@/components/listings/ContactButtons";
import ListingSpecs from "@/components/listings/ListingSpecs";
import { closedLabel, formatPrice } from "@/lib/labels";

async function ListingContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await client.fetch<ListingDetails | null>(
    listingBySlugQuery,
    { slug: decodeURIComponent(slug) }
  );

  if (!listing) notFound();

  const media: MediaItem[] = [
    ...(listing.images ?? []).map((img) => ({
      type: "image" as const,
      url: urlFor(img).width(1400).height(875).fit("crop").url(),
    })),
    ...(listing.videoUrl
      ? [{ type: "video" as const, url: listing.videoUrl }]
      : []),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <MediaSlider items={media} title={listing.title} />
      </div>

      <div className="space-y-6 lg:col-span-2">
        <div>
          {listing.status === "closed" && (
            <span className="mb-3 inline-block rounded-full bg-red-600 px-4 py-1 text-sm font-bold text-white">
              {closedLabel(listing.dealType)}
            </span>
          )}
          <h1 className="text-2xl font-bold text-neutral-900">
            {listing.title}
          </h1>
          <p className="mt-2 text-2xl font-bold text-brand-burgundy">
            {formatPrice(listing.price, listing.hidePrice, listing.priceUnit)}
          </p>
        </div>

        <ContactButtons title={listing.title} slug={slug} />

        <ListingSpecs listing={listing} />
      </div>
    </div>
  );
}

export default function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Suspense fallback={<p className="text-neutral-500">جارٍ التحميل...</p>}>
        <ListingContent params={params} />
      </Suspense>
    </main>
  );
}