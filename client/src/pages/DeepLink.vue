<template>
  <div class="absolute-center column fit items-center justify-center bg-primary">
    <!-- <q-input label="url" v-model="form.url" outlined style="width:500px"/>
    <q-space></q-space> -->
    <p style="text-align:center;font-size:19px" class="q-ma-md text-bold text-white">Para procesar su pago regrese a nuestra app desde el siguiente boton:</p>
    <q-btn class="q-mt-sm q-ma-sm" label="Volver a la App" @click="ir()" color="white" text-color="primary" push style="height:60px;width:70%" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        url: 'https://app.heventapp.com/login_proveedor/referencia_pago/'
      }
    }
  },
  methods: {
    ir () {
      this.form.url = this.form.url + this.$route.params.ref
      location.href = this.form.url
    }
  }
}
</script>

<style>
.button {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 15px;
  color: #0016b0;
  background-color: #c26969;
  border-radius: 30px;
  border: 2px solid #81ba18;
  height:60px;
  width:60px
}
</style>
