<template>
  <div id="map">
    <div v-if="type !== 1" id="btnLocation"><q-btn class="q-mx-sm" round color="primary" icon="my_location" /></div>
    <q-input
      ref="autocomp"
      for="input"
      class="col-xs-12 col-sm-6 q-pa-md"
      v-model="place"
      label="Dirección"
      placeholder="Av Bolívar Nirgua Venezuela"
      stack-label
      hint="Ubique su negocio en el mapa"
      disabled
      v-show="!withoutDirection"
    />
    <br>
    <gmap-map
      class="q-ma-sm"
      :center="center"
      :zoom="zoom"
      @input="changedMarker"
      style="height: 300px;"
      ref="myMap"
      :options="{ disableDefaultUi: false, streetViewControl: false }">
    </gmap-map>
  </div>
</template>
<script>
import { gmapApi } from 'vue2-google-maps'
export default {
  computed: {
    google: gmapApi
  },
  name: 'GoogleMap',
  props: ['center', 'zoom', 'type', 'withoutDirection'],
  data () {
    return {
      directionsService: {},
      showControl: false,
      mapGlobal: '',
      place: '',
      marker: '',
      autocomplete: {},
      visiblePolygon: false
    }
  },
  async mounted () {
    this.ejecutar()
  },
  methods: {
    async ejecutar () {
      console.log('withoutDirection', this.withoutDirection)
      var vm = this
      // instanciar mapa
      await this.$refs.myMap.$mapPromise.then((map) => {
        // agregar librerias automplete de google maps a un input
        var autocomplete = new this.google.maps.places.Autocomplete(this.$refs.autocomp.$refs.input)
        vm.mapGlobal = map
        this.getPolygon()
        // marcador objetivo
        vm.marker = new this.google.maps.Marker({
          draggable: true,
          animation: this.google.maps.Animation.DROP,
          position: vm.center,
          map: map
        })
        console.log(vm.center, 'centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
        // obtener direccion del marcador a traves de coordenadas
        var geocoder = new this.google.maps.Geocoder()
        geocoder.geocode({ location: this.marker.getPosition() }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              vm.place = results[0].formatted_address
            }
          } else {
            alert('Geocode was not successful for the following reason: ' + status)
          }
        })
        // boton de geolocalizacion de ubicacion actual

        if (vm.type !== 1) {
          var myLocation = document.getElementById('btnLocation')
          myLocation.index = 1
          map.controls[this.google.maps.ControlPosition.RIGHT_BOTTOM].push(myLocation)
          myLocation.addEventListener('click', function () {
            navigator.geolocation.getCurrentPosition(function (position) {
              map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
              vm.marker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
              vm.$emit('newPlace', vm.place, { lat: position.coords.latitude, lng: position.coords.longitude }, vm.bounds)
              console.log('asdasdasd')
            })
          })
        }
        vm.marker.addListener('click', vm.toggleBounce)
        vm.marker.addListener('dragend', vm.changedMarker)
        // seleccionar nueva ubicacion cambia el centro del mapa
        autocomplete.addListener('place_changed', function () {
          const placeAutocomplete = autocomplete.getPlace()
          const latLng = { lat: placeAutocomplete.geometry.location.lat(), lng: placeAutocomplete.geometry.location.lng() }
          vm.map.setCenter(latLng)
          vm.marker.setPosition(latLng)
          vm.place = placeAutocomplete.formatted_address

          vm.map.setZoom(10)
        })
      })
      // mostrar la ruta de origen a destino
      // if (this.type === 1) this.showDirections()
    },
    // Crear un poligono rectangular alrededor del marcador
    getPolygon () {
      var circle = new this.google.maps.Circle()
      circle.setCenter(this.center)
      circle.setRadius(5000)
      circle.setVisible(true)
      var bounds = circle.getBounds()
      /* var rectangle = new this.google.maps.Rectangle({
        map: map,
        bounds: bounds,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }) */
      var ne = bounds.getNorthEast()
      var sw = bounds.getSouthWest()
      var nw = new this.google.maps.LatLng(ne.lat(), sw.lng())
      var se = new this.google.maps.LatLng(sw.lat(), ne.lng())
      this.$emit('getBounds', [ne, nw, sw, se], this.center)
    },
    // Monstrar la ruta en el mapa de origen a destino
    showDirections () {
      var vm = this
      this.directionsService = new this.google.maps.DirectionsService()
      var request = {
        origin: this.center,
        destination: { lat: 10.1502113, lng: -68.40239009999999 },
        travelMode: this.google.maps.TravelMode.DRIVING
      }
      this.directionsService.route(request, function (response, status) {
        if (status === vm.google.maps.DirectionsStatus.OK) {
          console.log(vm.mapGlobal)
          console.log(response)
          vm.mapGlobal.fitBounds(response.routes[0].bounds)
          var line = new vm.google.maps.Polyline({
            path: response.routes[0].overview_path,
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 4,
            geodesic: true
          })
          line.setMap(vm.mapGlobal)
          return new vm.google.maps.Marker({
            position: request.destination,
            map: vm.mapGlobal
          })
        }
      })
      var service = new this.google.maps.DistanceMatrixService()
      var distances = { unitSystem: this.google.maps.UnitSystem.METRIC, travelMode: this.google.maps.TravelMode.DRIVING }
      distances.origins = [{ lat: 10.1557595, lng: -68.5632614 }/* , { lat: 10.1783166, lng: -68.4876905 }, { lat: 10.0763215, lng: -69.1191154 }, { lat: 10.1771427, lng: -68.2594012 } */]
      distances.destinations = [{ lat: 10.4564914, lng: -68.3249843 }/* , { lat: 10.1579312, lng: -67.9972104 }, { lat: 10.35, lng: -67.8833329 }, { lat: 10.2133466, lng: -68.3249843 } */]
      service.getDistanceMatrix(distances, function (response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status)
        } else {
          console.log(response)
        }
      })
    },
    // cambiar posicion del marcador y mostrar direccion en el input
    changedMarker () {
      var vm = this
      var geocoder = new this.google.maps.Geocoder()
      this.center = this.marker.getPosition()
      geocoder.geocode({ location: this.marker.getPosition() }, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            vm.getPolygon()
            vm.place = results[0].formatted_address
            const coordinates = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }
            vm.$emit('newPlace', vm.place, coordinates, vm.bounds)
          }
        } else {
          alert('Geocode was not successful for the following reason: ' + status)
        }
      })
    },
    // animacion del marcador al hacer click sobre el
    toggleBounce () {
      if (this.marker.getAnimation() !== null) {
        this.marker.setAnimation(null)
      } else {
        this.marker.setAnimation(this.google.maps.Animation.BOUNCE)
      }
    }
  }
}
</script>
<style>
</style>
