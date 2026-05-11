import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const getTenants = () => api.get('/tenants')
export const getTenant = (id) => api.get(`/tenants/${id}`)
export const createTenant = (data) => api.post('/tenants', data)
export const updateTenant = (id, data) => api.put(`/tenants/${id}`, data)
export const deleteTenant = (id) => api.delete(`/tenants/${id}`)
export const getProperties = () => api.get('/properties')
export const getProperty = (id) => api.get(`/properties/${id}`)
export const createProperty = (data) => api.post('/properties', data)
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data)
export const deleteProperty = (id) => api.delete(`/properties/${id}`)