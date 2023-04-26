import axios from "axios"


export async function uploadImage(file: Blob, name: string) {
    return new Promise((resolve, reject) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('name', name)
            const response = axios.post(`${process.env.API_URL}/api/upload/image`, formData);
            resolve(response)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}
