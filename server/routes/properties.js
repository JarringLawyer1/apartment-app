const express = require('express')
const router = express.Router()
const prisma = require('../lib/db')

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await prisma.property.findMany()
    res.json(properties)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' })
  }
})

// GET single property by id
router.get('/:id', async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id }
    })
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    res.json(property)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' })
  }
})

// POST create new property
router.post('/', async (req, res) => {
  try {
    const { name, address, unitCount } = req.body
    const property = await prisma.property.create({
      data: { name, address, unitCount }
    })
    res.status(201).json(property)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create property' })
  }
})

// PUT update property
router.put('/:id', async (req, res) => {
  try {
    const { name, address, unitCount } = req.body
    const property = await prisma.property.update({
      where: { id: req.params.id },
      data: { name, address, unitCount }
    })
    res.json(property)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update property' })
  }
})

// DELETE property
router.delete('/:id', async (req, res) => {
  try {
    await prisma.property.delete({
      where: { id: req.params.id }
    })
    res.json({ message: 'Property deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete property' })
  }
})

module.exports = router