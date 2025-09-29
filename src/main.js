import './style.css'

// Simple GEO application with some intentional issues for debugging
class GeoApp {
  constructor() {
    this.locations = []
    this.currentLocation = null
    this.init()
  }

  init() {
    this.setupUI()
    this.bindEvents()
    this.loadSampleData()
  }

  setupUI() {
    const app = document.querySelector('#app')
    app.innerHTML = `
      <div class="container">
        <h1>GEO Location Tracker</h1>
        <div class="controls">
          <button id="getCurrentLocation">Get Current Location</button>
          <button id="addLocation">Add Sample Location</button>
          <button id="clearLocations">Clear All</button>
        </div>
        <div id="locationList" class="location-list"></div>
        <div id="status" class="status"></div>
      </div>
    `
  }

  bindEvents() {
    document.getElementById('getCurrentLocation').addEventListener('click', () => {
      this.getCurrentLocation()
    })
    
    document.getElementById('addLocation').addEventListener('click', () => {
      this.addSampleLocation()
    })
    
    document.getElementById('clearLocations').addEventListener('click', () => {
      this.clearLocations()
    })
  }

  getCurrentLocation() {
    const status = document.getElementById('status')
    status.textContent = 'Getting location...'
    
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by this browser.'
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          id: Date.now(),
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        }
        
        this.locations.push(location)
        this.currentLocation = location
        this.updateLocationList()
        status.textContent = 'Location obtained successfully!'
      },
      (error) => {
        // Potential debugging issue: not handling all error cases
        status.textContent = `Error: ${error.message}`
      }
    )
  }

  addSampleLocation() {
    // Potential issue: hardcoded sample data
    const sampleLocations = [
      { lat: 40.7128, lng: -74.0060, name: 'New York' },
      { lat: 51.5074, lng: -0.1278, name: 'London' },
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo' }
    ]
    
    const randomLocation = sampleLocations[Math.floor(Math.random() * sampleLocations.length)]
    
    const location = {
      id: Date.now(),
      latitude: randomLocation.lat,
      longitude: randomLocation.lng,
      name: randomLocation.name,
      timestamp: new Date().toISOString(),
      isSample: true
    }
    
    this.locations.push(location)
    this.updateLocationList()
  }

  updateLocationList() {
    const listElement = document.getElementById('locationList')
    
    if (this.locations.length === 0) {
      listElement.innerHTML = '<p>No locations recorded</p>'
      return
    }
    
    // Potential issue: not sanitizing HTML content
    listElement.innerHTML = this.locations.map(location => `
      <div class="location-item ${location.isSample ? 'sample' : 'real'}">
        <h3>${location.name || 'Unknown Location'}</h3>
        <p>Lat: ${location.latitude.toFixed(6)}</p>
        <p>Lng: ${location.longitude.toFixed(6)}</p>
        ${location.accuracy ? `<p>Accuracy: ${location.accuracy}m</p>` : ''}
        <p>Time: ${new Date(location.timestamp).toLocaleString()}</p>
        <button onclick="app.removeLocation(${location.id})">Remove</button>
      </div>
    `).join('')
  }

  removeLocation(id) {
    // Potential issue: not validating id parameter
    this.locations = this.locations.filter(loc => loc.id !== id)
    this.updateLocationList()
  }

  clearLocations() {
    this.locations = []
    this.currentLocation = null
    this.updateLocationList()
    document.getElementById('status').textContent = 'All locations cleared'
  }

  loadSampleData() {
    // Simulate loading data with potential async issues
    setTimeout(() => {
      console.log('Sample data loaded')
    }, 100)
  }
}

// Global reference - potential issue for debugging
window.app = new GeoApp()