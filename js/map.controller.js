'use strict'
var gMarkers = []
var gMap
function initMap() {
  setUserMsg('Setting Up your Map end locations')
  console.log('initMap:')
  const defaultLoc = { lat: 29.55036, lng: 34.952278 }
  gMap = new google.maps.Map(document.querySelector('#map'), {
    zoom: 12,
    center: defaultLoc,
  })
  gMap.addListener('click', onAddLoc)
  renderMapController()
  renderLocs()
}

function renderLocs() {
  const places = getPlaces()
  const elList = document.querySelector('.loc-list')
  let strHtmls = places
    .map(({ id, name }) => {
      return `
        <li class="loc-preview grid">
        <h4>${name}</h4>
        <div class="btns-container">
        <button onclick="onPanToPlace('${id}')" class="primary-btn">
          <span class="material-symbols-outlined">
            flag
          </span>
        </button>
        <button onclick="onRemovePlace('${id}')" class="primary-btn">
          <span class="material-symbols-outlined">  
          delete
          </span>
        </button>
        </div>
      </li>
        `
    })
    .join('')
  // console.log('strHtmls', strHtmls);
  elList.innerHTML = strHtmls
  renderMarkers()
}

function onRemovePlace(placeId) {
  setUserMsg('Place removed')
  removePlace(placeId)
  renderLocs()
  renderMarkers()
}

function onPanToPlace(placeId) {
  const { lat, lng, zoom } = getPlaceById(placeId)
  saveSelectedPlace({ lat, lng })
  gMap.setCenter({ lat, lng })
  // gMap.setZoom(zoom)

}

function onPanToUserLoc() {
  setUserMsg('Getting user locations')
  navigator.geolocation.getCurrentPosition(setCenterToUserLoc)
}

function setCenterToUserLoc({ coords }) {
  const { latitude: lat, longitude: lng } = coords
  gMap.setCenter({ lat, lng })
}

function renderMarkers() {
  const places = getPlaces()
  // remove previous markers
  gMarkers.forEach((marker) => marker.setMap(null))
  // create a marker for every place
  gMarkers = places.map(({ lat, lng, name }) => {
    const coord = { lat, lng }
    return new google.maps.Marker({
      position: coord,
      map: gMap,
      title: name,
    })
  })
}

function renderMapController() {
  const locationButton = document.createElement('button')
  locationButton.classList.add('my-location')
  locationButton.innerHTML = `<img class="loc-btn" src="assets/images/my-location.png" />`
  gMap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(locationButton)
  locationButton.addEventListener('click', onPanToUserLoc)
}

function onAddLoc(ev) {
  toggleModal()
  const lat = ev.latLng.lat()
  const lng = ev.latLng.lng()
  addPlaceCoords(lat, lng)
}

function onDownloadCSV(elLink) {
  setUserMsg('Downloading places file')
  const csvContent = getPlacesAsCSV()
  elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
}

function toggleModal() {
  const elModal = document.querySelector('.app-modal')
  elModal.open ? elModal.close() : elModal.showModal()
  console.log('elModal:', elModal)
}

function onCancelPlace(ev) {
  setUserMsg('Cancel adding place')
  ev.preventDefault();
  toggleModal()
  cancelAddPlace()
}

function onAddPlaceName(ev) {
  setUserMsg('Adding new place')
  ev.preventDefault()
  const locName = Object.fromEntries(new FormData(ev.target))
  addPlaceName(locName)
  renderLocs()
  renderMarkers()
  toggleModal()
}