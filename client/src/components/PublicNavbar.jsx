import { Link, useLocation } from 'react-router-dom'

function PublicNavbar() {
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/floor-plans', label: 'Floor Plans' },
    { path: '/amenities', label: 'Amenities' },
    { path: '/contact', label: 'Contact Us' },
  ]

  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '70px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1a1a1a',
        letterSpacing: '-0.5px'
      }}>
        Harborview<span style={{ color: '#4a90a4', fontWeight: '300' }}> Residences</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: location.pathname === link.path ? '#4a90a4' : '#555',
              fontWeight: location.pathname === link.path ? '600' : '400',
              fontSize: '15px',
              transition: 'color 0.2s'
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/login" style={{
          backgroundColor: '#4a90a4',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Resident Login
        </Link>
      </div>
    </nav>
  )
}

export default PublicNavbar