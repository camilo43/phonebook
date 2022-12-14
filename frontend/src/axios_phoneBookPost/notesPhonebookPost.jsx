import axios from "axios";

const url = 'https://example-backend2.onrender.com/'

const getting = () => { 
    console.log(">>Getting AXIOS")  
    const axiosBase = axios.get(`${url}api/data`)
    return  axiosBase.then(resolve=>resolve.data)
}

const posting = (objectBase) => {
    const axiosBase = axios.post(`${url}api/data`, objectBase)
    return axiosBase.then(resolve => resolve.data)
}

const deleting = (id) => {
    const axiosBase = axios.delete(`${url}api/data/${id}`)
    return axiosBase
}

const putting = (id, cambio) => {
    console.log(">>PUTTING AXIOS")
    const axiosBase = axios.put(`${url}api/data/${id}`, cambio)
    return axiosBase
}
export const notesPhonebook = { getting, posting, deleting, putting }