import { useState, useEffect } from 'react'
import { getLeases, createLease, updateLease, deleteLease, getTenants, getUnits } from '../api'

function Leases() {
  const [leases, setLeases] = useState([])
  const [tenants, setTenants] = useState([])
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingLease, setEditingLease] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [formData, setFormData] = useState({
    unitId: '',
    tenantId: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    status: 'active'
  })

  const fetchData = async () => {
    try {
      const [leasesRes, tenantsRes, unitsRes] = await Promise.all([
        getLeases(),
        getTenants(),
        getUnits()
      ])
      setLeases(leasesRes.data)
      setTenants(tenantsRes.data)
      setUnits(unitsRes.data)
    } catch {
      setError('Failed to load leases')
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
      if (editingLease) {
        await updateLease(editingLease.id, {
          ...formData,
          monthlyRent: parseFloat(formData.monthlyRent)
        })
      } else {
        await createLease({
          ...formData,
          monthlyRent: parseFloat(formData.monthlyRent)
        })
      }
      setFormData({ unitId: '', tenantId: '', startDate: '', endDate: '', monthlyRent: '', status: 'active' })
      setShowForm(false)
      setEditingLease(null)
      fetchData()
    } catch {
      setError('Failed to save lease')
    }
  }

  const handleEdit = (lease) => {
    setEditingLease(lease)
    setFormData({
      unitId: lease.unitId,
      tenantId: lease.tenantId,
      startDate: lease.startDate.split('T')[0],
      endDate: lease.endDate.split('T')[0],
      monthlyRent: lease.monthlyRent,
      status: lease.status
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lease?')) return
    try {
      await deleteLease(id)
      fetchData()
    } catch {
      setError('Failed to delete lease')
    }
  }

  const statusColor = (status) => {
    if (status === 'active') return '#27ae60'
    if (status === 'pending') return '#3498db'
    if (status === 'expired') return '#e74c3c'
    return '#f39c12'
  }

  const filteredLeases = filterStatus === 'all'
    ? leases
    : leases.filter(l => l.status === filterStatus)

  if (loading) return <p>Loading leases...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Leases</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {leases.filter(l => l.status === 'active').length} active · {leases.filter(l => l.status === 'pending').length} pending · {leases.filter(l => l.status === 'expired').length} expired · {leases.filter(l => l.status === 'terminated').length} terminated
        </p>
        </div>
        <button
          onClick={() => {
            setEditingLease(null)
            setFormData({ unitId: '', tenantId: '', startDate: '', endDate: '', monthlyRent: '', status: 'active' })
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
          {showForm ? 'Cancel' : '+ New Lease'}
        </button>
      </div>

      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['all', 'active', 'pending', 'expired', 'terminated'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              backgroundColor: filterStatus === status ? '#2c3e50' : 'white',
              color: filterStatus === status ? 'white' : '#2c3e50',
              border: '1px solid #2c3e50',
              padding: '6px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
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
          <h2>{editingLease ? 'Edit Lease' : 'New Lease'}</h2>
          <select
            value={formData.unitId}
            onChange={(e) => setFormData({ ...formData, unitId: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Select a unit</option>
            {units.map(u => (
                <option key={u.id} value={u.id}>
                    Unit {u.unitNumber} — {u.property?.name} ({u.status})
                </option>
                ))}
          </select>
          <select
            value={formData.tenantId}
            onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Select a tenant</option>
            {tenants.filter(t => t.status === 'active').map(t => (
              <option key={t.id} value={t.id}>{t.fullName}</option>
            ))}
          </select>
          <label style={{ fontSize: '13px', color: '#666' }}>
            Start Date
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', marginTop: '4px' }}
            />
          </label>
          <label style={{ fontSize: '13px', color: '#666' }}>
            End Date
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', marginTop: '4px' }}
            />
          </label>
          <input
            placeholder="Monthly rent amount"
            type="number"
            value={formData.monthlyRent}
            onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {editingLease && (
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="terminated">Terminated</option>
            </select>
          )}
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
            {editingLease ? 'Update Lease' : 'Create Lease'}
          </button>
        </form>
      )}

      {filteredLeases.length === 0 ? (
        <p>No {filterStatus === 'all' ? '' : filterStatus} leases found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredLeases.map(lease => (
            <div key={lease.id} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderLeft: `4px solid ${statusColor(lease.status)}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <h3>Unit {lease.unit?.unitNumber} — {lease.tenant?.fullName}</h3>
                    <span style={{
                      backgroundColor: statusColor(lease.status),
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {lease.status}
                    </span>
                  </div>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>
                    🏢 {lease.unit?.property?.name}
                  </p>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>
                    📅 {new Date(lease.startDate).toLocaleDateString()} — {new Date(lease.endDate).toLocaleDateString()}
                  </p>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    💰 ${lease.monthlyRent}/month
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(lease)}
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
                    onClick={() => handleDelete(lease.id)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Leases