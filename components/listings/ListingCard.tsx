import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { ListingCardData } from "@/types/listing";
import {
  closedLabel,
  dealTypeLabels,
  formatPrice,
  propertyTypeLabels,
} from "@/lib/labels";

export default function ListingCard({ listing }: { listing: ListingCardData }) {
  const closed = listing.status === "closed";

  const imageUrl = listing.image
    ? urlFor(listing.image).width(700).height(480).fit("crop").url()
    : null;

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="relative aspect-[7/4.8] bg-neutral-100">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={listing.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`object-cover transition duration-500 group-hover:scale-105 ${
              closed ? "grayscale-60" : ""
            }`}
          />
        )}

        <span className="absolute top-3 right-3 rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-white">
          {dealTypeLabels[listing.dealType]}
        </span>

        {closed && (
          <span className="absolute top-3 left-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
            {closedLabel(listing.dealType)}
          </span>
        )}
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs text-neutral-500">
          {propertyTypeLabels[listing.propertyType]}
          {listing.city && ` • ${listing.city}`}
          {listing.district && ` - ${listing.district}`}
        </p>
        <h3 className="line-clamp-1 text-base font-bold text-neutral-900">
          {listing.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-bold text-brand-burgundy">
            {formatPrice(listing.price, listing.hidePrice, listing.priceUnit)}
          </span>
          {listing.size && (
            <span className="text-xs text-neutral-500">{listing.size} م²</span>
          )}
        </div>
      </div>
    </Link>
  );
}