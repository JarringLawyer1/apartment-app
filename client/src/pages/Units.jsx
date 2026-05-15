import { useState, useEffect } from 'react'
import { getUnits, getProperties, createUnit, deleteUnit, updateUnit } from '../api'

function Units() {
  const [units, setUnits] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingUnit, setEditingUnit] = useState(null)
  const [formData, setFormData] = useState({
    propertyId: '',
    unitNumber: '',
    bedrooms: '',
    rentAmount: '',
    status: 'vacant'
  })

  const fetchData = async () => {
    try {
      const [unitsRes, propertiesRes] = await Promise.all([
        getUnits(),
        getProperties()
      ])
      setUnits(unitsRes.data)
      setProperties(propertiesRes.data)
    } catch {
      setError('Failed to load units')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUnit) {
        await updateUnit(editingUnit.id, {
          ...formData,
          bedrooms: parseInt(formData.bedrooms),
          rentAmount: parseFloat(formData.rentAmount)
        })
      } else {
        await createUnit({
          ...formData,
          bedrooms: parseInt(formData.bedrooms),
          rentAmount: parseFloat(formData.rentAmount)
        })
      }
      setFormData({ propertyId: '', unitNumber: '', bedrooms: '', rentAmount: '', status: 'vacant' })
      setShowForm(false)
      setEditingUnit(null)
      fetchData()
    } catch {
      setError('Failed to save unit')
    }
  }

  const handleEdit = (unit) => {
    setEditingUnit(unit)
    setFormData({
      propertyId: unit.propertyId,
      unitNumber: unit.unitNumber,
      bedrooms: unit.bedrooms,
      rentAmount: unit.rentAmount,
      status: unit.status
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this unit?')) return
    try {
      await deleteUnit(id)
      fetchData()
    } catch {
      setError('Failed to delete unit')
    }
  }

  const getPropertyName = (propertyId) => {
    const property = properties.find(p => p.id === propertyId)
    return property ? property.name : 'Unknown Property'
  }

  const statusColor = (status) => {
    if (status === 'vacant') return '#27ae60'
    if (status === 'occupied') return '#e74c3c'
    return '#f39c12'
  }

  if (loading) return <p>Loading units...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Units</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {units.filter(u => u.status === 'vacant').length} vacant · {units.filter(u => u.status === 'occupied').length} occupied
          </p>
        </div>
        <button
          onClick={() => {
            setEditingUnit(null)
            setFormData({ propertyId: '', unitNumber: '', bedrooms: '', rentAmount: '', status: 'vacant' })
            setShowForm(!showForm)
          }}
          style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : '+ Add Unit'}
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
          <h2>{editingUnit ? 'Edit Unit' : 'New Unit'}</h2>
          <select
            value={formData.propertyId}
            onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Select a property</option>
            {properties.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input
            placeholder="Unit number (e.g. 101)"
            value={formData.unitNumber}
            onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            placeholder="Number of bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            placeholder="Monthly rent amount"
            type="number"
            value={formData.rentAmount}
            onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="vacant">Vacant</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
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
            {editingUnit ? 'Update Unit' : 'Save Unit'}
          </button>
        </form>
      )}

      {units.length === 0 ? (
        <p>No units yet. Add your first one!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {units.map(unit => (
            <div key={unit.id} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderTop: `4px solid ${statusColor(unit.status)}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h2>Unit {unit.unitNumber}</h2>
                <span style={{
                  backgroundColor: statusColor(unit.status),
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  textTransform: 'capitalize'
                }}>
                  {unit.status}
                </span>
              </div>
              <p style={{ color: '#666', marginBottom: '4px' }}>🏢 {getPropertyName(unit.propertyId)}</p>
              <p style={{ color: '#666', marginBottom: '4px' }}>🛏 {unit.bedrooms} bedroom{unit.bedrooms !== 1 ? 's' : ''}</p>
              <p style={{ color: '#666', marginBottom: '16px' }}>💰 ${unit.rentAmount}/month</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEdit(unit)}
                  style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(unit.id)}
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

export default Units