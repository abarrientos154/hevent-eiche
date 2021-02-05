<template>
  <q-page>
    <div class="full-width row" style="height:240px;position:absolute;top:0px" >
     <q-img :src="form.img" style="width:100%;height:100%" />
    </div>
    <div style="position:absolute;top:0px;left:0px;z-index:1">
      <q-btn color="white" flat round @click="$router.go(-1)" icon="keyboard_arrow_left" />
    </div>
    <div class="full-width row estilo-pagina-bordes" style="height:(100% - 240px);position:absolute;top:200px" >
      <div class="q-mt-md q-ml-xl column q-mr-xl">
        <div class="text-h6 text-primary">Artículos</div>
        <div class="text-bold"> * {{form.tipo}} </div>
        <div class="text-subtitle2 q-mt-sm"> {{form.titulo}} </div>
        <p class="text-grey-7 q-mt-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi labore veniam ducimus id quam, adipisci eligendi consectetur quos deleniti eos et cumque inventore, nobis a corporis ex, vitae animi iste.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti magni quod facilis corporis ducimus! Quidem in at voluptatum! Adipisci illum modi nobis tempore optio tempora earum animi error quod minima?
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
        img: 'example_5.jpg',
        titulo: 'Cinco consejos para que tu evento salga bien en las fotos',
        autor: 'Nombre Autor',
        contenido: 'lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor lorem insup dolor ',
        tipo: 'bodas'
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
.estilo-pagina-bordes {
  border: 1px solid white;
  border-radius: 20px;
  background: white;
}
</style>
