<template>
  <div class="flex flex-center absolute-center">
    <q-btn label="probar" @click="pruebaPago" color="primary" />
    {{info}}
  </div>
</template>

<script>
import axios from 'axios'
import jsonPay from '../pages/prueba'

export default {
  data () {
    return {
      form: {

      },
      info: null
    }
  },
  mounted () {
    this.form = JSON.stringify(jsonPay)
    console.log(this.form, 'asd')
  },
  methods: {
    pruebaPago () {
      axios.post('https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi', this.form).then(res => {
        this.info = res
        console.log(this.info)
      })
    }
  }
}
</script>

<style>

</style>
