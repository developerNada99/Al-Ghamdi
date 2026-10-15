import { defineQuery } from "next-sanity";

export const listingsQuery = defineQuery(`
  *[_type == "listing"] | order(select(status == "closed" => 1, 0) asc, _createdAt desc)[0...12]{
    _id,
    title,
    "slug": slug.current,
    dealType,
    propertyType,
    price,
    priceUnit,
    hidePrice,
    size,
    status,
    "city": city->name,
    "district": district->name,
    "image": images[0]
  }
`);

export const listingBySlugQuery = defineQuery(`
  *[_type == "listing" && slug.current == $slug][0]{
    _id,
    title,
    dealType,
    propertyType,
    landUse,
    landCondition,
    floors,
    price,
    priceUnit,
    hidePrice,
    size,
    bedrooms,
    bathrooms,
    offeredBy,
    description,
    status,
    "city": city->name,
    "district": district->name,
    "images": images[],
    "videoUrl": video.asset->url
  }
`);

export const filteredListingsQuery = defineQuery(`
  *[_type == "listing"
    && ($deal == "" || dealType == $deal)
    && ($type == "" || propertyType == $type)
    && ($landUse == "" || landUse == $landUse)
    && ($city == "" || city._ref == $city)
  ] | order(select(status == "closed" => 1, 0) asc, _createdAt desc)[0...48]{
    _id,
    title,
    "slug": slug.current,
    dealType,
    propertyType,
    price,
    priceUnit,
    hidePrice,
    size,
    status,
    "city": city->name,
    "district": district->name,
    "image": images[0]
  }
`);

export const citiesQuery = defineQuery(`
  *[_type == "city"] | order(name asc){
    _id,
    name
  }
`);