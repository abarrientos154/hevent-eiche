<template>
  <q-page>
    <div class="background-planes"></div>
    <div style="position:absolute; top:10px; left:5px" >
      <q-btn color="white" icon="keyboard_arrow_left" flat dense @click="$router.go(-1)" />
    </div>

    <div class="q-mt-md text-h6 text-primary text-center"> * Inscripcion * </div>
    <div class="row justify-center q-gutter-xs q-mb-md q-mt-sm">
      <div :class="tipoPlan === 'Mensual' ? 'tipo-cuenta-on' : 'tipo-cuenta-off'" @click="changeTipoCuenta()">Mensual</div>
      <div :class="tipoPlan === 'Anual' ? 'tipo-cuenta-on' : 'tipo-cuenta-off'" @click="changeTipoCuenta()" >Anual</div>
    </div>

    <q-scroll-area horizontal style="height: 450px; width: 100%;" ref="scrollArea" class="q-mb-lg bg-white" :thumb-style="thumbStyle"
      :content-style="contentStyle" :content-active-style="contentActiveStyle" >
      <div class="row no-wrap">
        <div v-for="(plan, index) in fnPlanes" :key="index" :style="`width:${plan.select ? '200px' : '160px'};height:calc(100% - 10em);`" class="q-ma-sm transition"
          @click="changeSelectPlan(plan.name)"
        >
          <q-img :src="`planes/${plan.name}.png`" v-if="form.country === 'co'" />
          <q-img v-else :src="`planes/chile/${plan.name} Chile.png`" />
          <div class="row justify-center">
            <q-btn label="comienza ahora" class="gradiente-buttom q-mb-md" push @click="onSubmit(plan)" dense  />
          </div>
        </div>
      </div>
    </q-scroll-area>

    <form action="https://checkout.wompi.co/p/" method="GET">
      <!-- OBLIGATORIOS -->
      <input type="hidden" name="public-key" :value="keyPub" />
      <input type="hidden" name="currency" value="COP" />
      <input type="hidden" name="amount-in-cents" :value="pricePlan" />
      <input type="hidden" name="reference" :value="form.referencia" />
      <!-- OPCIONALES -->
      <input type="hidden" name="redirect-url" :value="appUrl" />
      <button class="ocultar-boton-wompi" type="submit" id="pagarWompi">Pagar con Wompi</button>
    </form>

  </q-page>
</template>

