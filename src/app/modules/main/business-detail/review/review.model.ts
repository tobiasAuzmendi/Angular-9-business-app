export interface Review {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: string;
  user: User;
}

interface User {
  image_url: string;
  name: string;
}
