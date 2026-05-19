function Amenities() {
  const categories = [
    {
      title: 'Community Spaces',
      items: [
        { icon: '🏊', name: 'Resort Style Pool', desc: 'Heated pool and spa with lounge seating and cabanas' },
        { icon: '🏋️', name: 'Fitness Center', desc: 'State of the art cardio and weight equipment, open 24/7' },
        { icon: '🎮', name: 'Resident Lounge', desc: 'Game room, co-working space, and entertainment area' },
        { icon: '🌿', name: 'Outdoor Courtyard', desc: 'Landscaped courtyard with seating and BBQ grills' },
      ]
    },
    {
      title: 'Convenience',
      items: [
        { icon: '🚗', name: 'Covered Parking', desc: 'Reserved covered parking spot included with every unit' },
        { icon: '📦', name: 'Package Lockers', desc: '24/7 secure package receiving so you never miss a delivery' },
        { icon: '🧺', name: 'In-Unit Laundry', desc: 'Full size washer and dryer connections in every unit' },
        { icon: '🛗', name: 'Elevator Access', desc: 'Elevator access in all buildings' },
      ]
    },
    {
      title: 'Security & Safety',
      items: [
        { icon: '🔒', name: 'Gated Entry', desc: 'Controlled access gate with key fob entry' },
        { icon: '📹', name: 'Security Cameras', desc: '24/7 camera monitoring throughout the community' },
        { icon: '💡', name: 'Well Lit Grounds', desc: 'Fully illuminated pathways and parking areas' },
        { icon: '🚨', name: 'Emergency Maintenance', desc: '24/7 emergency maintenance response team' },
      ]
    },
    {
      title: 'Pet Amenities',
      items: [
        { icon: '🐾', name: 'Pet Friendly', desc: 'Cats and dogs welcome, breed restrictions may apply' },
        { icon: '🦮', name: 'Dog Park', desc: 'On-site fenced dog park for off-leash play' },
        { icon: '🛁', name: 'Pet Wash Station', desc: 'Outdoor pet washing and grooming station' },
        { icon: '🌳', name: 'Walking Trails', desc: 'Scenic walking paths around the community' },
      ]
    }
  ]

  return (
    <div>
      {/* Header */}
      <div style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>Amenities</h1>
        <p style={{ color: '#aaa', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
          Everything you need for a life well lived, all in one place
        </p>
      </div>

      {/* Amenity Categories */}
      <div style={{ padding: '80px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        {categories.map(category => (
          <div key={category.title} style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid #f0f0f0' }}>
              {category.title}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '20px'
            }}>
              {category.items.map(item => (
                <div key={item.name} style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
                }}>
                  <span style={{ fontSize: '32px' }}>{item.icon}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '12px 0 8px' }}>{item.name}</h3>
                  <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Amenities