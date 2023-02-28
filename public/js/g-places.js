
// Initialize Google Places
function initGooglePlaces() {
  console.log('Google places script loaded')
  initSearchBar()
}

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
    });
    })
    
  }
}