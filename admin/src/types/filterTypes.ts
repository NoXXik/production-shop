import {translit} from "../utils/helpers/utilFunctions";

export interface IFilterCreateData {
    title: string,
    translit: string
    values: FilterValues[]
}

export interface FilterValues {
    value_title: string,
    value_translit: string
}
