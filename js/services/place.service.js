
const STORAGE_KEY_KEY_PLACES = 'places'

var gLocToAdd
var gPlaces
_createPlaces()

function getPlaces() {
 return gPlaces
}

function removePlace(placeId) {
 gPlaces = gPlaces.filter(p => p.id !== placeId)
 _savePlacesToStorage()
}


function getPlaceById(placeId) {
 return gPlaces.find(p => p.id === placeId)
}


function _createPlace({ name, lat, lng, zoom = 10 }) {
 return { id: makeId(), lat, lng, name, zoom }
}

function _createPlaces() {
 const places = loadFromStorage(STORAGE_KEY_KEY_PLACES) || []
 if (!places || !places.length) {
  for (let i = 0; i < 3; i++) {
   const name = 'Puki' + makeId()
   places.push(_createPlace({ name, lat: 33 + i, lng: 35 + i, zoom: 10 }))
  }
 }
 gPlaces = places
 _savePlacesToStorage()
}

function cancelAddPlace() {

 gLocToAdd = null
}

function addPlaceCoords(lat, lng) {
 gLocToAdd = { lat, lng }
}

function addPlaceName({ name }) {
 gLocToAdd = { ...gLocToAdd, name }
 console.log('gLocToAdd:', gLocToAdd)
 gPlaces.unshift(_createPlace(gLocToAdd))
 _savePlacesToStorage()
}

function getPlacesAsCSV() {
 if (!gPlaces.length) return 'No Places'
 const csvLines = gPlaces.map(({ id, lat, lng, name }) => `${id},${lat},${lng},${name}\n`)
 csvLines.unshift('Id,Lat,Long,Name\n')
 console.log('csvLines', csvLines.join(''));
 return csvLines.join('')
}

function _savePlacesToStorage() {
 saveToStorage(STORAGE_KEY_KEY_PLACES, gPlaces)
}