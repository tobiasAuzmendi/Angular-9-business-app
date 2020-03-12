export interface Business {
  id: string;
  image_url: string;
  name: string;
  rating: number;
}

export interface BusinessListResponse {
  businesses: Business[];
  total: number;
  region: Region;
}

interface Region {
  center: Coordinate;
}

interface Coordinate {
  longitude: number;
  latitude: number;
}

export interface BusinessDetail extends Business {
  reviews: BusinessReview[];
}

export interface BusinessReviewsResponse {
  reviews: BusinessReview[];
  total: number;
  possible_languages: string[];
}

export interface BusinessReview {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: string;
  user: User;
}

export interface User {
  id: string;
  profile_url: string;
  image_url: string;
  name: string;
}