<script>
import env from '../../env'
import { openURL } from 'quasar'
import moment from 'moment'
export default {
  computed: {
    fnPlanes () {
      return this.planes.filter(v => v.tipo === this.tipoPlan)
    },
    pricePlan () {
      const plan = this.planes.find(v => v.select)
      console.log(plan, 'plannnnnn price seleccionado')
      if (this.form.country === 'co') {
        return plan.priceco
      } else {
        return plan.pricecl
      }
    }
  },
  data () {
    return {
      id: this.$route.params.proveedor_id,
      keyPub: '',
      form: {},
      tipoPlan: 'Mensual',
      positionScroll: 100,
      contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },
      contentActiveStyle: {
        backgroundColor: '#eee',
        color: 'black'
      },
      thumbStyle: {
        right: '0px',
        borderRadius: '0px',
        backgroundColor: '#027be3',
        width: '0px',
        opacity: 0
      },
      formPlan: {},
      selectPlan: '',
      appUrl: null,
      redirectFlow: '',
      planes: [
        {
          name: 'Basico',
          tipo: 'Mensual',
          select: false,
          cual: 1,
          priceco: 1500000,
          pricecl: 3100
        },
        {
          name: 'Estandar',
          tipo: 'Mensual',
          select: true,
          cual: 2,
          priceco: 5000000,
          pricecl: 10300
        },
        {
          name: 'Premium',
          tipo: 'Mensual',
          select: false,
          cual: 3,
          priceco: 10000000,
          pricecl: 20630
        },
        {
          name: 'Basico Anual',
          tipo: 'Anual',
          select: false,
          cual: 1,
          priceco: 9990000,
          pricecl: 20500
        },
        {
          name: 'Estandar Anual',
          tipo: 'Anual',
          select: false,
          cual: 2,
          priceco: 30000000,
          pricecl: 62000
        },
        {
          name: 'Premium Anual',
          tipo: 'Anual',
          select: false,
          cual: 3,
          priceco: 60000000,
          pricecl: 124000
        }
      ],
      validacionPlan: false
    }
  },
  async mounted () {
    this.$q.loading.show()
    this.keyPub = this.$WKPub
    await this.getInfoUser()
    console.log(this.form, 'forrrm')
    this.form.referencia = this.$randomatic('aA0000', 20)
    this.appUrl = env.appUrl + 'deep_link/' + this.form.referencia
    console.log(this.form.referencia, 'aquii randomatic', this.appUrl)
    this.form.tipoPlan = 'Mensual'
    this.scroll()
    this.$q.loading.hide()
  },
  methods: {
    async getInfoUser () {
      if (!this.id) {
        console.log('no tengo id')
        await this.$api.get('user_info').then(res => {
          this.form = res
        })
      } else {
        await this.$api.get('user_info/' + this.id).then(res => {
          this.form = res
        })
      }
    },
    changeTipoCuenta () {
      this.tipoPlan = this.tipoPlan === 'Anual' ? 'Mensual' : 'Anual'
      this.form.tipoPlan = this.tipoPlan
      console.log(this.form, 'cambiando tipo de plan')
    },
    scroll () {
      this.$refs.scrollArea.setScrollPosition(this.positionScroll)
    },
    async pagarFlow () {
      console.log(this.pricePlan, 'price Plan')
      await this.$api.post('pay_flow_update', { amount: this.pricePlan, email: this.form.email }).then(res => {
        console.log(res, 'RESSSSSSS FLOWWWWWW PAYY')
        if (res) {
          this.form.referencia = res.token
          this.redirectFlow = res.redirect
          return res
        } else {
          return false
        }
      })
    },
    async onSubmit (plan) {
      this.$q.loading.show()
      this.changeSelectPlan(plan.name)
      this.form.plan_id = plan.cual
      console.log(this.validacionPlan, 'validacion plan')
      await this.validarPlan()
      console.log(this.validacionPlan, 'validacion plan')
      if (this.validacionPlan) {
        console.log('entro')
        if (this.form.country === 'cl') {
          await this.pagarFlow()
          console.log(this.form.referencia, 'FLOWWWFFFFFFFFFFFFFFF TOKENNNNNNNNNNNNN')
          openURL(this.redirectFlow)
          this.$q.loading.hide()
        } else if (this.form.country === 'co') {
          await this.$api.post('pay_by_wompi', this.form).then(res => {
            this.$q.loading.hide()
            if (res) {
              const buttonWompi = document.getElementById('pagarWompi')
              buttonWompi.click()
            }
          })
        }
      }
      this.$q.loading.hide()
    },
    async validarPlan () {
      if (this.id) {
        this.validacionPlan = true
      } else {
        await this.$api.get('validar_plan').then(res => {
          console.log(res, 'resss')
          if (res.error) {
            this.validacionPlan = false
            this.$q.notify({
              message: res.message,
              color: 'negative'
            })
          } else {
            this.validacionPlan = true
          }
        })
      }
    },
    async selectPrice (planID) {
      this.selectPlan = planID
      const plan = this.planes.find(element => element._id === this.selectPlan)
      plan.created_at = moment().toDate()
      this.product.price = plan.price
      // this.product.description = plan.description
      // this.formPlan = plan
      this.form.plan_id = planID
      console.log(this.form, 'form SELECT PRICE')
    },
    changeSelectPlan (name) {
      var buscarInd = this.planes.findIndex(v => v.select)
      this.planes[buscarInd].select = false
      buscarInd = this.planes.findIndex(v => v.name === name)
      this.planes[buscarInd].select = true
    }
  }
}
</script>

<style scoped>
.transition {
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom: 1px solid gray;
  transition: width 1s, height 1s, margin 0s;
}

.background-planes {
  background: url('../../../public/planes_nube.png');
  height: 250px;
  background-size: 100% 100%;
}

.tipo-cuenta-on {
  background-color: rgb(4, 174, 233);
  color: white;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 3px;
  padding-left: 20px;
  padding-right: 20px;
}

.tipo-cuenta-off {
  background-color: rgb(239, 250, 255);
  color: rgb(172, 180, 180);
  border: 1px solid grey;
  border-radius: 6px;
  padding: 3px;
  padding-left: 20px;
  padding-right: 20px;
}

.ocultar-boton-wompi {
  display: none;
}

</style>
