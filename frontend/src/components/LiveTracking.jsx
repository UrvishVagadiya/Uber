import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet's default icon path issue with bundlers like Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icons for pickup and destination
const pickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom component to recenter map when position changes
const RecenterMap = ({ position, geometry }) => {
  const map = useMap()
  useEffect(() => {
    if (geometry && geometry.length > 0) {
      // OSRM returns [lng, lat], Leaflet needs [lat, lng]
      const bounds = L.latLngBounds(geometry.map(coord => [coord[1], coord[0]]))
      map.fitBounds(bounds, { padding: [50, 50], animate: true })
    } else if (position) {
      map.setView(position, map.getZoom(), { animate: true })
    }
  }, [position, geometry, map])
  return null
}

const LiveTracking = ({ pickup, destination, geometry }) => {
  const [currentPosition, setCurrentPosition] = useState([21.1702, 72.8311])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentPosition([latitude, longitude])
        setIsLoading(false)
      },
      (err) => {
        console.warn('Geolocation error:', err.message)
        setIsLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentPosition([latitude, longitude])
      },
      (err) => {
        console.warn('Watch position error:', err.message)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)',
          zIndex: 1000,
          fontSize: '16px',
          color: '#333'
        }}>
          Loading map...
        </div>
      )}
      <div className="w-full h-full relative">
        <MapContainer
          center={currentPosition}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Current User Marker */}
          {!pickup && (
            <Marker position={currentPosition}>
              <Popup>Current Location</Popup>
            </Marker>
          )}

          {/* Pickup Marker */}
          {pickup && (
            <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon}>
              <Popup>Pickup Point</Popup>
            </Marker>
          )}

          {/* Destination Marker */}
          {destination && (
            <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
              <Popup>Destination Point</Popup>
            </Marker>
          )}

          {/* Route Line */}
          {geometry && (
            <Polyline 
              positions={geometry.map(coord => [coord[1], coord[0]])} 
              color="#2563eb" 
              weight={5} 
              opacity={0.7} 
            />
          )}

          <RecenterMap position={currentPosition} geometry={geometry} />
        </MapContainer>
      </div>
    </div>
  )
}

export default LiveTracking