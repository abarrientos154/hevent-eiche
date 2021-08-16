<template>
  <div class="column items-center">
    <div class="full-width"> Ofrezco estos servicios </div>
    <div class="row q-gutter-sm justify-around" style="width:300px" >
      <div v-for="(serv, index) in data" :key="index" style="width:90px; height:40px" class="q-mt-lg">
        <div class="column items-center">
          <q-img :src="findService(serv)" style="width:35px;height:35px" />
          <div class="row justify-center items-center text-grey-7"> {{serv.title}} </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id_proveedor'],
  data () {
    return {
      data: [],
      servicios: [
        { title: 'Locación', id: 'localizacion', icon: 'icon_services/locacion.png' },
        { title: 'Alimentos', id: 'alimentos', icon: 'icon_services/alimentos.png' },
        { title: 'Bebidas', id: 'bebidas', icon: 'icon_services/bebidas.png' },
        { title: 'Fotógrafo', id: 'fotografia', icon: 'icon_services/fotografia.png' },
        { title: 'Vídeo', id: 'video', icon: 'icon_services/video.png' },
        { title: 'Audio', id: 'audio', icon: 'icon_services/audio.png' },
        { title: 'Música', id: 'musica', icon: 'icon_services/musica.png' },
        { title: 'Iluminación', id: 'iluminacion', icon: 'icon_services/iluminacion.png' },
        { title: 'Invitación', id: 'invitacion', icon: 'icon_services/invitacion.png' },
        { title: 'Recuerdos', id: 'recuerdos', icon: 'icon_services/recuerdos.png' },
        { title: 'Decoración', id: 'decoracion', icon: 'icon_services/decoracion.png' },
        { title: 'Mobiliario', id: 'mobiliaria', icon: 'icon_services/mobiliaria.png' },
        { title: 'Transporte', id: 'transporte', icon: 'icon_services/transporte.png' },
        { title: 'Personal', id: 'personas', icon: 'icon_services/personas.png' }
      ]
    }
  },
  mounted () {
    this.consultar()
  },
  methods: {
    async consultar () {
      this.$q.loading.show()
      const res = await this.$api.get('obtener_check_servicios_anuncio/' + this.id_proveedor)
      this.data = res
      console.log(res, 'res')
      this.$q.loading.hide()
    },
    findService (serv) {
      console.log(this.servicios.find(v => v.id === serv.id), 'busqueda', serv)
      let find
      if (serv.servicio_id === 2) { // si es locacion
        find = this.servicios[0]
      } else if (serv.servicio_id === 3) { // si es personas
        find = this.servicios[this.servicios.length - 1]
      } else {
        find = this.servicios.find(v => v.id === serv.id)
      }
      console.log(find, 'find')
      return find.icon
    }
  }
}
</script>

<style>

</style>
