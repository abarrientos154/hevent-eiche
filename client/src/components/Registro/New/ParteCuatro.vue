<template>
  <div class="column">
    <div class="background-cuatro"></div>
    <div style="position:absolute; top:10px; left:5px" >
      <q-btn color="white" icon="keyboard_arrow_left" flat dense @click="panel.panel = 'parte_tres'" />
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
      <input type="hidden" name="public-key" value="pub_test_7Q44Osi3VFuxurTJhLhsg5yy8cMl6mNy" />
      <input type="hidden" name="currency" value="COP" />
      <input type="hidden" name="amount-in-cents" :value="pricePlan" />
      <input type="hidden" name="reference" :value="form.referencia" />
      <!-- OPCIONALES -->
      <input type="hidden" name="redirect-url" :value="appUrl" />
      <button class="ocultar-boton-wompi" type="submit" id="pagarWompi">Pagar con Wompi</button>
    </form>
    <!-- <div class="text-h6 text-grey-9">Selecciona tu plan</div>
    <q-card v-for="(plan) of planes" :key="plan._id" style="border-radius:12px" class="q-pa-xs q-ma-sm">
      <q-item clickable v-ripple :class="plan._id === form.plan_id ? 'bg-grey-5':''" @click="selectPrice(plan._id)" >
        <q-item-section>
          <q-item-label class="text-bold">* {{plan.name}}</q-item-label>
          <q-item-label caption v-for="offer of plan.offers" :key="offer.id" >-{{offer.name}} </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
    <q-card style="border-radius:12px" class="q-ma-sm q-pa-sm">
      <div class="text-h6 row justify-center q-mt-sm text-primary"> Precio a pagar {{product.price}}$ </div>
      <paypal-registro @registrar="onSubmit()" v-if="product.price > 0" class="q-pa-lg" :product="product" :form="form" :selectedPlan="formPlan" />
    </q-card>
    <q-card-actions>
      <q-space />
      <q-btn @click="onSubmit()" color="primary" push label="Guardar" glossy/>
    </q-card-actions> -->
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import env from '../../../env'
// import PaypalRegistro from '../../PaypalRegistro'
import moment from 'moment'
export default {
  props: ['form', 'panel', 'files'],
  data () {
    return {
      pagarWompiParams: {
      },
      referencia: null,
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
      tipoPlan: 'Mensual',
      planes: [
        {
          name: 'Basico',
          tipo: 'Mensual',
          select: false,
          cual: 1,
          priceco: 1500000
        },
        {
          name: 'Estandar',
          tipo: 'Mensual',
          select: true,
          cual: 2,
          priceco: 5000000
        },
        {
          name: 'Premium',
          tipo: 'Mensual',
          select: false,
          priceco: 10000000
        },
        {
          name: 'Basico Anual',
          tipo: 'Anual',
          select: false,
          cual: 1,
          priceco: 9990000
        },
        {
          name: 'Estandar Anual',
          tipo: 'Anual',
          select: false,
          cual: 2,
          priceco: 30000000
        },
        {
          name: 'Premium Anual',
          tipo: 'Anual',
          select: false,
          cual: 3,
          priceco: 60000000
        }
      ],
      product: {
        price: 0
      },
      formPlan: {},
      selectPlan: '',
      appUrl: null
    }
  },
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
        return 0
      }
    }
  },
  validations () {
    return {
      form: {
        email: { required, email }
      }
    }
  },
  components: {
    // PaypalRegistro
  },
  mounted () {
    // this.getPlans()
    console.log(this.form, 'forrrm')
    this.form.referencia = this.$randomatic('aA0000', 20)
    this.appUrl = env.appUrl + 'login_proveedor/referencia_pago/' + this.form.referencia
    console.log(this.form.referencia, 'aquii randomatic', this.appUrl)
    this.form.tipoPlan = 'Mensual'
    this.scroll()
  },
  methods: {
    ...mapMutations('generals', ['login']),
    scroll () {
      this.$refs.scrollArea.setScrollPosition(this.positionScroll)
    },
    changeSelectPlan (name) {
      var buscarInd = this.planes.findIndex(v => v.select)
      this.planes[buscarInd].select = false
      buscarInd = this.planes.findIndex(v => v.name === name)
      this.planes[buscarInd].select = true
    },
    changeTipoCuenta () {
      this.tipoPlan = this.tipoPlan === 'Anual' ? 'Mensual' : 'Anual'
      this.form.tipoPlan = this.tipoPlan
      console.log(this.form, 'cambiando tipo de plan')
    },
    async onSubmit (plan) {
      this.$q.loading.show()
      this.changeSelectPlan(plan.name)
      this.form.plan_id = plan.cual
      console.log(this.form, 'form')
      var formData = new FormData()
      var files = []
      files[0] = this.files[0]
      files[1] = this.files[1]
      formData.append('perfil', files[0])
      formData.append('portada', files[1])
      formData.append('dat', JSON.stringify(this.form))
      await this.$api.post('registrar_proveedor', formData, {
        headers: {
          'Content-Type': undefined
        }
      }).then(res => {
        this.$q.loading.hide()
        if (res) {
          const buttonWompi = document.getElementById('pagarWompi')
          buttonWompi.click()
          // this.loguear()
        } else {

        }
      })
    },
    loguear () {
      this.$api.post('login', this.form).then(res => {
        if (res) { // Se debe ejecutar una mutacion que modifique el state con sessionInfo
          const client = res.HEV_SESSION_INFO.roles.find(value => value === 2)
          if (!client) {
            this.login(res)
            this.$router.push('inicio_proveedor')
          } else {
            this.login(res)
            this.$router.push('revista')
          }
        } else {
          console.log('error de ususario')
          // this.loading = false
        }
        this.$q.loading.hide()
      })
    },
    async getPlans () {
      this.$q.loading.show()
      await this.$api.get('plans').then(res => {
        console.log(res, 'res de planes')
        this.planes = res
        this.selectPrice(this.planes[0]._id)
      })
      this.$q.loading.hide()
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
    testPadre () {
      console.log('console del test padre')
    }
  }
}
</script>

<style>
.background-cuatro {
  background: url('../../../../public/planes_nube.png');
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

.transition {
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom: 1px solid gray;
  transition: width 1s, height 1s, margin 0s;
}

.ocultar-boton-wompi {
  display: none;
}
</style>
