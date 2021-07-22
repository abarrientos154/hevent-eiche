<template>
  <div class="row justify-center">
    <q-btn @click="pagar()" style="width:200px;height:40px" label="Pagar Flow" text-color="white" no-caps color="primary" flat class="gradiente-buttom" />
  </div>
</template>

<script>
// import env from '../../env'
import { openURL } from 'quasar'
export default {
  props: {
    montoTotal: {
      type: Number,
      default: 0
    },
    routeRedirect: {
      type: String,
      default: ''
    },
    parametros: {
      type: Object
    }
  },
  data () {
    return {
      referencia: this.$randomatic('aA0000', 20),
      totalP: '0',
      redireccion: '',
      redirectFlow: ''
    }
  },
  async mounted () {
    // this.totalP = this.montoTotal // monto total
    console.log(this.referencia, 'key referencia', this.$appUrlT, this.montoTotal, this.$route.query)
    const params = this.$route.query
    if (params.pay) {
      if (params.flow) {
        await this.comprobarPagoFlow(params)
      }
    }
  },
  methods: {
    async pagar () {
      this.$q.loading.show()
      await this.getRoute()
      openURL(this.redirectFlow)
      this.$q.loading.hide()
    },
    async comprobarPagoFlow (ref) {
      console.log(ref, 'refffffffffffffffffffff')
      const status = ref.status
      if (status === '2') {
        this.$q.notify({
          message: 'Pago Realizado Exitosamente.',
          color: 'positive'
        })
        this.$router.push('/inicio_cliente')
      } else {
        this.$q.notify({
          message: 'Su pago no pudo ser procesado.',
          color: 'negative'
        })
      }
    },
    async getRoute () {
      const redirectUrl = this.routeRedirect + '&ref=' + this.referencia // aqui concateno la ruta appUrlT actualmente en el archivo axios.js y ademas la ruta con sus parametros concatenando tambien la referencia generada
      console.log(redirectUrl, 'redirect')
      await this.$api.post('pay-flow-event-response-token' + redirectUrl, { amount: this.montoTotal }).then(res => {
        console.log(res, 'RESSSSSSS FLOWWWWWW PAYY')
        if (res) {
          // this.form.referencia = res.token
          this.redirectFlow = res.redirect
          this.redireccion = redirectUrl + '&tokenFlow=' + res.token
          console.log(res, this.redireccion, this.redirectFlow, 'resss flow get route')
          return res
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.ocultar-boton-wompi {
  display: none;
}
</style>
