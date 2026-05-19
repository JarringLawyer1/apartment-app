import { Outlet } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar'

function PublicLayout() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <PublicNavbar />
      <main>
        <Outlet />
      </main>
      <footer style={{
        backgroundColor: '#1a1a1a',
        color: '#999',
        padding: '40px',
        textAlign: 'center',
        fontSize: '14px',
        marginTop: '80px'
      }}>
        <p style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          Harborview Residences
        </p>
        <p>123 Harbor Drive, Houston, TX 77001</p>
        <p style={{ marginTop: '8px' }}>© 2026 Harborview Residences. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default PublicLayout