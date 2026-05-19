import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // We'll wire this to a real backend later
    setSubmitted(true)
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>Contact Us</h1>
        <p style={{ color: '#aaa', fontSize: '18px' }}>
          We'd love to hear from you. Reach out and we'll get back to you shortly.
        </p>
      </div>

      <div style={{
        padding: '80px 40px',
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px'
      }}>
        {/* Contact Info */}
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px' }}>Get In Touch</h2>
          {[
            { icon: '📍', title: 'Address', detail: '123 Harbor Drive, Houston, TX 77001' },
            { icon: '📞', title: 'Phone', detail: '(713) 555-0100' },
            { icon: '✉️', title: 'Email', detail: 'info@harborviewresidences.com' },
            { icon: '🕐', title: 'Office Hours', detail: 'Mon–Fri 9am–6pm, Sat 10am–4pm' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
              <span style={{ fontSize: '24px' }}>{item.icon}</span>
              <div>
                <p style={{ fontWeight: '600', marginBottom: '4px' }}>{item.title}</p>
                <p style={{ color: '#888' }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div>
          {submitted ? (
            <div style={{
              backgroundColor: '#e8f5e9',
              padding: '40px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '48px' }}>✅</span>
              <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '16px 0 8px' }}>Message Sent!</h3>
              <p style={{ color: '#666' }}>Thanks for reaching out! We'll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', interest: '', message: '' }) }}
                style={{
                  marginTop: '20px',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '15px' }}
              />
              <input
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '15px' }}
              />
              <input
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '15px' }}
              />
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '15px', color: formData.interest ? '#1a1a1a' : '#aaa' }}
              >
                <option value="">I'm interested in...</option>
                <option value="1bed">1 Bedroom Unit</option>
                <option value="2bed">2 Bedroom Unit</option>
                <option value="3bed">3 Bedroom Unit</option>
                <option value="tour">Scheduling a Tour</option>
                <option value="other">General Inquiry</option>
              </select>
              <textarea
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                required
                style={{ padding: '12px', borderRadius: '6px', border: '1px solid #e0e0e0', fontSize: '15px', resize: 'vertical' }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact