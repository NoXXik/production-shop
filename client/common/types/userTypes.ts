export interface UserSchema {
    isAuth: boolean;
    token: string | null;
    user: User | null;
}

export interface UserCart {
  id: string;
  user_id: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
  hash_password: string;
  first_name: string;
  last_name: string;
  role: string;
  discount?: any;
  banned: boolean;
  created_at: string;
  updated_at: string;
  userCart: UserCart;
  userFavorite: UserFavorite;
}

export interface UserData {
  db_user: User;
  token: string;
}
