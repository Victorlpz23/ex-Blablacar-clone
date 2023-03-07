
// Initialize Google Places
function initGooglePlaces() {
  console.log('Google places script loaded')
  initSearchBar()
  initGMapFrom()
  initGMapTo()
}

// Initialize Google MapFrom
function initGMapFrom() {
  const mapContainer = document.querySelector('.g-mapFrom');
  if (mapContainer) {
  const latFrom = document.getElementById('latFrom')
  const valueLatFrom = latFrom.getAttribute("value")
  const lngFrom = document.getElementById('lngFrom')
  const valueLngFrom = lngFrom.getAttribute("value")
  let center 
  let zoomValue = 4
  console.log(valueLatFrom)
    if (valueLatFrom && valueLngFrom) {
      center = { lat: +valueLatFrom, lng: +valueLngFrom}
      zoomValue = 12
    } else {
      center = { lat: 40.4167754, lng: -3.7037902 }
    }
    const map = new google.maps.Map(mapContainer, {
      zoom: zoomValue,
      center: center,
    });

    const image = document.getElementById('g-imageFrom')
    urlImage = image.getAttribute("value")
    
    const imageMarker = {
      url: image.getAttribute("value"), // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      anchor: new google.maps.Point(25, 25) // anchor
    }

    const myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
        this.getPanes().markerLayer.id = 'g-imageFrom';
    };
    myoverlay.setMap(map);
  

    const marker = new google.maps.Marker({
      position : center,
      map: map,
      icon: imageMarker,
      optimized: false
    });
  } 
}

// Initialize Google MapFrom
function initGMapTo() {
  const mapContainer = document.querySelector('.g-mapTo');
  if (mapContainer) {
  const latTo = document.getElementById('latTo')
  const valueLatTo = latTo.getAttribute("value")
  const lngTo = document.getElementById('lngTo')
  const valueLngTo = lngTo.getAttribute("value")
  let center 
  let zoomValue = 4
  console.log(valueLatTo)
    if (valueLatTo && valueLngTo) {
      center = { lat: +valueLatTo, lng: +valueLngTo}
      zoomValue = 12
    } else {
      center = { lat: 40.4167754, lng: -3.7037902 }
    }
    const map = new google.maps.Map(mapContainer, {
      zoom: zoomValue,
      center: center,
    });

    const image = document.getElementById('g-imageTo')
    urlImage = image.getAttribute("value")
    
    const imageMarker = {
      url: image.getAttribute("value"), // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      anchor: new google.maps.Point(25, 25) // anchor
    }

    const myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
        this.getPanes().markerLayer.id = 'g-imageTo';
    };
    myoverlay.setMap(map);
  

    const marker = new google.maps.Marker({
      position : center,
      map: map,
      icon: imageMarker,
      optimized: false

    });
  } 
}

// Initialize Google search bar
function initSearchBar() {
  const input = document.querySelectorAll('.g-places-finder');
  if (input) {
    const options = {
      componentRestrictions: { country: "es" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false
    };
    
    input.forEach(places => {
      const destination = places.name[0].toUpperCase() + places.name.substring(1);
      const autocomplete = new google.maps.places.Autocomplete(places, options);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
      const place = autocomplete.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      document.querySelector(`[name="lat${destination}"]`).value = lat;
      document.querySelector(`[name="lng${destination}"]`).value = lng;
      initGMapFrom()
      initGMapTo()
    });
    })
  }
}