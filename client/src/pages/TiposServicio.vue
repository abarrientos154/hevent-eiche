<template>
  <div>
    <div class="row q-ma-lg">
      <q-btn flat color="primary" round style="width: 50px" icon="keyboard_arrow_left" @click="$router.go(-1)"/>
      <q-space />
      <div class="row">
        <div class="text-grey-7 text-h6">Organiza</div>
        <div class="text-grey-7 q-ml-sm text-bold text-h6">tu evento</div>
      </div>
    </div>
    <div class="row text-primary q-ma-md">
      <div class="text-h6">Buscando</div>
      <div class="text-h6 text-bold q-ml-sm">Proveedores ...</div>
    </div>
    <div class="row justify-center">
      <q-btn icon="assignment" round flat color="primary" dense outlined />
      <q-btn icon="favorite_border" round flat color="grey-5" class="q-ml-lg" dense outlined @click="$router.push('/proveedores_me_gustan')" />
    </div>
    <div class="column">
      <div class="row justify-center">
        <div class="row q-gutter-sm justify-around" style="width:300px" >
          <div v-for="(serv, index) in servicios" :key="index" style="width:90px; height:40px" class="q-mt-lg" @click="$router.push('/proveedores/' + serv.id)">
            <div class="column items-center">
              <q-img :src="serv.icon" style="width:35px;height:35px" />
              <div class="row justify-center items-center text-grey-7"> {{serv.title}} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
  }
}
</script>

<style>

</style>>
