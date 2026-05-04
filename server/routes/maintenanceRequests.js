const express = require('express')
const router = express.Router()
const prisma = require('../lib/db')

// GET all maintenance requests
router.get('/', async (req, res) => {
  try {
    const requests = await prisma.maintenanceRequest.findMany({
      include: { lease: true }
    })
    res.json(requests)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch maintenance requests' })
  }
})

// GET single maintenance request
router.get('/:id', async (req, res) => {
  try {
    const request = await prisma.maintenanceRequest.findUnique({
      where: { id: req.params.id },
      include: { lease: true }
    })
    if (!request) return res.status(404).json({ error: 'Request not found' })
    res.json(request)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch maintenance request' })
  }
})

// POST create maintenance request
router.post('/', async (req, res) => {
  try {
    const { leaseId, title, priority } = req.body
    const request = await prisma.maintenanceRequest.create({
      data: { leaseId, title, priority }
    })
    res.status(201).json(request)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create maintenance request' })
  }
})

// PUT update maintenance request
router.put('/:id', async (req, res) => {
  try {
    const { title, priority, status } = req.body
    const request = await prisma.maintenanceRequest.update({
      where: { id: req.params.id },
      data: { title, priority, status }
    })
    res.json(request)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update maintenance request' })
  }
})

// DELETE maintenance request
router.delete('/:id', async (req, res) => {
  try {
    await prisma.maintenanceRequest.delete({ where: { id: req.params.id } })
    res.json({ message: 'Maintenance request deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete maintenance request' })
  }
})

module.exports = router