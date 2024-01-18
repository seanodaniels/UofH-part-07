import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'

const retrieve = () => {
  const request = axios.get(`${baseURL}/api/all`)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(response => response.data)
}

export default { retrieve, create, update, remove }