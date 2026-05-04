const express = require('express')
const router = express.Router()
const prisma = require('../lib/db')

// GET all payments
router.get('/', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { lease: true }
    })
    res.json(payments)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' })
  }
})

// GET single payment
router.get('/:id', async (req, res) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: req.params.id },
      include: { lease: true }
    })
    if (!payment) return res.status(404).json({ error: 'Payment not found' })
    res.json(payment)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment' })
  }
})

// POST create payment
router.post('/', async (req, res) => {
  try {
    const { leaseId, amount, paidOn, method } = req.body
    const payment = await prisma.payment.create({
      data: {
        leaseId,
        amount,
        paidOn: new Date(paidOn),
        method
      }
    })
    res.status(201).json(payment)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' })
  }
})

// PUT update payment
router.put('/:id', async (req, res) => {
  try {
    const { amount, paidOn, method, status } = req.body
    const payment = await prisma.payment.update({
      where: { id: req.params.id },
      data: {
        amount,
        paidOn: paidOn ? new Date(paidOn) : undefined,
        method,
        status
      }
    })
    res.json(payment)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment' })
  }
})

// DELETE payment
router.delete('/:id', async (req, res) => {
  try {
    await prisma.payment.delete({ where: { id: req.params.id } })
    res.json({ message: 'Payment deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete payment' })
  }
})

module.exports = router