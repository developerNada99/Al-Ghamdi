import { defineField, defineType } from "sanity";

export const city = defineType({
  name: "city",
  title: "المدن",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "اسم المدينة",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});