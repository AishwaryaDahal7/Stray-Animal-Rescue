import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export default function Map({ centers, userLocation = null, onMarkerClick = null }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    // Initialize map
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([27.7172, 85.3240], 10)

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current)
    }

    const map = mapInstanceRef.current

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker))
    markersRef.current = []

    // Add center markers
    centers.forEach(center => {
      const marker = L.marker([center.lat, center.lng], {
        title: center.name
      })
        .bindPopup(`
          <div style="min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; font-weight: bold;">${center.name}</h4>
            <p style="margin: 4px 0; font-size: 12px;"><strong>Address:</strong> ${center.address}</p>
            <p style="margin: 4px 0; font-size: 12px;"><strong>Phone:</strong> <a href="tel:${center.phone}">${center.phone}</a></p>
            <p style="margin: 4px 0; font-size: 12px;"><strong>Email:</strong> <a href="mailto:${center.email}">${center.email}</a></p>
            <p style="margin: 4px 0; font-size: 12px;"><strong>Hours:</strong> ${center.hours}</p>
            ${center.emergencyAvailable ? '<p style="margin: 4px 0; font-size: 12px; color: green;"><strong>✓ 24/7 Emergency</strong></p>' : ''}
          </div>
        `)
        .addTo(map)

      marker.on('click', () => {
        if (onMarkerClick) onMarkerClick(center)
      })

      markersRef.current.push(marker)
    })

    // Add user location if provided
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      const userMarker = L.marker(
        [userLocation.latitude, userLocation.longitude],
        {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }
      )
        .bindPopup('Your Location')
        .addTo(map)

      markersRef.current.push(userMarker)
    }

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const group = new L.featureGroup(markersRef.current)
      map.fitBounds(group.getBounds().pad(0.1))
    }

  }, [centers, userLocation, onMarkerClick])

  return (
    <div
      ref={mapRef}
      className="w-full h-screen rounded-lg shadow-lg"
      style={{ minHeight: '500px' }}
    />
  )
}
