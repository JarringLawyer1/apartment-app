const express = require('express')
const router = express.Router()
const prisma = require('../lib/db')

// GET all tenants
router.get('/', async (req, res) => {
  try {
    const tenants = await prisma.tenant.findMany()
    res.json(tenants)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tenants' })
  }
})

// GET single tenant
router.get('/:id', async (req, res) => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.params.id },
      include: { leases: true }
    })
    if (!tenant) return res.status(404).json({ error: 'Tenant not found' })
    res.json(tenant)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tenant' })
  }
})

// POST create tenant
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone } = req.body
    const tenant = await prisma.tenant.create({
      data: { fullName, email, phone }
    })
    res.status(201).json(tenant)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tenant' })
  }
})

// PUT update tenant
router.put('/:id', async (req, res) => {
  try {
    const { fullName, email, phone } = req.body
    const tenant = await prisma.tenant.update({
      where: { id: req.params.id },
      data: { fullName, email, phone }
    })
    res.json(tenant)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tenant' })
  }
})

// DELETE tenant
router.delete('/:id', async (req, res) => {
  try {
    await prisma.tenant.delete({ where: { id: req.params.id } })
    res.json({ message: 'Tenant deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tenant' })
  }
})

// PATCH archive tenant
router.patch('/:id/archive', async (req, res) => {
  try {
    const tenant = await prisma.tenant.update({
      where: { id: req.params.id },
      data: { status: 'archived' }
    })
    res.json(tenant)
  } catch {
    res.status(500).json({ error: 'Failed to archive tenant' })
  }
})

// PATCH reactivate tenant
router.patch('/:id/reactivate', async (req, res) => {
  try {
    const tenant = await prisma.tenant.update({
      where: { id: req.params.id },
      data: { status: 'active' }
    })
    res.json(tenant)
  } catch {
    res.status(500).json({ error: 'Failed to reactivate tenant' })
  }
})

module.exports = router