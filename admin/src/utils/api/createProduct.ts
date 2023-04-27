import axios from "axios";
import { IProductCreateData } from "../../types/productTypes";



export async function createProduct(data: IProductCreateData) {
    try {
        const response = (await axios.post(`${import.meta.env.VITE_API_URL}/api/product`, data)).data;
        return response
    } catch (e) {
        console.log(e)
    }
}
