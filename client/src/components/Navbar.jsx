import { Link } from 'react-router-dom'

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
      <Link to="/" style={{ color: '#ecf0f1' }}>Dashboard</Link>
      <Link to="/properties" style={{ color: '#ecf0f1' }}>Properties</Link>
      <Link to="/units" style={{ color: '#ecf0f1' }}>Units</Link>
      <Link to="/tenants" style={{ color: '#ecf0f1' }}>Tenants</Link>
      <Link to="/maintenance" style={{ color: '#ecf0f1' }}>Maintenance</Link>
      <Link to="/leases" style={{ color: '#ecf0f1' }}>Leases</Link>
    </nav>
  )
}

export default Navbar