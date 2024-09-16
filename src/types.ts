export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserResponseWithPagination {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}