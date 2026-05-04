const express = require('express')
const router = express.Router()
const prisma = require('../lib/db')

// GET all units
router.get('/', async (req, res) => {
  try {
    const units = await prisma.unit.findMany({
      include: { property: true }
    })
    res.json(units)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch units' })
  }
})

// GET single unit
router.get('/:id', async (req, res) => {
  try {
    const unit = await prisma.unit.findUnique({
      where: { id: req.params.id },
      include: { property: true }
    })
    if (!unit) return res.status(404).json({ error: 'Unit not found' })
    res.json(unit)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch unit' })
  }
})

// POST create unit
router.post('/', async (req, res) => {
  try {
    const { propertyId, unitNumber, bedrooms, rentAmount } = req.body
    const unit = await prisma.unit.create({
      data: { propertyId, unitNumber, bedrooms, rentAmount }
    })
    res.status(201).json(unit)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create unit' })
  }
})

// PUT update unit
router.put('/:id', async (req, res) => {
  try {
    const { unitNumber, bedrooms, rentAmount, status } = req.body
    const unit = await prisma.unit.update({
      where: { id: req.params.id },
      data: { unitNumber, bedrooms, rentAmount, status }
    })
    res.json(unit)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update unit' })
  }
})

// DELETE unit
router.delete('/:id', async (req, res) => {
  try {
    await prisma.unit.delete({ where: { id: req.params.id } })
    res.json({ message: 'Unit deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete unit' })
  }
})

module.exports = router