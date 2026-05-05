import { useState, useEffect } from 'react'
import { getProperties, createProperty, deleteProperty } from '../api'

function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    unitCount: ''
  })

  const fetchProperties = async () => {
    try {
      const response = await getProperties()
      setProperties(response.data)
    } catch {
      setError('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createProperty({
        ...formData,
        unitCount: parseInt(formData.unitCount)
      })
      setFormData({ name: '', address: '', unitCount: '' })
      setShowForm(false)
      fetchProperties()
    } catch {
      setError('Failed to create property')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return
    try {
      await deleteProperty(id)
      fetchProperties()
    } catch {
      setError('Failed to delete property')
    }
  }

  if (loading) return <p>Loading properties...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Properties</h1>
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
          {showForm ? 'Cancel' : '+ Add Property'}
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
          <h2>New Property</h2>
          <input
            placeholder="Property name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            placeholder="Number of units"
            type="number"
            value={formData.unitCount}
            onChange={(e) => setFormData({ ...formData, unitCount: e.target.value })}
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
            Save Property
          </button>
        </form>
      )}

      {properties.length === 0 ? (
        <p>No properties yet. Add your first one!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {properties.map(property => (
            <div key={property.id} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ marginBottom: '8px' }}>{property.name}</h2>
              <p style={{ color: '#666', marginBottom: '4px' }}>📍 {property.address}</p>
              <p style={{ color: '#666', marginBottom: '16px' }}>🏠 {property.unitCount} units</p>
              <button
                onClick={() => handleDelete(property.id)}
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

export default Properties