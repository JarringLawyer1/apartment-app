import { useState, useEffect } from 'react'
import { getTenants, createTenant, deleteTenant, archiveTenant, reactivateTenant } from '../api'
function Tenants() {
  const [tenants, setTenants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showArchived, setShowArchived] = useState(false)
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

  const handleArchive = async (id) => {
    if (!window.confirm('Are you sure you want to archive this tenant?')) return
    try {
      await archiveTenant(id)
      fetchTenants()
    } catch {
      setError('Failed to archive tenant')
    }
  }
  
  const handleReactivate = async (id) => {
  if (!window.confirm('Reactivate this tenant?')) return
  try {
    await reactivateTenant(id)
    fetchTenants()
  } catch {
    setError('Failed to reactivate tenant')
  }
}

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this tenant? This cannot be undone.')) return
    try {
      await deleteTenant(id)
      fetchTenants()
    } catch {
      setError('Failed to delete tenant')
    }
  }

  const activeTenants = tenants.filter(t => t.status === 'active')
  const archivedTenants = tenants.filter(t => t.status === 'archived')
  const displayedTenants = showArchived ? archivedTenants : activeTenants

  if (loading) return <p>Loading tenants...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Tenants</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {activeTenants.length} active · {archivedTenants.length} archived
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowArchived(!showArchived)}
            style={{
              backgroundColor: showArchived ? '#7f8c8d' : 'white',
              color: showArchived ? 'white' : '#2c3e50',
              border: '1px solid #2c3e50',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {showArchived ? 'Show Active' : 'Show Archived'}
          </button>
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

      {displayedTenants.length === 0 ? (
        <p>{showArchived ? 'No archived tenants.' : 'No active tenants. Add your first one!'}</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {displayedTenants.map(tenant => (
            <div key={tenant.id} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              opacity: tenant.status === 'archived' ? 0.6 : 1
            }}>
              <h2 style={{ marginBottom: '8px' }}>{tenant.fullName}</h2>
              <p style={{ color: '#666', marginBottom: '4px' }}>✉️ {tenant.email}</p>
              <p style={{ color: '#666', marginBottom: '16px' }}>📞 {tenant.phone}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {tenant.status === 'active' ? (
                    <button
                    onClick={() => handleArchive(tenant.id)}
                    style={{
                        backgroundColor: '#f39c12',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    >
                    Archive
                    </button>
                ) : (
                    <button
                    onClick={() => handleReactivate(tenant.id)}
                    style={{
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    >
                    Reactivate
                    </button>
                )}
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tenants