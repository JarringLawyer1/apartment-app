import { useState, useEffect } from 'react'
import { getMaintenanceRequests, createMaintenanceRequest, updateMaintenanceRequest, deleteMaintenanceRequest, getLeases } from '../api'

function Maintenance() {
  const [requests, setRequests] = useState([])
  const [leases, setLeases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingRequest, setEditingRequest] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [formData, setFormData] = useState({
    leaseId: '',
    title: '',
    priority: 'low'
  })

  const fetchData = async () => {
    try {
      const [requestsRes, leasesRes] = await Promise.all([
        getMaintenanceRequests(),
        getLeases()
      ])
      setRequests(requestsRes.data)
      setLeases(leasesRes.data)
    } catch {
      setError('Failed to load maintenance requests')
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
      if (editingRequest) {
        await updateMaintenanceRequest(editingRequest.id, formData)
      } else {
        await createMaintenanceRequest(formData)
      }
      setFormData({ leaseId: '', title: '', priority: 'low' })
      setShowForm(false)
      setEditingRequest(null)
      fetchData()
    } catch {
      setError('Failed to save maintenance request')
    }
  }

  const handleEdit = (request) => {
    setEditingRequest(request)
    setFormData({
      leaseId: request.leaseId,
      title: request.title,
      priority: request.priority
    })
    setShowForm(true)
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateMaintenanceRequest(id, { status: newStatus })
      fetchData()
    } catch {
      setError('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return
    try {
      await deleteMaintenanceRequest(id)
      fetchData()
    } catch {
      setError('Failed to delete request')
    }
  }

  const getLeaseName = (leaseId) => {
    const lease = leases.find(l => l.id === leaseId)
    if (!lease) return 'Unknown'
    return `Unit ${lease.unit?.unitNumber} — ${lease.tenant?.fullName}`
  }

  const priorityColor = (priority) => {
    if (priority === 'high') return '#e74c3c'
    if (priority === 'medium') return '#f39c12'
    return '#3498db'
  }

  const statusColor = (status) => {
    if (status === 'open') return '#e74c3c'
    if (status === 'in_progress') return '#f39c12'
    return '#27ae60'
  }

  const filteredRequests = filterStatus === 'all'
    ? requests
    : requests.filter(r => r.status === filterStatus)

  if (loading) return <p>Loading maintenance requests...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>Maintenance Requests</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            {requests.filter(r => r.status === 'open').length} open · {requests.filter(r => r.status === 'in_progress').length} in progress · {requests.filter(r => r.status === 'closed').length} closed
          </p>
        </div>
        <button
          onClick={() => {
            setEditingRequest(null)
            setFormData({ leaseId: '', title: '', priority: 'low' })
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
          {showForm ? 'Cancel' : '+ New Request'}
        </button>
      </div>

      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['all', 'open', 'in_progress', 'closed'].map(status => (
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
            {status === 'all' ? 'All' : status.replace('_', ' ')}
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
          <h2>{editingRequest ? 'Edit Request' : 'New Request'}</h2>
          <select
            value={formData.leaseId}
            onChange={(e) => setFormData({ ...formData, leaseId: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Select a lease</option>
            {leases.map(l => (
              <option key={l.id} value={l.id}>
                Unit {l.unit?.unitNumber} — {l.tenant?.fullName}
              </option>
            ))}
          </select>
          <input
            placeholder="Describe the issue"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
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
            {editingRequest ? 'Update Request' : 'Submit Request'}
          </button>
        </form>
      )}

      {filteredRequests.length === 0 ? (
        <p>No {filterStatus === 'all' ? '' : filterStatus.replace('_', ' ')} requests found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredRequests.map(request => (
            <div key={request.id} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderLeft: `4px solid ${priorityColor(request.priority)}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <h3>{request.title}</h3>
                    <span style={{
                      backgroundColor: priorityColor(request.priority),
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      textTransform: 'capitalize'
                    }}>
                      {request.priority}
                    </span>
                  </div>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>
                    🏠 {getLeaseName(request.leaseId)}
                  </p>
                  <p style={{ color: '#999', fontSize: '12px' }}>
                    Submitted {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    style={{
                      padding: '6px',
                      borderRadius: '4px',
                      border: `2px solid ${statusColor(request.status)}`,
                      color: statusColor(request.status),
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button
                    onClick={() => handleEdit(request)}
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
                    onClick={() => handleDelete(request.id)}
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

export default Maintenance