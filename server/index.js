const express = require('express')
const cors = require('cors')
require('dotenv').config()

const propertiesRouter = require('./routes/properties')
const unitsRouter = require('./routes/units')
const tenantsRouter = require('./routes/tenants')
const leasesRouter = require('./routes/leases')
const paymentsRouter = require('./routes/payments')
const maintenanceRouter = require('./routes/maintenanceRequests')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/properties', propertiesRouter)
app.use('/units', unitsRouter)
app.use('/tenants', tenantsRouter)
app.use('/leases', leasesRouter)
app.use('/payments', paymentsRouter)
app.use('/maintenance', maintenanceRouter)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Apartment App API is running!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})