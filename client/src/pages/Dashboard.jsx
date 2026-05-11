import { useState, useEffect } from 'react'
import { getProperties, getTenants, getUnits, getMaintenanceRequests } from '../api'

function StatCard({ title, value, icon, color }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${color}`,
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      <span style={{ fontSize: '32px' }}>{icon}</span>
      <div>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>{title}</p>
        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50' }}>{value}</p>
      </div>
    </div>
  )
}

function Dashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUnits: 0,
    vacantUnits: 0,
    occupiedUnits: 0,
    totalTenants: 0,
    openMaintenanceRequests: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [properties, tenants, units, maintenance] = await Promise.all([
          getProperties(),
          getTenants(),
          getUnits(),
          getMaintenanceRequests()
        ])

        const allUnits = units.data
        const vacantUnits = allUnits.filter(u => u.status === 'vacant').length
        const occupiedUnits = allUnits.filter(u => u.status === 'occupied').length
        const openRequests = maintenance.data.filter(r => r.status === 'open').length

        setStats({
          totalProperties: properties.data.length,
          totalUnits: allUnits.length,
          vacantUnits,
          occupiedUnits,
          totalTenants: tenants.data.filter(t => t.status === 'active').length,
          openMaintenanceRequests: openRequests
        })
      } catch {
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <p>Loading dashboard...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h1 style={{ marginBottom: '8px' }}>Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Welcome back! Here's what's happening today.</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <StatCard
          title="Total Properties"
          value={stats.totalProperties}
          icon="🏢"
          color="#2c3e50"
        />
        <StatCard
          title="Total Units"
          value={stats.totalUnits}
          icon="🏠"
          color="#3498db"
        />
        <StatCard
          title="Vacant Units"
          value={stats.vacantUnits}
          icon="🟢"
          color="#27ae60"
        />
        <StatCard
          title="Occupied Units"
          value={stats.occupiedUnits}
          icon="🔴"
          color="#e74c3c"
        />
        <StatCard
          title="Active Tenants"
          value={stats.totalTenants}
          icon="👥"
          color="#9b59b6"
        />
        <StatCard
          title="Open Maintenance"
          value={stats.openMaintenanceRequests}
          icon="🔧"
          color="#e67e22"
        />
      </div>
    </div>
  )
}

export default Dashboard