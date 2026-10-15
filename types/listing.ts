export type ListingCardData = {
  _id: string;
  title: string;
  slug: string;
  dealType: "sale" | "rent";
  propertyType: string;
  price?: number;
  priceUnit?: "total" | "per-meter" | "yearly" | "monthly";
  hidePrice?: boolean;
  size?: number;
  status?: string;
  city?: string;
  district?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
};

export type ListingDetails = ListingCardData & {
  landUse?: string;
  landCondition?: string;
  floors?: string;
  bedrooms?: number;
  bathrooms?: number;
  offeredBy?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images?: any[];
  videoUrl?: string | null;
};

export type CityOption = {
  _id: string;
  name: string;
};