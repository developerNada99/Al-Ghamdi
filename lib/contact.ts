const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export function buildWhatsAppLink(title: string, slug: string) {
  const message = [
    "السلام عليكم، أرغب بالاستفسار عن العرض التالي:",
    title,
    `${siteUrl}/listings/${slug}`,
  ].join("\n");

  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildPhoneLink() {
  return `tel:+${phone}`;
}
export function formatPhoneDisplay() {
  // 966506838540 -> +966 50 683 8540
  const m = phone.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/);
  return m ? `+${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${phone}`;
}

export function buildGeneralWhatsAppLink() {
  const message = "السلام عليكم، أرغب بالاستفسار عن العروض المتاحة.";
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}