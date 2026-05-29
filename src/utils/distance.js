// Haversine formula to calculate distance between two coordinates
// Returns distance in kilometers
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return parseFloat(distance.toFixed(2))
}

// Sort rescue centers by distance from a given location
export const sortByDistance = (centers, userLat, userLon) => {
  const withDistances = centers.map(center => ({
    ...center,
    distance: calculateDistance(userLat, userLon, center.lat, center.lng)
  }))
  return withDistances.sort((a, b) => a.distance - b.distance)
}

// Format phone number for display
export const formatPhone = (phone) => {
  if (!phone) return ''
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  // Format as +977-1-XXXXXXX for Nepal numbers or keep as is
  if (cleaned.length >= 10) {
    return '+977-' + cleaned.slice(cleaned.length - 10)
  }
  return phone
}

// Generate WhatsApp link
export const getWhatsAppLink = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  return `https://wa.me/${cleaned}`
}

// Generate call link
export const getCallLink = (phone) => {
  return `tel:${phone}`
}

// Generate email link
export const getEmailLink = (email) => {
  return `mailto:${email}`
}
