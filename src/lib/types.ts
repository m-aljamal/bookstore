export interface FormData {
  email: string;
  password: string;
}

export interface Book {
  author: string;
  coverImageUrl: string;
  id: string;
  pageCount: number;
  publisher: string;
  synopsis: string;
  title: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
