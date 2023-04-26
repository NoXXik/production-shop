import axios from "axios"


export async function uploadCategoryImage(file: Blob, name: string) {
    return new Promise((resolve, reject) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            // if (dirId) {
            //     formData.append('parent', dirId)
            // }
            // const response = axios.post(`${API_URL}api/files/upload`, formData, {
            //     headers: {Authorization: `Bearer ${user.user?.token}`},
            // });
            formData.append('name', name)
            const response = axios.post(`${process.env.API_URL}/api/upload/category-image`, formData);
            resolve(response)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}
