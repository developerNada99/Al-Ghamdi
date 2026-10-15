export const propertyTypeLabels: Record<string, string> = {
  land: "أرض",
  house: "بيت",
  villa: "فيلا",
  apartment: "شقة",
  building: "عمارة",
  camp: "كمب عمال",
  yard: "حوش",
};

export const dealTypeLabels: Record<string, string> = {
  sale: "للبيع",
  rent: "للإيجار",
};

export const priceUnitLabels: Record<string, string> = {
  total: "",
  "per-meter": "/ للمتر",
  yearly: "/ سنويًا",
  monthly: "/ شهريًا",
};

export const landUseLabels: Record<string, string> = {
  residential: "سكنية",
  "residential-commercial": "سكنية تجارية",
  agricultural: "زراعية",
  industrial: "صناعية",
};

export const landConditionLabels: Record<string, string> = {
  fenced: "محوطة",
  empty: "فاضية",
};

export const floorsLabels: Record<string, string> = {
  one: "دور واحد",
  "one-half": "دور ونصف",
  two: "دورين",
  "two-half": "دورين ونصف",
};

export const offeredByLabels: Record<string, string> = {
  owner: "المالك",
  agent: "الوكيل",
  lessor: "المؤجر",
};

export function formatPrice(
  price?: number,
  hidePrice?: boolean,
  unit?: string
) {
  if (hidePrice || price == null) return "على السوم";
  const num = price.toLocaleString("ar-SA-u-nu-latn");
  return `${num} ريال ${priceUnitLabels[unit ?? "total"] ?? ""}`.trim();
}
export function closedLabel(dealType?: string) {
  return dealType === "rent" ? "مؤجر" : "مباع";
}