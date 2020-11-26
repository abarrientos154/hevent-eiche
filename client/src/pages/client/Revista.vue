<template>
  <q-card>
    <q-card-section>
      <revista :form="form" />
    </q-card-section>
  </q-card>
</template>

<script>
import Revista from '../../components/Revista'
export default {
  components: {
    Revista
  },
  data () {
    return {
      form: {
        img: 'icons/favicon-128x128.png',
        titulo: 'Cinco consejos para que tu evento salga bien en las fotos',
        autor: 'Nombre Autor',
        contenido: 'lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor '
      }
    }
  },
  mounted () {
    this.getRecord()
  },
  methods: {
    getRecord () {

    }
  }
}
</script>

<style>

</style>
