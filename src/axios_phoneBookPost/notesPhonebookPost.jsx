import axios from "axios";

const url = '/api'

const getting = () => {   
    const axiosBase = axios.get(`${url}/data`)
    return axiosBase.then(resolve=> resolve.data)
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