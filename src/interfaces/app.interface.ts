export interface Member {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  gender: boolean;
  yob: number;
  isAdmin: boolean;
}

export interface Brand {
  _id: string;
  name: string;
}

export interface Perfume {
  _id: string;
  name: string;
  brand: Brand;
  description: string;
  price: number;
  concentration: string;
  ingredients: string;
  volume: number;
  targetAudience: string;
  uri: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  content: string;
  rating: number;
  author: Member;
  createdAt: Date;
}
