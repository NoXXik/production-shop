export interface INavbarCategory {
  id: number;
  parent_id?: number;
  title: string;
  description: string;
  translit: string;
  level: number;
  path: string;
  path_sort: string[];
  is_leaf: boolean;
  image: string;
}
