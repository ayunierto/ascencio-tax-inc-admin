import { UserResponse } from "./user.response";

export interface UsersResponse {
  count: number;
  pages: number;
  users: UserResponse[];
}
