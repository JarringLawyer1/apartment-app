import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const getTenants = () => api.get('/tenants')
export const getTenant = (id) => api.get(`/tenants/${id}`)
export const createTenant = (data) => api.post('/tenants', data)
export const updateTenant = (id, data) => api.put(`/tenants/${id}`, data)
export const deleteTenant = (id) => api.delete(`/tenants/${id}`)
export const archiveTenant = (id) => api.patch(`/tenants/${id}/archive`)
export const reactivateTenant = (id) => api.patch(`/tenants/${id}/reactivate`)
export const createUnit = (data) => api.post('/units', data)
export const updateUnit = (id, data) => api.put(`/units/${id}`, data)
export const deleteUnit = (id) => api.delete(`/units/${id}`)
export const getUnits = () => api.get('/units')
export const createMaintenanceRequest = (data) => api.post('/maintenance', data)
export const updateMaintenanceRequest = (id, data) => api.put(`/maintenance/${id}`, data)
export const deleteMaintenanceRequest = (id) => api.delete(`/maintenance/${id}`)
export const getMaintenanceRequests = () => api.get('/maintenance')
export const getLeases = () => api.get('/leases')
export const getProperties = () => api.get('/properties')
export const getProperty = (id) => api.get(`/properties/${id}`)
export const createProperty = (data) => api.post('/properties', data)
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data)
export const deleteProperty = (id) => api.delete(`/properties/${id}`)