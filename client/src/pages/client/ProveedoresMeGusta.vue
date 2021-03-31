<template>
  <q-page>
    <q-btn color="primary" flat round icon="keyboard_arrow_left" style="position:absolute;top:0px;left:0px" @click="$router.go(-1)" />
    <div v-if="data.locacion.length > 0 || data.personas.length > 0 || data.servicios.length > 0">
      <div  class="text-center text-h6 text-bold text-primary q-mt-sm">Me Gustan</div>

      <div class="full-width q-ma-sm">
        <div class="text-h6 text-primary text-bold q-ml-md"> * Locacion * </div>
        <q-scroll-area horizontal style="height: 260px; width: 100%;" class="rounded-borders q-mb-md q-mt-sm q-ml-sm" >
          <div class="row no-wrap q-gutter-sm">
            <q-card v-for="(item, index) in data.locacion" :key="index" style="width:170px;height:250px;border-radius:12px;border:1px solid grey">
              <div class="text-center text-grey-7 text-bold"> * {{item.info_proveedor.name ? item.info_proveedor.name : 'Proveedor'}} * </div>
              <img :src="baseu + item.proveedor_id" style="height:83%">
              <q-btn dense class="full-width gradiente-buttom" push style="border-radius:6px" label="mas informacion" size="10px" @click="$router.push('proveedor/l/' + item.proveedor_id)" />
              <div class="puntuacion-favoritos-like row justify-center items-center" >
                <q-icon name="star_rate" size="25px" color="orange" />
                <div class="text-white text-bold q-mr-sm"> 0 </div>
              </div>
              <q-btn icon="favorite" flat round dense color="primary" style="position:absolute;top:20px;right:5px" />
            </q-card>
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width q-ma-sm" v-for="(item, index) in data.personas" :key="index">
        <div class="text-h6 text-primary text-bold q-ml-md"> * Servicios * </div>
        <q-scroll-area horizontal style="height: 260px; width: 100%;" class="rounded-borders q-mb-md q-mt-sm q-ml-sm" >
          <div class="row no-wrap q-gutter-sm">
            <q-card v-for="(item, index) in data.locacion" :key="index" style="width:170px;height:250px;border-radius:12px;border:1px solid grey">
              <div class="text-center text-grey-7 text-bold"> * {{item.info_proveedor.name ? item.info_proveedor.name : 'Proveedor'}} * </div>
              <img :src="baseu + item.proveedor_id" style="height:83%">
              <q-btn dense class="full-width gradiente-buttom" push style="border-radius:6px" label="mas informacion" size="10px" @click="$router.push('proveedor/l/' + item.proveedor_id)" />
              <div class="puntuacion-favoritos-like row justify-center items-center" >
                <q-icon name="star_rate" size="25px" color="orange" />
                <div class="text-white text-bold q-mr-sm"> 0 </div>
              </div>
              <q-btn icon="favorite" flat round dense color="primary" style="position:absolute;top:20px;right:5px" />
            </q-card>
          </div>
        </q-scroll-area>
      </div>

      <div class="full-width q-ma-sm">
        <div class="text-h6 text-primary text-bold q-ml-md"> * Personas * </div>
        <q-scroll-area horizontal style="height: 260px; width: 100%;" class="rounded-borders q-mb-md q-mt-sm q-ml-sm q-mr-xl" >
          <div class="row no-wrap q-gutter-sm">
            <q-card v-for="(item, index) in data.personas" :key="index" style="width:170px;height:250px;border-radius:12px;border:1px solid grey">
              <div class="text-center text-grey-7 text-bold"> * {{item.info_proveedor ? item.info_proveedor.name : 'Proveedor'}} * </div>
              <img :src="baseu + item.proveedor_id" style="height:83%">
              <q-btn dense class="full-width gradiente-buttom" push style="border-radius:6px" label="mas informacion" size="10px" @click="$router.push('proveedor/l/' + item.proveedor_id)" />
              <div class="puntuacion-favoritos-like row justify-center items-center" >
                <q-icon name="star_rate" size="25px" color="orange" />
                <div class="text-white text-bold q-mr-sm"> 0 </div>
              </div>
              <q-btn icon="favorite" flat round dense color="primary" style="position:absolute;top:20px;right:5px" />
            </q-card>
          </div>
        </q-scroll-area>
      </div>
  </div>
  <div v-else class="fondo absolute-center" style="height:400px;width:300px" @click="$router.push('/proveedores/localizacion')">
 </div>
  </q-page>

</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      data: {},
      baseu: ''
    }
  },
  mounted () {
    this.getProveedores()
    this.baseu = env.apiUrl + 'file_proveedor/portada/'
  },
  methods: {
    async getProveedores () {
      await this.$api.get('proveedores_que_me_gustan').then(res => {
        this.data = res
        console.log(this.data, 'asd')
      })
    }
  }
}
</script>

<style>
.puntuacion-favoritos-like {
  position: absolute;
  top: 20px;
  right: 40px;
  padding: 3px;
}
.fondo {
  background: url('../../../public/Mensaje FAvoritos 400x400.jpg');
  background-size: 100% 100%;
  width: 100%;
  height: 100%
}
</style>
