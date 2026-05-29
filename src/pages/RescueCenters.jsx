import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, AlertCircle } from 'lucide-react'
import Map from '../components/Map'
import { rescueCenters } from '../data/rescueCenters'
import { calculateDistance } from '../utils/distance'

export default function RescueCenters() {
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCenter, setSelectedCenter] = useState(null)
  const [viewType, setViewType] = useState('list') // 'list' or 'map'

  // Get unique cities
  const cities = [...new Set(rescueCenters.map(center => center.city))]

  // Get unique services
  const allServices = [...new Set(rescueCenters.flatMap(center => center.services))]

  // Filter centers
  const filteredCenters = rescueCenters.filter(center => {
    const matchCity = !selectedCity || center.city === selectedCity
    const matchService = !selectedService || center.services.includes(selectedService)
    const matchSearch = !searchQuery || 
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchCity && matchService && matchSearch
  })

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-400 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rescue Centers Directory</h1>
          <p className="text-xl">Find and connect with rescue centers and organizations near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* View Type Toggle */}
        <div className="flex gap-2 mb-8 justify-center">
          <button
            onClick={() => setViewType('list')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              viewType === 'list'
                ? 'btn-primary'
                : 'btn-ghost'
            }`}
          >
            📋 List View
          </button>
          <button
            onClick={() => setViewType('map')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              viewType === 'map'
                ? 'btn-primary'
                : 'btn-ghost'
            }`}
          >
            🗺️ Map View
          </button>
        </div>

        {/* Map View */}
        {viewType === 'map' && (
          <div className="mb-12">
            <Map centers={filteredCenters} onMarkerClick={setSelectedCenter} />
            {selectedCenter && (
              <div className="mt-6 card">
                <h3 className="text-2xl font-bold mb-4">{selectedCenter.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-neutral-600 mb-2"><strong>Address:</strong></p>
                    <p className="text-neutral-700">{selectedCenter.address}</p>
                  </div>
                  <div>
                    <p className="text-neutral-600 mb-2"><strong>Hours:</strong></p>
                    <p className="text-neutral-700">{selectedCenter.hours}</p>
                  </div>
                  <div>
                    <p className="text-neutral-600 mb-2"><strong>Phone:</strong></p>
                    <a href={`tel:${selectedCenter.phone}`} className="text-primary-600 hover:text-primary-700 font-medium">
                      {selectedCenter.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-neutral-600 mb-2"><strong>Email:</strong></p>
                    <a href={`mailto:${selectedCenter.email}`} className="text-primary-600 hover:text-primary-700 font-medium">
                      {selectedCenter.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-neutral-600 mb-2"><strong>Services:</strong></p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCenter.services.map(service => (
                        <span key={service} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedCenter.emergencyAvailable && (
                    <div className="col-span-1 md:col-span-2">
                      <div className="bg-green-50 border border-green-200 rounded p-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">24/7 Emergency Services Available</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <a href={`tel:${selectedCenter.phone}`} className="btn-primary">
                    <Phone className="w-4 h-4 inline mr-2" /> Call Now
                  </a>
                  <a href={`mailto:${selectedCenter.email}`} className="btn-secondary">
                    <Mail className="w-4 h-4 inline mr-2" /> Email
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* List View */}
        {viewType === 'list' && (
          <>
            {/* Filters */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Filter Centers</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field"
                    placeholder="Search by name or address..."
                  />
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Service Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Services</option>
                    {allServices.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 text-sm text-neutral-600">
                Found {filteredCenters.length} center{filteredCenters.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Centers Grid */}
            {filteredCenters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCenters.map(center => (
                  <div key={center.id} className="card flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{center.name}</h3>
                      <div className="flex items-start gap-2 text-neutral-600 text-sm mb-3">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{center.address}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-4 flex-grow">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary-600" />
                        <a href={`tel:${center.phone}`} className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          {center.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary-600" />
                        <a href={`mailto:${center.email}`} className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          {center.email}
                        </a>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-600">{center.hours}</span>
                      </div>

                      {/* Services */}
                      <div>
                        <p className="text-xs font-medium text-neutral-700 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {center.services.map(service => (
                            <span key={service} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Emergency Badge */}
                      {center.emergencyAvailable && (
                        <div className="bg-green-50 border border-green-200 rounded p-2 flex items-center gap-2">
                          <AlertCircle className="w-3 h-3 text-green-600" />
                          <span className="text-green-700 text-xs font-medium">24/7 Emergency</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-neutral-200">
                      <a href={`tel:${center.phone}`} className="btn-primary flex-1 text-sm text-center">
                        📞 Call
                      </a>
                      <a href={`mailto:${center.email}`} className="btn-secondary flex-1 text-sm text-center">
                        ✉️ Email
                      </a>
                      <a href={`https://wa.me/${center.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 text-sm text-center">
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-lg">No rescue centers found matching your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
