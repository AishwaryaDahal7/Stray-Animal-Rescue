import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Loader, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { useGeolocation } from '../hooks/useGeolocation'
import { submitRescueReport } from '../services/firebaseService'
import { animalProblems, animalTypes, rescueCenters } from '../data/rescueCenters'
import { calculateDistance, sortByDistance } from '../utils/distance'

export default function ReportAnimal() {
  const navigate = useNavigate()
  const { latitude, longitude, loading: geoLoading, error: geoError, getLocation } = useGeolocation()
  
  const [formData, setFormData] = useState({
    animalType: '',
    problemType: '',
    description: '',
    reporterName: '',
    reporterPhone: '',
    reporterEmail: '',
    location: '',
    latitude: null,
    longitude: null
  })
  
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)
  const [nearbycenters, setNearbyCenters] = useState([])

  // Handle geolocation auto-detect
  const handleAutoDetect = () => {
    getLocation()
  }

  // Handle geolocation result
  React.useEffect(() => {
    if (latitude && longitude && !geoLoading) {
      setFormData(prev => ({
        ...prev,
        latitude,
        longitude
      }))
      toast.success(`Location detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
    }
  }, [latitude, longitude, geoLoading])

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.animalType || !formData.problemType || !formData.description) {
      toast.error('Please fill in all required fields (animal type, problem type, description)')
      return
    }

    if (!formData.reporterName || !formData.reporterEmail) {
      toast.error('Please provide your name and email')
      return
    }

    if (!formData.latitude || !formData.longitude) {
      toast.error('Please provide or auto-detect your location')
      return
    }

    setLoading(true)

    try {
      // Submit report
      const reportId = await submitRescueReport(formData)
      
      // Find nearby rescue centers
      const nearby = sortByDistance(
        rescueCenters,
        formData.latitude,
        formData.longitude
      ).slice(0, 5)
      
      setNearbyCenters(nearby)
      setSuccessMessage(`Report submitted successfully! ID: ${reportId}`)
      
      toast.success('Report submitted successfully!')
      
      // Reset form
      setFormData({
        animalType: '',
        problemType: '',
        description: '',
        reporterName: '',
        reporterPhone: '',
        reporterEmail: '',
        location: '',
        latitude: null,
        longitude: null
      })
    } catch (error) {
      console.error('Error submitting report:', error)
      toast.error('Failed to submit report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Success modal content
  if (successMessage) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-2">✓ Report Submitted!</h2>
          <p className="text-green-600 mb-4">{successMessage}</p>
          <p className="text-green-600 mb-6">
            Rescue teams have been notified. You can track the status using the report ID above.
          </p>
          <button
            onClick={() => setSuccessMessage(null)}
            className="btn-primary bg-green-600 hover:bg-green-700 mr-4"
          >
            Submit Another Report
          </button>
          <button
            onClick={() => navigate('/rescue-centers')}
            className="btn-secondary"
          >
            View Rescue Centers
          </button>
        </div>

        {/* Nearby Rescue Centers */}
        {nearbycenters.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Nearby Rescue Centers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nearbycenters.map(center => (
                <div key={center.id} className="card">
                  <h4 className="font-bold text-lg mb-2">{center.name}</h4>
                  <div className="text-sm text-neutral-600 space-y-2 mb-4">
                    <p><strong>Address:</strong> {center.address}</p>
                    <p><strong>Distance:</strong> {calculateDistance(formData.latitude, formData.longitude, center.lat, center.lng)} km away</p>
                    <p><strong>Phone:</strong> <a href={`tel:${center.phone}`} className="text-primary-600 hover:text-primary-700">{center.phone}</a></p>
                    <p><strong>Hours:</strong> {center.hours}</p>
                    {center.emergencyAvailable && (
                      <p className="text-green-600 font-medium">✓ 24/7 Emergency Available</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${center.phone}`} className="btn-primary text-sm flex-1 text-center">
                      Call Now
                    </a>
                    <a href={`mailto:${center.email}`} className="btn-secondary text-sm flex-1 text-center">
                      Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Report Animal Emergency</h1>
        <p className="text-lg text-neutral-600">
          Help us locate and rescue animals in need. All information you provide is important.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        
        {/* Animal Type */}
        <div>
          <label htmlFor="animalType" className="block text-sm font-bold text-neutral-700 mb-2">
            Animal Type *
          </label>
          <select
            id="animalType"
            name="animalType"
            value={formData.animalType}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select animal type</option>
            {animalTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Problem Type */}
        <div>
          <label className="block text-sm font-bold text-neutral-700 mb-3">
            What's the problem? *
          </label>
          <div className="space-y-2">
            {animalProblems.map(problem => (
              <label key={problem.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="problemType"
                  value={problem.id}
                  checked={formData.problemType === problem.id}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600"
                  required
                />
                <span className="text-neutral-700">{problem.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-bold text-neutral-700 mb-2">
            Description of the situation *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field"
            placeholder="Please describe the animal's condition, behavior, and any other relevant details..."
            required
          />
        </div>

        {/* Location Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Location *
          </h3>

          {/* Auto-detect button */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleAutoDetect}
              disabled={geoLoading}
              className="btn-secondary py-2 px-4 flex items-center gap-2"
            >
              {geoLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Detecting...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  Auto-detect My Location
                </>
              )}
            </button>
            {geoError && (
              <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded text-red-700 flex gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{geoError}</span>
              </div>
            )}
          </div>

          {/* Coordinates display */}
          {formData.latitude && formData.longitude && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded text-green-700 text-sm">
              ✓ Location detected: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
            </div>
          )}

          {/* Manual Location Input */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
              Or enter location manually
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Near Kathmandu Hospital, Hattisar..."
            />
          </div>
        </div>

        {/* Reporter Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="reporterName" className="block text-sm font-bold text-neutral-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="reporterName"
              name="reporterName"
              value={formData.reporterName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label htmlFor="reporterPhone" className="block text-sm font-bold text-neutral-700 mb-2">
              Your Phone Number
            </label>
            <input
              type="tel"
              id="reporterPhone"
              name="reporterPhone"
              value={formData.reporterPhone}
              onChange={handleChange}
              className="input-field"
              placeholder="+977-..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="reporterEmail" className="block text-sm font-bold text-neutral-700 mb-2">
            Your Email *
          </label>
          <input
            type="email"
            id="reporterEmail"
            name="reporterEmail"
            value={formData.reporterEmail}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-lg font-bold flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            '🚨 Submit Report'
          )}
        </button>

        <p className="text-sm text-neutral-500 text-center">
          * Required fields. Your information will be kept confidential and used only for rescue operations.
        </p>
      </form>
    </div>
  )
}
