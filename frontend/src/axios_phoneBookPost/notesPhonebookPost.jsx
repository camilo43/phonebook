import axios from 'axios'

const url = 'https://example-backend2.onrender.com/'

// axios.interceptors.request.use(undefined, (error)=>{
//     if(error.message === "Request failed with status code 400" || error.message === `can't access property "data", resolve is undefined`){
//         toast.error("Please add a name")
//     }
// })
const getting = () => {
  console.log('>>Getting AXIOS')
  const axiosBase = axios.get(`${url}api/data`)
  return  axiosBase.then(resolve => resolve.data)
}

const posting = (objectBase) => {
  const axiosBase = axios.post(`${url}api/data`, objectBase)
  const validation = axiosBase.then(resolve => resolve.data)
  return validation
}

const deleting = (id) => {
  const axiosBase = axios.delete(`${url}api/data/${id}`)
  return axiosBase
}

const putting = (id, cambio) => {
  console.log('>>PUTTING AXIOS')
  const axiosBase = axios.put(`${url}api/data/${id}`, cambio)
  return axiosBase
}
export const notesPhonebook = { getting, posting, deleting, putting }