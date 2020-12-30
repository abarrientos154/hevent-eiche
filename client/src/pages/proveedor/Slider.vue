<template>
  <div style="padding:0px;margin:0px">
    <q-tab-panels v-model="tab" animated style="padding:0px;margin:0px">
      <q-tab-panel name="one" style="padding:0px;margin:0px">
        <div class="slider-1" @click="next"/>
        <div class="column items-center justify-center vertical-bottom q-mb-lg text-grey-8" style="font-size:20px">
          <label>Bienvenido a HEVENT</label>
          <label>tu mejor aliado Conoce más...</label>
          <div class="row justify-between q-mt-md">
            <q-btn color="primary" label="Registrarse" to="/registro_proveedor" />
            <q-space />
            <q-btn color="primary" label="* Iniciar Sesión *" to="/login" flat />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="two" style="padding:0px;margin:0px">
        <div class="slider-2" @click="next"/>
        <div class="column items-center justify-center vertical-bottom q-mb-lg text-grey-8" style="font-size:20px; text-align:center">
          <label>Nosotros te llevamos tus Clientes</label>
          <label>y te lo mostramos con Estadísticas</label>
          <div class="row justify-between q-mt-md">
            <q-btn color="primary" label="Registrarse" to="/registro_proveedor" />
            <q-space />
            <q-btn color="primary" label="* Iniciar Sesión *" to="/login" flat />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="tree" style="padding:0px;margin:0px">
        <div class="slider-3" @click="next"/>
        <div class="column items-center justify-center vertical-bottom q-mb-lg text-grey-8 q-pl-lg q-pr-lg" style="font-size:20px; text-align:center">
          <p>Recibe Solicitudes y Cotiza</p>
          <div class="row justify-between q-mt-md">
            <q-btn color="primary" label="Registrarse" to="/registro_proveedor" />
            <q-space />
            <q-btn color="primary" label="* Iniciar Sesión *" to="/login" flat />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="four" style="padding:0px;margin:0px">
        <div class="slider-4" @click="next"/>
        <div class="column items-center justify-center vertical-bottom q-mb-lg text-grey-8 q-pl-lg q-pr-lg" style="font-size:20px; text-align:center">
          <p>Realiza un evento más</p>
          <div class="row justify-between q-mt-md">
            <q-btn color="primary" label="Registrarse" to="/registro_proveedor" />
            <q-space />
            <q-btn color="primary" label="* Iniciar Sesión *" to="/login" flat />
          </div>
        </div>
      </q-tab-panel>
    <q-tab-panel name="five" style="padding:0px;margin:0px" @click="next">
        <div class="slider-5" @click="next"/>
        <div class="column items-center justify-center vertical-bottom q-mb-lg text-grey-8 q-pl-lg q-pr-lg" style="font-size:20px; text-align:center">
          <p>Inscribete de Manera anual y has Crecer tu negocio</p>
          <div class="row justify-between q-mt-md">
            <q-btn color="primary" label="Registrarse" to="/registro_proveedor" />
            <q-space />
            <q-btn color="primary" label="* Iniciar Sesión *" to="/login" flat />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <div v-if="showBtn" class="row justify-end items-start q-mb-md">
      <q-btn class="float-test" color="primary" label="Siguiente" flat rounded @click="next()" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'one',
      showBtn: false
    }
  },
  methods: {
    next () {
      if (this.tab === 'one') { this.tab = 'two' } else
      if (this.tab === 'two') { this.tab = 'tree' } else
      if (this.tab === 'tree') { this.tab = 'four' } else
      if (this.tab === 'four') { this.tab = 'five' } else {
        this.$router.push('/registro_proveedor')
      }
    }
  }
}
</script>

<style>
.slider-1 {
  background: url('../../../public/SliderProveedor/Mesa de trabajo 1.png');
  height: 80vh;
  background-size: 100% 100%;
}
.slider-2 {
  background: url('../../../public/SliderProveedor/Mesa de trabajo 2.png');
  height: 80vh;
  background-size: 100% 100%;
}
.slider-3 {
  background: url('../../../public/SliderProveedor/Mesa de trabajo 3.png');
  height: 80vh;
  background-size: 100% 100%;
}
.slider-4 {
  background: url('../../../public/SliderProveedor/Mesa de trabajo 4.png');
  height: 80vh;
  background-size: 100% 100%;
}
.slider-5 {
  background: url('../../../public/SliderProveedor/Mesa de trabajo 5.png');
  height: 80vh;
  background-size: 100% 100%;
}
.responsive {
  background-size: contain;
  background-repeat: no-repeat;
}
.float-test {
  position: fixed;
  z-index: 1;
  bottom: 10px;
  right: 10px;
}
.label-position {
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>>
