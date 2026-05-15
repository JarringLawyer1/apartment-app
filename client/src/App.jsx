import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import Tenants from './pages/Tenants'
import Units from './pages/Units'

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
        </Routes>
      </div>
    </div>
  )
}

export default App