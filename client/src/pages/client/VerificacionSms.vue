<template>
  <div>
    <div class="row justify-center">
      <img src="Pagina10/Mesa de Trabajo 2.png" style="width: 100%;height:400px"/>
    </div>
    <div class="row justify-center text-subtitle2 text-center text-primary q-mt-sm q-mr-xl q-ml-xl q-mb-md">Te enviaremos un código de verificación de sms a tu celular</div>
    <div class="row justify-center text-subtitle2 text-center text-grey q-mb-sm">Verificación móvil</div>
    <div class="row justify-between q-mt-sm q-mr-xl q-ml-xl q-mb-md">
        <q-input style="width:50px" outlined v-model="form.cod1" :dense="dense" />
        <q-input style="width:50px" outlined v-model="form.cod2" :dense="dense" />
        <q-input style="width:50px" outlined v-model="form.cod3" :dense="dense" />
        <q-input style="width:50px" outlined v-model="form.cod4" :dense="dense" />
    </div>
    <div class="text-center q-ma-sm">
      <q-btn color="primary" class="q-mr-sm button-border" style="width:200px" :loading="loading" type="submit" label="Siguiente">
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
            Cargando...
        </template>
      </q-btn>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {},
      loading: false
    }
  }
}
</script>

<style>
</style>>
