import { Routes, Route } from 'react-router-dom'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import ManagementLayout from './layouts/ManagementLayout'

// Public pages
import Home from './pages/public/Home'
import FloorPlans from './pages/public/FloorPlans'
import Amenities from './pages/public/Amenities'
import Contact from './pages/public/Contact'
import Login from './pages/public/Login'

// Management pages
import Dashboard from './pages/Dashboard'
import Properties from './pages/Properties'
import Tenants from './pages/Tenants'
import Units from './pages/Units'
import Leases from './pages/Leases'
import Maintenance from './pages/Maintenance'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/floor-plans" element={<FloorPlans />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Management routes */}
      <Route path="/manage" element={<ManagementLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="units" element={<Units />} />
        <Route path="leases" element={<Leases />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Route>
    </Routes>
  )
}

export default App