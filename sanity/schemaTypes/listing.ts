import { defineField, defineType } from "sanity";

export const listing = defineType({
  name: "listing",
  title: "العروض",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "عنوان العرض",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  hidden: true,
  initialValue: () => ({
    _type: "slug",
    current: `listing-${Date.now().toString(36)}${Math.random()
      .toString(36)
      .slice(2, 5)}`,
  }),
  validation: (r) => r.required(),
}),

    // ---------- التصنيف ----------
    defineField({
      name: "dealType",
      title: "نوع العملية",
      type: "string",
      options: {
        list: [
          { title: "للبيع", value: "sale" },
          { title: "للإيجار", value: "rent" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "propertyType",
      title: "نوع العقار",
      type: "string",
      options: {
        list: [
          { title: "أرض", value: "land" },
          { title: "بيت", value: "house" },
          { title: "فيلا", value: "villa" },
          { title: "شقة", value: "apartment" },
          { title: "عمارة", value: "building" },
          { title: "كمب عمال", value: "camp" },
          { title: "حوش", value: "yard" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "landUse",
      title: "تصنيف الأرض",
      type: "string",
      options: {
        list: [
          { title: "سكنية", value: "residential" },
          { title: "سكنية تجارية", value: "residential-commercial" },
          { title: "زراعية", value: "agricultural" },
          { title: "صناعية", value: "industrial" },
        ],
      },
      hidden: ({ document }) => document?.propertyType !== "land",
    }),
    defineField({
      name: "landCondition",
      title: "حالة الأرض (للإيجار)",
      type: "string",
      options: {
        list: [
          { title: "محوطة", value: "fenced" },
          { title: "فاضية", value: "empty" },
        ],
      },
      hidden: ({ document }) =>
        !(document?.propertyType === "land" && document?.dealType === "rent"),
    }),
    defineField({
      name: "floors",
      title: "عدد الأدوار",
      type: "string",
      options: {
        list: [
          { title: "دور واحد", value: "one" },
          { title: "دور ونصف", value: "one-half" },
          { title: "دورين", value: "two" },
          { title: "دورين ونصف", value: "two-half" },
        ],
      },
      hidden: ({ document }) => document?.propertyType !== "house",
    }),

    // ---------- الموقع ----------
    defineField({
      name: "city",
      title: "المدينة",
      type: "reference",
      to: [{ type: "city" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "district",
      title: "المنطقة / الحي",
      type: "reference",
      to: [{ type: "district" }],
      options: {
        filter: ({ document }) => ({
          filter: "city._ref == $cityId",
          params: { cityId: (document?.city as { _ref?: string })?._ref },
        }),
      },
    }),

    // ---------- السعر ----------
    defineField({
      name: "hidePrice",
      title: "إخفاء السعر (على السوم)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "price",
      title: "السعر (ريال)",
      type: "number",
      validation: (r) => r.min(0),
      hidden: ({ document }) => Boolean(document?.hidePrice),
    }),
    defineField({
      name: "priceUnit",
      title: "وحدة السعر",
      type: "string",
      options: {
        list: [
          { title: "إجمالي", value: "total" },
          { title: "للمتر", value: "per-meter" },
          { title: "سنوي", value: "yearly" },
          { title: "شهري", value: "monthly" },
        ],
      },
      initialValue: "total",
      hidden: ({ document }) => Boolean(document?.hidePrice),
    }),

    // ---------- المواصفات ----------
    defineField({
      name: "size",
      title: "المساحة (م²)",
      type: "number",
    }),
    defineField({ name: "bedrooms", title: "عدد الغرف", type: "number" }),
    defineField({ name: "bathrooms", title: "عدد دورات المياه", type: "number" }),
    defineField({
      name: "offeredBy",
      title: "العرض مقدم من",
      type: "string",
      options: {
        list: [
          { title: "المالك", value: "owner" },
          { title: "الوكيل", value: "agent" },
          { title: "المؤجر", value: "lessor" },
        ],
      },
    }),
    defineField({ name: "description", title: "الوصف", type: "text", rows: 5 }),

    // ---------- الميديا ----------
    defineField({
      name: "images",
      title: "الصور (الأولى هي صورة الكارت)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.required().min(1).max(15),
    }),
    defineField({
      name: "video",
      title: "فيديو (اختياري)",
      type: "file",
      options: { accept: "video/*" },
    }),

    // ---------- الحالة ----------
    defineField({
      name: "status",
      title: "حالة العرض",
      type: "string",
      options: {
        list: [
          { title: "متاح", value: "available" },
          { title: "محجوز", value: "reserved" },
          { title: "مباع / مؤجر", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "available",
    }),
    defineField({
      name: "featured",
      title: "عرض مميز",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "city.name", media: "images.0" },
  },
});