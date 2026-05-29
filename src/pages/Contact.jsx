import { useState } from 'react'
import { Mail, Phone, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    try {
      // Simulate sending - in real app, this would go to Firebase
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-neutral-600">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Emergency Info */}
        <div className="card border-2 border-red-200 bg-red-50">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="font-bold text-lg text-red-900">Emergency?</h3>
          </div>
          <p className="text-red-700 mb-4">
            If you've spotted an injured or stray animal, please report it immediately.
          </p>
          <a href="/report" className="btn-primary bg-red-500 text-white hover:bg-red-600 w-full text-center">
            Report Emergency
          </a>
        </div>

        {/* Email Contact */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-primary-600" />
            <h3 className="font-bold text-lg">Email</h3>
          </div>
          <p className="text-neutral-600 mb-2">General inquiries:</p>
          <a href="mailto:info@strayrescue.com" className="text-primary-600 hover:text-primary-700 font-medium">
            info@strayrescue.com
          </a>
          <p className="text-neutral-600 mt-4 mb-2">Rescue team issues:</p>
          <a href="mailto:rescue@strayrescue.com" className="text-primary-600 hover:text-primary-700 font-medium">
            rescue@strayrescue.com
          </a>
        </div>

        {/* Phone Contact */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-primary-600" />
            <h3 className="font-bold text-lg">Phone</h3>
          </div>
          <p className="text-neutral-600 mb-2">24/7 Emergency Hotline:</p>
          <a href="tel:+977-1-4123456" className="text-primary-600 hover:text-primary-700 font-medium text-lg">
            +977-1-4123456
          </a>
          <p className="text-neutral-600 mt-4 mb-2">Office hours:</p>
          <p className="text-neutral-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="input-field"
                required
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <p className="text-sm text-neutral-500 mt-4 text-center">
            * Required fields. We'll respond to your message within 24 hours.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="section-title text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-bold text-lg mb-2">How fast are rescue responses?</h3>
            <p className="text-neutral-600">
              Response times depend on the location and availability of rescue teams. Emergency situations are prioritized and typically receive response within 1-2 hours in urban areas.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2">Is the service free?</h3>
            <p className="text-neutral-600">
              Yes, reporting animal emergencies through our platform is completely free. We're a community-driven initiative dedicated to animal welfare.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2">Can I track a rescue report?</h3>
            <p className="text-neutral-600">
              After submitting a report, you'll receive a confirmation. For detailed updates on your specific case, please provide your contact information and a rescue coordinator will follow up with you.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-lg mb-2">How do I become a rescue team member?</h3>
            <p className="text-neutral-600">
              Contact us at rescue@strayrescue.com or call our hotline. We're always looking for dedicated volunteers and professional rescue organizations to join our network.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
