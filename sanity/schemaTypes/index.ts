import { type SchemaTypeDefinition } from "sanity";
import { city } from "./city";
import { district } from "./district";
import { listing } from "./listing";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [city, district, listing],
};