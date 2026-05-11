import { useState, useEffect } from 'react'
import { getTenants, createTenant, deleteTenant } from '../api'

function Tenants() {
  const [tenants, setTenants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  })

  const fetchTenants = async () => {
    try {
      const response = await getTenants()
      setTenants(response.data)
    } catch {
      setError('Failed to load tenants')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTenants()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTenant(formData)
      setFormData({ fullName: '', email: '', phone: '' })
      setShowForm(false)
      fetchTenants()
    } catch {
      setError('Failed to create tenant')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tenant?')) return
    try {
      await deleteTenant(id)
      fetchTenants()
    } catch {
      setError('Failed to delete tenant')
    }
  }

  if (loading) return <p>Loading tenants...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Tenants</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : '+ Add Tenant'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '400px'
        }}>
          <h2>New Tenant</h2>
          <input
            placeholder="Full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            placeholder="Email address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            placeholder="Phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Save Tenant
          </button>
        </form>
      )}

      {tenants.length === 0 ? (
        <p>No tenants yet. Add your first one!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {tenants.map(tenant => (
            <div key={tenant.id} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ marginBottom: '8px' }}>{tenant.fullName}</h2>
              <p style={{ color: '#666', marginBottom: '4px' }}>✉️ {tenant.email}</p>
              <p style={{ color: '#666', marginBottom: '16px' }}>📞 {tenant.phone}</p>
              <button
                onClick={() => handleDelete(tenant.id)}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tenants