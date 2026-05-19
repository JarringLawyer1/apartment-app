import { useState, useEffect } from 'react'
import { getUnits } from '../../api'
import { Link } from 'react-router-dom'

function FloorPlans() {
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await getUnits()
        setUnits(response.data.filter(u => u.status === 'vacant'))
      } catch {
        console.error('Failed to load units')
      } finally {
        setLoading(false)
      }
    }
    fetchUnits()
  }, [])

  const filteredUnits = filter === 'all'
    ? units
    : units.filter(u => u.bedrooms === parseInt(filter))

  const bedroomOptions = [...new Set(units.map(u => u.bedrooms))].sort()

  return (
    <div style={{ padding: '80px 40px', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '8px' }}>Floor Plans</h1>
      <p style={{ color: '#888', fontSize: '16px', marginBottom: '40px' }}>
        {units.length} available unit{units.length !== 1 ? 's' : ''} ready for move-in
      </p>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '8px 20px',
            borderRadius: '20px',
            border: '1px solid #1a1a1a',
            backgroundColor: filter === 'all' ? '#1a1a1a' : 'white',
            color: filter === 'all' ? 'white' : '#1a1a1a',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          All
        </button>
        {bedroomOptions.map(bed => (
          <button
            key={bed}
            onClick={() => setFilter(bed.toString())}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid #1a1a1a',
              backgroundColor: filter === bed.toString() ? '#1a1a1a' : 'white',
              color: filter === bed.toString() ? 'white' : '#1a1a1a',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {bed} Bed{bed !== 1 ? 's' : ''}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading available units...</p>
      ) : filteredUnits.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ fontSize: '18px', color: '#888' }}>No units available with this filter.</p>
          <p style={{ color: '#aaa', marginTop: '8px' }}>Check back soon or contact us to join the waitlist.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredUnits.map(unit => (
            <div key={unit.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              {/* Unit image placeholder */}
              <div style={{
                backgroundColor: '#e8f0f3',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}>
                🏠
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Unit {unit.unitNumber}</h3>
                    <p style={{ color: '#888', fontSize: '14px' }}>{unit.bedrooms} Bedroom{unit.bedrooms !== 1 ? 's' : ''}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '22px', fontWeight: '700', color: '#4a90a4' }}>${unit.rentAmount}</p>
                    <p style={{ color: '#aaa', fontSize: '12px' }}>/month</p>
                  </div>
                </div>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#e8f5e9',
                  color: '#27ae60',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Available Now
                </div>
                <Link to="/contact" style={{
                  display: 'block',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  Request a Tour
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FloorPlans