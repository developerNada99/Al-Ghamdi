import type { ListingDetails } from "@/types/listing";
import {
  dealTypeLabels,
  floorsLabels,
  landConditionLabels,
  landUseLabels,
  offeredByLabels,
  propertyTypeLabels,
} from "@/lib/labels";

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const AreaIcon = () => (
  <svg {...iconProps}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 4v4M4 9h4M15 20v-4M20 15h-4" />
  </svg>
);

const BedIcon = () => (
  <svg {...iconProps}>
    <path d="M3 18v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 14h18M3 18v2M21 18v2" />
    <path d="M7 10V8h4v2" />
  </svg>
);

const BathIcon = () => (
  <svg {...iconProps}>
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" />
    <path d="M6 12V6a2 2 0 0 1 2-2h1M7 19l-1 2M17 19l1 2" />
  </svg>
);

export default function ListingSpecs({ listing }: { listing: ListingDetails }) {
  const highlights = [
    {
      label: "المساحة",
      value: listing.size
        ? `${listing.size.toLocaleString("ar-SA-u-nu-latn")} م²`
        : null,
      icon: <AreaIcon />,
    },
    { label: "الغرف", value: listing.bedrooms ?? null, icon: <BedIcon /> },
    {
      label: "دورات المياه",
      value: listing.bathrooms ?? null,
      icon: <BathIcon />,
    },
  ].filter((h) => h.value !== null && h.value !== undefined);

  const details: [string, string | undefined][] = [
    ["نوع العقار", propertyTypeLabels[listing.propertyType]],
    ["العملية", dealTypeLabels[listing.dealType]],
    ["المدينة", listing.city],
    ["المنطقة / الحي", listing.district],
    ["تصنيف الأرض", listing.landUse ? landUseLabels[listing.landUse] : undefined],
    [
      "حالة الأرض",
      listing.landCondition ? landConditionLabels[listing.landCondition] : undefined,
    ],
    ["عدد الأدوار", listing.floors ? floorsLabels[listing.floors] : undefined],
    [
      "مقدم العرض",
      listing.offeredBy ? offeredByLabels[listing.offeredBy] : undefined,
    ],
  ];

  const visibleDetails = details.filter(([, v]) => v);

  return (
    <div className="space-y-8">
      {highlights.length > 0 && (
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${highlights.length}, minmax(0, 1fr))`,
          }}
        >
          {highlights.map((h) => (
            <div
              key={h.label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-brand-green/10 px-3 py-5 text-center text-brand-green"
            >
              {h.icon}
              <span className="text-lg font-bold text-neutral-900">
                {h.value}
              </span>
              <span className="text-xs text-neutral-600">{h.label}</span>
            </div>
          ))}
        </div>
      )}

      {visibleDetails.length > 0 && (
        <section>
          <h2 className="mb-4 border-r-4 border-brand-burgundy pr-3 text-lg font-bold text-neutral-900">
            تفاصيل العقار
          </h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {visibleDetails.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3"
              >
                <dt className="text-xs text-neutral-500">{label}</dt>
                <dd className="mt-1 font-bold text-neutral-900">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {listing.description && (
        <section>
          <h2 className="mb-4 border-r-4 border-brand-burgundy pr-3 text-lg font-bold text-neutral-900">
            الوصف
          </h2>
          <p className="whitespace-pre-line leading-8 text-neutral-700">
            {listing.description}
          </p>
        </section>
      )}
    </div>
  );
}