<template>
  <div>
    <div class="row justify-center">
      <img src="Verificacion Celular.png" style="width: 100%;height:500px"/>
    </div>
    <div class="q-mb-sm q-ml-xl q-mr-xl">
      <div class="row justify-between q-ml-xl q-mr-xl q-mt-sm">
        <q-input style="width:40px" outlined v-model="form.cod1" :dense="dense" />
        <q-input style="width:40px" outlined v-model="form.cod2" :dense="dense" />
        <q-input style="width:40px" outlined v-model="form.cod3" :dense="dense" />
        <q-input style="width:40px" outlined v-model="form.cod4" :dense="dense" />
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
