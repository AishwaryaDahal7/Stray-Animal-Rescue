import { Heart, Target, Users, Lightbulb } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          About Us
        </h1>
        <p className="text-xl text-neutral-600">
          Learn about our mission to protect and rescue stray animals
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="section-title">Our Mission</h2>
          <p className="text-neutral-700 mb-4">
            Stray Animal Rescue Connect was created to address the urgent need for rapid, coordinated animal rescue operations. We believe that every animal, regardless of their circumstances, deserves compassion and professional care.
          </p>
          <p className="text-neutral-700 mb-4">
            Our platform connects concerned citizens with dedicated rescue teams and centers, enabling quick response to animal emergencies. We're committed to reducing animal suffering and building a more compassionate society.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1552053831-71594a27c62d?w=500&h=400&fit=crop" 
            alt="Our Mission" 
            className="rounded-lg shadow-md mt-6 w-full object-cover"
          />
        </div>
        <div className="bg-primary-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">Why This Matters</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-accent-500 font-bold">•</span>
              <span>Thousands of animals are abandoned or injured daily</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-500 font-bold">•</span>
              <span>Quick intervention can save lives</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-500 font-bold">•</span>
              <span>Community action multiplies rescue capacity</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-500 font-bold">•</span>
              <span>Professional treatment ensures animal welfare</span>
            </li>
          </ul>
        </div>
      </div>

      {/* How It Works for Users */}
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">For Public Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">See an Animal in Need?</h3>
            <p className="text-neutral-600">
              Use our simple form to report the animal's location, condition, and details. Your information helps rescuers respond quickly.
            </p>
          </div>
          <div className="card">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Find Local Help</h3>
            <p className="text-neutral-600">
              Browse our directory of rescue centers and organizations. Find contact information and services offered in your area.
            </p>
          </div>
          <div className="card">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Make a Difference</h3>
            <p className="text-neutral-600">
              Your reports and support directly contribute to animal rescue operations and welfare.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works for Rescue Teams */}
      <div className="mb-16">
        <h2 className="section-title text-center mb-8">For Rescue Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Receive Reports</h3>
            <p className="text-neutral-600">
              Access a dashboard showing all incoming rescue reports with location, animal details, and reporter contact information.
            </p>
          </div>
          <div className="card">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Track Operations</h3>
            <p className="text-neutral-600">
              Manage rescue reports efficiently. Update status from pending to in-progress to rescued to closed.
            </p>
          </div>
          <div className="card">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Optimize Response</h3>
            <p className="text-neutral-600">
              Use location data to prioritize nearby animals and coordinate efficient rescue operations.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-12 mb-16">
        <h2 className="section-title text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-2">🐾</div>
            <h3 className="font-bold text-lg mb-2">Compassion</h3>
            <p className="text-neutral-600 text-sm">Every animal matters and deserves care</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-bold text-lg mb-2">Speed</h3>
            <p className="text-neutral-600 text-sm">Quick response saves lives</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🤝</div>
            <h3 className="font-bold text-lg mb-2">Community</h3>
            <p className="text-neutral-600 text-sm">Together we're stronger</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">✨</div>
            <h3 className="font-bold text-lg mb-2">Transparency</h3>
            <p className="text-neutral-600 text-sm">Open communication builds trust</p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center">
        <h2 className="section-title">Questions? Get in Touch</h2>
        <p className="text-neutral-600 mb-6">
          Have questions about how Stray Animal Rescue Connect works? Reach out to us.
        </p>
        <a href="/contact" className="btn-primary px-8 py-3 text-lg">
          Contact Us
        </a>
      </div>
    </div>
  )
}

// Icon components inline
function AlertCircle() {
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
}

function MapPin() {
  return <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
}
