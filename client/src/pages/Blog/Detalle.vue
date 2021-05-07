<template>
  <q-page class="q-pb-lg">
    <div class="full-width row" style="height:240px;position:absolute;top:0px" >
     <q-img :src="form.img" style="width:100%;height:100%" />
    </div>
    <div style="position:absolute;top:0px;left:0px;z-index:1">
      <q-btn color="white" flat round @click="$router.go(-1)" icon="keyboard_arrow_left" />
    </div>
    <div class="full-width row estilo-pagina-bordes" style="height:(100% - 240px);position:absolute;top:200px;padding-bottom:130px" >
      <div class="q-mt-md q-ml-xl column q-mr-xl">
        <div class="text-h6 text-primary">{{form.titulo}}</div>
        <div class="text-bold"> * {{form.categoria}} </div>
        <div class="text-subtitle2 q-mt-sm"> {{form.subtitulo}} </div>
        <p class="text-grey-7 q-mt-sm">
          {{form.description}}
        </p>
      </div>
    </div>
    <q-page-sticky position="bottom" :offset="[18, 10]">
      <div class="row items-center">
        <q-btn class="shadow-5" fab icon="add" color="primary" @click="$router.push('/blog')" />
        <div class="column q-ml-sm">
          <div class="text-bold text-primary">Mas</div>
          <div caption class="text-primary">Articulos</div>
        </div>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
      }
    }
  },
  async mounted () {
    await this.getRecord()
  },
  methods: {
    async getRecord () {
      this.$q.loading.show()
      await this.$api.get('blogs/' + this.$route.params.id).then(res => {
        this.$q.loading.hide()
        this.form = res
      })
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
