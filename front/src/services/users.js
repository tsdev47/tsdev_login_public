import axios from 'axios'
const baseUrl = '/api/users'

// eslint-disable-next-line no-unused-vars
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const addUser = (newObject) => {
  const req = axios.post(`${baseUrl}`, newObject)
  return req.then(res => res.data)
}

const allEmails = () => {
  const request = axios.get(`${baseUrl}/emails/`)
  return request.then(response => response.data)
}

const allCompanies = () => {
  const request = axios.get(`${baseUrl}/companies/`)
  return request.then(response => response.data)
}

const allCompanyTaxIds = () => {
  const req = axios.get(`${baseUrl}/tax-ids/`)
  return req.then(res => res.data)
}

export default {
  setToken, addUser, allEmails, allCompanies, allCompanyTaxIds
}