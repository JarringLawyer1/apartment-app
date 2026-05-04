const express = require('express')
const router = express.Router()
const prisma = require('../lib/db')

// GET all leases
router.get('/', async (req, res) => {
  try {
    const leases = await prisma.lease.findMany({
      include: { unit: true, tenant: true }
    })
    res.json(leases)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leases' })
  }
})

// GET single lease
router.get('/:id', async (req, res) => {
  try {
    const lease = await prisma.lease.findUnique({
      where: { id: req.params.id },
      include: { unit: true, tenant: true, payments: true }
    })
    if (!lease) return res.status(404).json({ error: 'Lease not found' })
    res.json(lease)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lease' })
  }
})

// POST create lease
router.post('/', async (req, res) => {
  try {
    const { unitId, tenantId, startDate, endDate, monthlyRent } = req.body
    const lease = await prisma.lease.create({
      data: {
        unitId,
        tenantId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        monthlyRent
      }
    })
    res.status(201).json(lease)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lease' })
  }
})

// PUT update lease
router.put('/:id', async (req, res) => {
  try {
    const { startDate, endDate, monthlyRent, status } = req.body
    const lease = await prisma.lease.update({
      where: { id: req.params.id },
      data: {
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        monthlyRent,
        status
      }
    })
    res.json(lease)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lease' })
  }
})

// DELETE lease
router.delete('/:id', async (req, res) => {
  try {
    await prisma.lease.delete({ where: { id: req.params.id } })
    res.json({ message: 'Lease deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lease' })
  }
})

module.exports = router