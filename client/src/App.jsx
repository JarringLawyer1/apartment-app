import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import Tenants from './pages/Tenants'
import Units from './pages/Units'
import Maintenance from './pages/Maintenance'
import Leases from './pages/Leases'

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/units" element={<Units />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/leases" element={<Leases />} />
        </Routes>
      </div>
    </div>
  )
}

export default App