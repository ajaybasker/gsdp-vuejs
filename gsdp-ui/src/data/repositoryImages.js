// Real reference cover images for the Digital Repository, sourced from Wikimedia Commons
// (public domain / freely licensed). The prototype has no file storage, so every resource of a
// given Document Type shares one representative image rather than a unique upload — swapping in
// real per-resource cover uploads later only touches this file and RepositoryAsset.coverImageUrl.
// Each entry keeps its Commons description page as `sourceUrl` for attribution.
export const ASSET_TYPE_COVER_IMAGES = {
  Book: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Facsimile_of_the_book_of_kells-Interior_of_the_Old_Library%2C_Trinity_College%2C_Dublin.jpg/960px-Facsimile_of_the_book_of_kells-Interior_of_the_Old_Library%2C_Trinity_College%2C_Dublin.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Facsimile_of_the_book_of_kells-Interior_of_the_Old_Library,_Trinity_College,_Dublin.jpg',
    credit: 'Wikimedia Commons',
  },
  Research: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Photograph_of_the_West_Search_Room_with_Empty_Library_Shelves_%2C_01-06-1936_%2814059479759%29.jpg/960px-Photograph_of_the_West_Search_Room_with_Empty_Library_Shelves_%2C_01-06-1936_%2814059479759%29.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Photograph_of_the_West_Search_Room_with_Empty_Library_Shelves_,_01-06-1936_(14059479759).jpg',
    credit: 'Wikimedia Commons',
  },
  Photo: {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/St_Paul%27s_College%2C_Burgh_Le_Marsh_c.1900-10.jpg/960px-St_Paul%27s_College%2C_Burgh_Le_Marsh_c.1900-10.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:St_Paul's_College,_Burgh_Le_Marsh_c.1900-10.jpg",
    credit: 'Wikimedia Commons',
  },
  Video: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/A_display_full_of_vintage_film_projectors_and_film_memorabilia_-_0735.jpg/960px-A_display_full_of_vintage_film_projectors_and_film_memorabilia_-_0735.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:A_display_full_of_vintage_film_projectors_and_film_memorabilia_-_0735.jpg',
    credit: 'Wikimedia Commons',
  },
  Audio: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Tischmikrofon_ca._1930.jpg/960px-Tischmikrofon_ca._1930.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tischmikrofon_ca._1930.jpg',
    credit: 'Wikimedia Commons',
  },
  'Press Release': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Western_Daily_Press_printing_press_1858.jpg/960px-Western_Daily_Press_printing_press_1858.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Western_Daily_Press_printing_press_1858.jpg',
    credit: 'Wikimedia Commons',
  },
  'Official Publication': {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Don-Ricaldone-Rua-Rinaldi_1900.jpg/960px-Don-Ricaldone-Rua-Rinaldi_1900.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Don-Ricaldone-Rua-Rinaldi_1900.jpg',
    credit: 'Wikimedia Commons',
  },
};

// General-purpose fallback (About / hero / anywhere a resource has no recognised asset_type).
export const DEFAULT_COVER_IMAGE = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Don_Bosco_Paolo_Gaidano.jpg',
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:Don_Bosco_Paolo_Gaidano.jpg',
  credit: 'Wikimedia Commons',
};

// Sector / parish imagery for public Sector pages.
export const INSTITUTION_COVER_IMAGE = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Colegio_Salesianos_de_La_Orotava.jpg/1280px-Colegio_Salesianos_de_La_Orotava.jpg',
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:Colegio_Salesianos_de_La_Orotava.jpg',
  credit: 'Wikimedia Commons',
};

export function coverImageForAssetType(assetType) {
  return ASSET_TYPE_COVER_IMAGES[assetType] || DEFAULT_COVER_IMAGE;
}

// Full-bleed hero/banner photography for the public portal's marketing-style pages. Real,
// freely-licensed photographs (Wikimedia Commons) chosen per page's subject, replacing plain
// gradient-and-dot-grid banners with something that actually depicts the Salesians' world.
export const PUBLIC_HERO_IMAGES = {
  home: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Don_Bosco_Shrine_at_Matunga_in_Bombay.jpg/1280px-Don_Bosco_Shrine_at_Matunga_in_Bombay.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Don_Bosco_Shrine_at_Matunga_in_Bombay.jpg',
    credit: 'Wikimedia Commons',
  },
  about: DEFAULT_COVER_IMAGE,
  resources: ASSET_TYPE_COVER_IMAGES.Book,
  statistics: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1744_Bowen_Map_of_the_World_in_Hemispheres_-_Geographicus_-_World-bowen-1744.jpg/1280px-1744_Bowen_Map_of_the_World_in_Hemispheres_-_Geographicus_-_World-bowen-1744.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:1744_Bowen_Map_of_the_World_in_Hemispheres_-_Geographicus_-_World-bowen-1744.jpg',
    credit: 'Wikimedia Commons',
  },
  sectors: INSTITUTION_COVER_IMAGE,
  communities: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Igreja_Nossa_Senhora_Auxiliadora_Lisboa.jpg/1280px-Igreja_Nossa_Senhora_Auxiliadora_Lisboa.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Igreja_Nossa_Senhora_Auxiliadora_Lisboa.jpg',
    credit: 'Wikimedia Commons',
  },
  provinces: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Don_Bosco_Shrine_at_Matunga_in_Bombay.jpg/1280px-Don_Bosco_Shrine_at_Matunga_in_Bombay.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Don_Bosco_Shrine_at_Matunga_in_Bombay.jpg',
    credit: 'Wikimedia Commons',
  },
  news: ASSET_TYPE_COVER_IMAGES['Press Release'],
};
