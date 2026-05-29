import { useState, useCallback } from 'react'

/**
 * Custom hook to get user's current geographic location
 * Returns: { latitude, longitude, loading, error }
 */
export const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    loading: false,
    error: null
  })

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation not supported by your browser'
      }))
      return
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null
        })
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permission denied. Please enable location access.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Position information unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
          default:
            errorMessage = `Error: ${error.message}`
        }

        setLocation(prev => ({
          ...prev,
          loading: false,
          error: errorMessage
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }, [])

  return { ...location, getLocation }
}
