export interface Image {
  icon_url: string;
  medium_url: string;
  screen_url: string;
  screen_large_url: string;
  small_url: string;
  super_url: string;
  thumb_url: string;
  tiny_url: string;
  original_url: string;
  image_tags: string;
}

export interface AssociatedImage {
  original_url: string;
  id: string;
  caption: string | null;
  image_tags: string;
}

export interface Volume {
  api_detail_url: string;
  id: string;
  name: string;
  site_detail_url: string;
}

export interface Comic {
  aliases: string | null;
  api_detail_url: string;
  cover_date: string;
  date_added: string;
  date_last_updated: string;
  deck: string | null;
  description: string;
  has_staff_review: boolean;
  id: string | number;
  image: Image;
  associated_images: AssociatedImage[];
  issue_number: string;
  name: string;
  site_detail_url: string;
  store_date: string | null;
  volume: Volume;
}

export interface ComicDetail {
  date_added: string;
  description?: TrustedHTML;
  id: string;
  image: string;
  issue_number: string;
  name: string;
  api_detail_url?: string;
  category: string;
}

export interface ComicStore {
  error: "";
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  results: [];
}
