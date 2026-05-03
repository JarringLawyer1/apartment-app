const express = require('express')
const cors = require('cors')
require('dotenv').config()

const propertiesRouter = require('./routes/properties')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/properties', propertiesRouter)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Apartment App API is running!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})