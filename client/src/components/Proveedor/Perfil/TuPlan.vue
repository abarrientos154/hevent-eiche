<template>
  <q-card class="full-width nube-editar-datos q-pb-xl q-pa-lg">
    <div style="position:absolute;top:0px;right:0px" class="q-mt-md">
      <q-btn icon="highlight_off" flat color="grey" size="lg" v-close-popup round />
    </div>
    <div style="margin-top:40%" class="text-h6 text-bold"> Tu Plan </div>
    <div class="text-subtitle1 text-bold"> Hevent {{user.plan_id === 1 ? 'Basico' : user.plan_id === 2 ? 'Estandar' : 'Premium'}} {{user.tipoPlan}} </div>
    <q-separator/>
    <div v-if="user.plan_id === 1" class="q-mt-sm text-grey q-ml-sm">
      <ul class="demo q-gutter-y-xs">
        <li>Posicionamiento reducido.</li>
        <li>Notificaciones Push.</li>
        <li>Subir hasta 20 imágenes.</li>
        <li>Sugerimos empresas de la  competencia en tu ficha.</li>
        <li>Estadísticas.</li>
      </ul>
    </div>
    <div v-if="user.plan_id === 2" class="q-mt-sm text-grey q-ml-sm">
      <ul class="demo q-gutter-y-xs">
        <li>Posicionamiento de tu anuncio detrás del plan Premium.</li>
        <li>Notificaciones Push.</li>
        <li>No sugerimos empresas de la competencia en tu ficha.</li>
        <li>Incluimos tu empresa en perfiles de tu competencia.</li>
        <li>Subir hasta 35 imágenes y 2 videos • Estadísticas.</li>
      </ul>
    </div>
    <div v-if="user.plan_id === 3" class="q-mt-sm text-grey q-ml-sm">
      <ul class="demo q-gutter-y-xs">
        <li>Posicionamiento de tu anuncio en primeros puestos.</li>
        <li>Notificaciones Push.</li>
        <li>No sugerimos empresas de la competencia en tu ficha.</li>
        <li>Sugerir tu empresa en perfiles de tu competencia.</li>
        <li>Puedes publicar en el blog.</li>
        <li>Subir hasta 50 imágenes y 4 videos.</li>
        <li>Publicación en nuestras redes sociales.</li>
      </ul>
    </div>

    <div class="text-subtitle1 text-bold"> Pago </div>
    <q-separator/>
  </q-card>
</template>

<script>
export default {
  props: ['user'],
  mounted () {
    console.log(this.user, 'userrrrrrr')
  }
}
</script>

<style scoped>
.nube-editar-datos {
  background: url('../../../../public/nube9.png');
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
ul.demo {
  list-style-type: circle;
  margin: 5px;
  padding: 6px;
}

.circle {
  width: 5px;
  height: 5px;
  background-color: blue;
  border-radius: 100%;
}
</style>
