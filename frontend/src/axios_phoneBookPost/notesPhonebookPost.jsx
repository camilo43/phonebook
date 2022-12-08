import axios from "axios";

const url = 'http://localhost:3001/'

const getting = () => { 
    console.log(">>Getting AXIOS")  
    const axiosBase = axios.get(`${url}api/data`)
    axiosBase.then(resolve=> console.log(">>RESOLVE", resolve))
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
    const axiosBase = axios.put(`${url}api/data/${id}`, cambio)
    return axiosBase
}
export const notesPhonebook = { getting, posting, deleting, putting }