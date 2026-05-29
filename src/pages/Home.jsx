import { Link } from 'react-router-dom'
import { AlertCircle, MapPin, Users, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1587300411515-71e0ba4a8d0e?w=1200&h=600&fit=crop" 
            alt="Animal Rescue" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Save Lives, Rescue Animals
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Report stray, injured, or abused animals and connect with rescue teams in your area
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/report" className="btn-primary bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3 text-lg">
              🚨 Report Emergency
            </Link>
            <Link to="/rescue-centers" className="btn-secondary px-8 py-3 text-lg border-2 border-white text-white hover:bg-white/20">
              📍 Find Rescue Centers
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Report</h3>
              <p className="text-neutral-600 text-sm">
                Report injured, sick, or stray animals with your location and details
              </p>
            </div>

            {/* Step 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">2. Locate</h3>
              <p className="text-neutral-600 text-sm">
                Our system finds nearby rescue centers and teams using your location
              </p>
            </div>

            {/* Step 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Connect</h3>
              <p className="text-neutral-600 text-sm">
                Rescue teams are notified and can quickly respond to help the animal
              </p>
            </div>

            {/* Step 4 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">4. Rescue</h3>
              <p className="text-neutral-600 text-sm">
                Animals receive proper care and treatment at rescue centers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Ready to Help?</h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Every animal deserves care and protection. Whether you've seen an animal in need or you're part of a rescue team, join us in making a difference.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/report" className="btn-primary px-8 py-3 text-lg">
              Report an Animal
            </Link>
            <Link to="/rescue-centers" className="btn-ghost px-8 py-3 text-lg">
              Find Help
            </Link>
            <Link to="/about" className="btn-ghost px-8 py-3 text-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Our Mission</h2>
          <p className="text-lg text-neutral-700 mb-6">
            Stray Animal Rescue Connect is dedicated to protecting vulnerable animals through rapid reporting, community engagement, and efficient rescue operations. We believe every animal deserves compassion and care.
          </p>
          <p className="text-neutral-600">
            This platform bridges the gap between concerned citizens and professional rescue organizations, ensuring that animals in distress receive timely help.
          </p>
        </div>
      </section>
    </div>
  )
}
