<template>
  <div class="row justify-center">
    <form action="https://checkout.wompi.co/p/" method="GET">
      <!-- OBLIGATORIOS -->
      <input type="hidden" name="public-key" :value="keyPub" />
      <input type="hidden" name="currency" value="COP" />
      <input type="hidden" name="amount-in-cents" :value="totalP" />
      <input type="hidden" name="reference" :value="referencia" />
      <!-- OPCIONALES -->
      <input type="hidden" name="redirect-url" :value="redireccion" />
      <button class="ocultar-boton-wompi" type="submit" id="pagarWompi">Pagar con Wompi</button>
    </form>
    <q-btn @click="pagar()" style="width:200px;height:40px" label="Pagar" text-color="white" no-caps color="primary" flat class="gradiente-buttom" />
  </div>
</template>

<script>
import env from '../../env'
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
      keyPub: this.$WKPub,
      referencia: this.$randomatic('aA0000', 20),
      totalP: '0',
      redireccion: ''
    }
  },
  async mounted () {
    this.totalP = this.montoTotal + '00' // wompi recibe el monto pero con dos ceros demas
    this.redireccion = this.$appUrlT + this.routeRedirect + '&ref=' + this.referencia // aqui concateno la ruta appUrlT actualmente en el archivo axios.js y ademas la ruta con sus parametros concatenando tambien la referencia generada
    console.log(this.referencia, 'key referencia', this.$appUrlT, this.totalP, this.$route.query)
    const params = this.$route.query
    if (params.pay) {
      if (params.wompi) {
        await this.comprobarPagoWompi(params.ref)
      }
    }
  },
  methods: {
    async pagar () {
      const buttonWompi = document.getElementById('pagarWompi')
      await buttonWompi.click()
      navigator.app.exitApp()
    },
    async comprobarPagoWompi (ref) {
      this.$q.loading.show({
        message: 'Confirmando Transaccion. Por Favor Espere...'
      })
      const config = {
        headers: {
          Authorization: 'Bearer ' + this.$WKPriv
        }
      }
      // const ref = '5k6CpuWhqCgjuojSi9kS'
      await this.$axios.get(env.wompiUrl + `transactions?reference=${ref}`, config).then(res => {
        this.$q.loading.hide()
        console.log(res.data.data[0], 'res de comprobacion pago wompi')
        if (res.data.data.length > 0) {
          if (res.data.data[0].status === 'ERROR') {
            this.$q.dialog({
              title: '¡Atención!',
              message: 'Ocurrio un error con la transaccion'
            }).onOk(() => {
            })
          } else if (res.data.data[0].status === 'APPROVED') {
            this.$emit('confirmarPago', res.data.data[0])
          } else if (res.data.data[0].status === 'DECLINED') {
            this.$q.dialog({
              title: '¡Atención!',
              message: 'Su pago ha sido declinado.'
            }).onOk(() => {

            })
          }
        } else {
          this.$q.dialog({
            title: '¡Atención!',
            message: `Referencia ${ref} Invalida o No Encontrada. Por Favor contacte con algun administrador`
          }).onOk(() => {
          })
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
