import { defineField, defineType } from "sanity";

export const district = defineType({
  name: "district",
  title: "المناطق والأحياء",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "اسم المنطقة",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "city",
      title: "المدينة",
      type: "reference",
      to: [{ type: "city" }],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "city.name" },
  },
});