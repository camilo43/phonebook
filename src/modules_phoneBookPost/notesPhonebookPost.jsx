import axios from "axios";

const url = '/api'

const getting = () => {
    const axiosBase = axios.get(`${url}/data`)
    return axiosBase.then(resolve=> resolve.data)
}

const posting = (objectBase) => {
    const axiosBase = axios.post(`${url}/post`, objectBase)
    return axiosBase.then(resolve => resolve.data)
}

const deleting = (id) => {
    const axiosBase = axios.delete(`${url}/people/${id}`)
    return axiosBase
}

const putting = (id, cambio) => {
    const axiosBase = axios.put(`${url}/people/${id}`, cambio)
    return axiosBase
}
const notesPhonebook = { getting, posting, deleting, putting }

export default notesPhonebook