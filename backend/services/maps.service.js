const axios = require('axios');
const captainModel = require('../models/captain.model');

// Using free OpenStreetMap Nominatim API for geocoding
module.exports.getAddressCoordinate = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'UberCloneApp/1.0'
            }
        });

        if (response.data && response.data.length > 0) {
            return {
                lat: parseFloat(response.data[0].lat),
                lng: parseFloat(response.data[0].lon)
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Using free OSRM (Open Source Routing Machine) for distance & time
// Returns data in the same shape as Google Distance Matrix so ride.service.js works unchanged
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {
        // First geocode both addresses to get coordinates
        const originCoords = await module.exports.getAddressCoordinate(origin);
        const destCoords = await module.exports.getAddressCoordinate(destination);

        // Use OSRM for routing (free, no API key needed)
        // Adding overview=full and geometries=geojson to get the route path
        const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}?overview=full&geometries=geojson`;

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'UberCloneApp/1.0'
            }
        });

        if (response.data.code === 'Ok' && response.data.routes.length > 0) {
            const route = response.data.routes[0];

            // Return in the same format as Google Distance Matrix API
            // so ride.service.js fare calculation works without changes
            return {
                distance: {
                    text: `${(route.distance / 1000).toFixed(1)} km`,
                    value: route.distance // in meters
                },
                duration: {
                    text: `${Math.round(route.duration / 60)} mins`,
                    value: route.duration // in seconds
                },
                geometry: route.geometry.coordinates, // Array of [lng, lat]
                origin: originCoords,
                destination: destCoords
            };
        } else {
            throw new Error('No routes found');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Using free OpenStreetMap Nominatim API for autocomplete suggestions
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&limit=5&addressdetails=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'UberCloneApp/1.0'
            }
        });

        if (response.data && response.data.length > 0) {
            return response.data
                .map(place => place.display_name)
                .filter(value => value);
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {

    // radius in km

    const captains = await captainModel.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [ lng, lat ]
                },
                $maxDistance: radius * 1000
            }
        }
    });

    return captains;
}