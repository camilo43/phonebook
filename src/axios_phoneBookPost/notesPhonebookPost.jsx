import axios from "axios";

const url = '/api'

const getting = async() => { 
    console.log(">>Getting AXIOS")
    try{
        const axiosBase = axios.get(`${url}/data`)
        console.log("AxiosBase", axiosBase)
        const resolve = await axiosBase;
        console.log("RESOLVE", resolve);
        return resolve.data;
    } catch(error){
        console.log("THIS IS THE ERROR: ", error)
    } 
   
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