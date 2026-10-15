import Link from "next/link";
import type { CityOption } from "@/types/listing";
import {
  dealTypeLabels,
  landUseLabels,
  propertyTypeLabels,
} from "@/lib/labels";

export type Filters = {
  deal: string;
  type: string;
  landUse: string;
  city: string;
};

function Select({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-neutral-500">{label}</span>
      <select
        name={name}
        defaultValue={value}
        className="rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-brand-green"
      >
        <option value="">الكل</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const toOptions = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

export default function FilterBar({
  cities,
  values,
}: {
  cities: CityOption[];
  values: Filters;
}) {
  return (
    <form
      action="/listings"
      method="get"
      className="mb-8 grid gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      <Select name="deal" label="العملية" value={values.deal} options={toOptions(dealTypeLabels)} />
      <Select name="type" label="نوع العقار" value={values.type} options={toOptions(propertyTypeLabels)} />
      <Select name="landUse" label="تصنيف الأرض" value={values.landUse} options={toOptions(landUseLabels)} />
      <Select
        name="city"
        label="المدينة"
        value={values.city}
        options={cities.map((c) => ({ value: c._id, label: c.name }))}
      />

      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-brand-green px-4 py-2 font-semibold text-white transition hover:opacity-90"
        >
          بحث
        </button>
        <Link
          href="/listings"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
        >
          مسح
        </Link>
      </div>
    </form>
  );
}