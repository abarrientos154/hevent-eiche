<template>
  <div>
    <div class="text-center text-subtitle1 q-mt-md text-grey-9 text-bold"> * Seleccion de servicios * </div>
    <div class="row">
      <div class="row text-grey-9 q-ml-md q-mr-md">Nota:
        Seleccionar todos los servicios que ofreces para poderlos cotizar.
      </div>
    </div>
    <div class="row q-ml-md q-mr-md">
      <div class="column" v-for="(item, index) in servicios" :key="index">
        <div class="text-bold text-subtitle1 q-ma-sm">{{item.name}}</div>
        <div class="column q-ml-md q-mr-md" v-for="(subitem, index) in item.items" :key="index">
          <q-checkbox v-model="form.checks" :label="subitem.name" :val="subitem.id" dense @input="test" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['form', 'servicios', 'user'],
  data () {
    return {
    }
  },
  methods: {
    test () {
      console.log(this.form, 'this form')
    }
  }
}
</script>

<style>

</style>>
