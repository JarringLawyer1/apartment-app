import { Link } from 'react-router-dom'

function Home() {
  const highlights = [
    { icon: '🏊', title: 'Resort Pool', desc: 'Heated pool and spa open year round' },
    { icon: '🏋️', title: 'Fitness Center', desc: 'State of the art equipment, 24/7 access' },
    { icon: '🚗', title: 'Covered Parking', desc: 'Reserved covered parking for every unit' },
    { icon: '📦', title: 'Package Lockers', desc: 'Secure 24/7 package receiving system' },
    { icon: '🐾', title: 'Pet Friendly', desc: 'Welcoming community for you and your pets' },
    { icon: '🔒', title: 'Gated Community', desc: 'Controlled access for your peace of mind' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '120px 40px',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)'
      }}>
        <p style={{ color: '#4a90a4', letterSpacing: '3px', fontSize: '13px', marginBottom: '16px', textTransform: 'uppercase' }}>
          Welcome to
        </p>
        <h1 style={{ fontSize: '56px', fontWeight: '700', marginBottom: '16px', letterSpacing: '-1px' }}>
          Harborview Residences
        </h1>
        <p style={{ fontSize: '20px', color: '#aaa', maxWidth: '500px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          Modern living designed around you. Experience comfort, community, and convenience.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/floor-plans" style={{
            backgroundColor: '#4a90a4',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            View Floor Plans
          </Link>
          <Link to="/contact" style={{
            backgroundColor: 'transparent',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '6px',
            fontSize: '16px',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        backgroundColor: '#4a90a4',
        padding: '30px 40px',
        display: 'flex',
        justifyContent: 'center',
        gap: '80px'
      }}>
        {[
          { value: '120', label: 'Total Units' },
          { value: '1–3', label: 'Bedrooms' },
          { value: '4.9★', label: 'Resident Rating' },
          { value: '2010', label: 'Est.' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center', color: 'white' }}>
            <p style={{ fontSize: '28px', fontWeight: '700' }}>{stat.value}</p>
            <p style={{ fontSize: '13px', opacity: 0.85 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Highlights Section */}
      <div style={{ padding: '80px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
          Life at Harborview
        </h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '48px', fontSize: '16px' }}>
          Everything you need, right where you live
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {highlights.map(item => (
            <div key={item.title} style={{
              backgroundColor: 'white',
              padding: '32px',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <span style={{ fontSize: '36px' }}>{item.icon}</span>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '12px 0 8px' }}>{item.title}</h3>
              <p style={{ color: '#888', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>
          Ready to find your new home?
        </h2>
        <p style={{ color: '#888', fontSize: '16px', marginBottom: '32px' }}>
          Schedule a tour today and see why residents love living here.
        </p>
        <Link to="/contact" style={{
          backgroundColor: '#1a1a1a',
          color: 'white',
          padding: '14px 40px',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          Get In Touch
        </Link>
      </div>
    </div>
  )
}

export default Home