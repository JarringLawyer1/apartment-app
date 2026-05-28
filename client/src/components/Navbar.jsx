import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
        🏢 Apartment Manager
      </span>
      <Link to="/manage/dashboard" style={{ color: '#ecf0f1' }}>Dashboard</Link>
      <Link to="/manage/properties" style={{ color: '#ecf0f1' }}>Properties</Link>
      <Link to="/manage/tenants" style={{ color: '#ecf0f1' }}>Tenants</Link>
      <Link to="/manage/units" style={{ color: '#ecf0f1' }}>Units</Link>
      <Link to="/manage/leases" style={{ color: '#ecf0f1' }}>Leases</Link>
      <Link to="/manage/maintenance" style={{ color: '#ecf0f1' }}>Maintenance</Link>
      <div style={{ marginLeft: 'auto' }}>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  )
}

export default Navbar