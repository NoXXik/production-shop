export interface IFilterInitialState {
    filters: IFilter[] | null,
    readyFilter: IReadyFilter[] | null,
    selectedFilters: ISelectedFilter[]
}
export interface ISelectedFilter {
  title: string, 
  filter: string
}

export interface IFilter {
  title: string;
  values: FilterValue;
  translit: string;
  key: string;
  value: string;
}

interface FilterValue {
  value_title: string;
  value_translit: string;
}



export interface IReadyFilter {
  title: string;
  translit: string;
  filters: Filter[];
}

export interface Filter {
  title: string;
  translit: string;
  count: number;
  checked: boolean;
}

