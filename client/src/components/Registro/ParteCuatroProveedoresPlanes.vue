<template>
  <div class="column">
    <div class="text-h6 text-grey-9">Selecciona tu plan</div>
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
    <q-btn @click="panel.panel = 'parte_tres_proveedor_datos'" color="primary" push label="Atras" flat/>
      <q-space />
      <q-btn @click="onSubmit()" color="primary" push label="Guardar" glossy/>
    </q-card-actions>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { required, email, maxLength } from 'vuelidate/lib/validators'
import PaypalRegistro from '../PaypalRegistro'
import moment from 'moment'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      planes: [],
      product: {
        price: 0
      },
      formPlan: {},
      selectPlan: ''
    }
  },
  validations () {
    return {
      form: {
        full_name: { required, maxLength: maxLength(40) },
        email: { required, email },
        birthdate: { required },
        roles: { required }
      }
    }
  },
  components: {
    PaypalRegistro
  },
  mounted () {
    this.getPlans()
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async onSubmit () {
      await this.$api.post('register', this.form).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Ya formas parte de Hevent, Bienvenido',
            color: 'positive'
          })
          this.loguear()
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

</style>>
