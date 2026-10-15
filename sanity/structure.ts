import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('لوحة التحكم')
    .items([
      S.documentTypeListItem('listing').title('العروض'),
      S.documentTypeListItem('city').title('المدن'),
      S.documentTypeListItem('district').title('المناطق والأحياء'),
    ])