export interface ICreateCategoryData {
    title: string,
    parent_id: number | null,
    translit: string,
    description?: string,
    image: string;
}

export interface IHierarchyCategory {
    id: number;
    parent_id: number | null;
    title: string;
    translit: string;
    level: number;
    path: string;
    path_sort: string[];
    is_leaf: boolean;
};
