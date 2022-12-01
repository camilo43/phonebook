import axios from "axios";

const url = 'https://helpful-cat-c6e7cf.netlify.app/api'

const getting = () => { 
    console.log(">>Getting AXIOS")  
    const axiosBase = axios.get(`${url}/data`)
    console.log("AxiosBase", axiosBase)
    return axiosBase.then(resolve=> {console.log("RESOLVE", resolve); return resolve.data})
}

const posting = (objectBase) => {
    const axiosBase = axios.post(`${url}/data`, objectBase)
    return axiosBase.then(resolve => resolve.data)
}

const deleting = (id) => {
    const axiosBase = axios.delete(`${url}/data/${id}`)
    return axiosBase
}

const putting = (id, cambio) => {
    const axiosBase = axios.put(`${url}/data/${id}`, cambio)
    return axiosBase
}
export const notesPhonebook = { getting, posting, deleting, putting }