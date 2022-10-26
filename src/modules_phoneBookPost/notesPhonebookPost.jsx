import axios from "axios";

const url = 'http://localhost:3001'

const getting = () => {
    const axiosBase = axios.get(`${url}/api/people`)
    return axiosBase.then(resolve=> resolve.data)
}

const posting = (objectBase) => {
    const axiosBase = axios.post(`${url}/api/post`, objectBase)
    return axiosBase.then(resolve => resolve.data)
}

const deleting = (id) => {
    const axiosBase = axios.delete(`${url}/api/people/${id}`)
    return axiosBase
}

const putting = (id, cambio) => {
    const axiosBase = axios.put(`${url}/api/people/${id}`, cambio)
    return axiosBase
}
const notesPhonebook = { getting, posting, deleting, putting }

export default notesPhonebook