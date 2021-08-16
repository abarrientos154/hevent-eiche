<template>
  <div>
    <q-btn color="white" icon="keyboard_arrow_left" flat round class="q-ma-xs" @click="$router.go(-1)" style="position:absolute" />
    <div class="background-tool" />
    <div class="text-primary text-h6 text-center"> * Datos de Pago * </div>
    <div class="column q-ma-md">
      <q-input disable readonly v-model="form.full_name" style="height:50px; padding-top: 18px" class="input-border-new" borderless label="Nombre Completo" error-message="ingrese su nombre completo" :error="$v.form.fullName.$error" @blur="$v.form.fullName.$touch()" />
      <div class="row items-center justify-center">
        <q-select disable readonly borderless v-model="telCode" :options="countries" option-value="name" option-label="name" emit-value map-options
          style="width:120px" class="input-border-new-re"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
              <q-item-section avatar>
                <q-img :src="scope.opt.name !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg' " />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.name" />
                <q-item-label caption>{{ scope.opt.dialCode }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
           <template v-slot:selected-item="scope" class="row" >
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
              <q-item-section avatar>
                <q-img :src="telCode !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg'" style="width:30px;height:20px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.dialCode }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input disable readonly v-model="form.phone" class="input-border-new q-pa-sm q-ml-sm" style="width:150px" label="Telefono" dense borderless
        />
      </div>
      <q-input v-model="form.email" style="height:50px; padding-top: 18px" class="input-border-new" borderless label="Email" type="email"
        disable readonly
      />
    </div>
    <div class="column text-primary q-mt-sm q-px-xl">
      <div class="row justify-between">
        <div class="text-bold text-h6">Sub-Total</div>
        <div class="text-bold text-h6">$ {{totalCarrito}}</div>
      </div>
      <div class="row justify-between items-center">
        <div class="text-bold text-h6">Total</div>
        <div class="column">
          <div class="text-bold text-h6">$ {{totalIva}}</div>
          <div>iva incluido</div>
        </div>
      </div>
    </div>
    <!--  <div class="row justify-center q-mt-md q-mb-md">
      <q-btn label="Pagar" color="primary" style="border-radius:6px;width:150px;height:50px" push @click="pagar()" />
    </div>-->
    <pay-wompi v-if="userCountry === 'co'" class="q-mt-md" :montoTotal="totalIva" :routeRedirect="'pagos?wompi=1&event_id=' + id_event + '&pagoEvento=1'" @confirmarPago="confirmarPago" />
    <pay-flow v-else class="q-mt-md" :montoTotal="totalIva" :routeRedirect="'?flow=1&event_id=' + id_event + '&pagoEvento=1'" @confirmarPago="confirmarPago" />
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import PayWompi from '../../components/wompi/Pay.vue'
import PayFlow from '../../components/Flow/Pay.vue'
// import env from '../../env'
export default {
  components: {
    PayWompi, PayFlow
  },
  data () {
    return {
      calificarD: true,
      form: {},
      countriesOptions: [],
      id_event: this.$route.params.id_event,
      cel: null,
      carrito: [],
      cotisaciones: [],
      userCountry: null,
      countries: [
        {
          name: 'Chile',
          dialCode: '+56',
          code: 'CL'
        },
        {
          name: 'Colombia',
          dialCode: '+57',
          code: 'CO'
        }
      ],
      telCode: 'Colombia'
    }
  },
  computed: {
    totalCarrito () {
      let total = 0
      if (this.carrito.length > 0) {
        for (const j of this.carrito) {
          for (const h of j.subitems) {
            for (const f of h.proveedores) {
              for (const i of f.productos) {
                total = total + i.tot
              }
            }
          }
        }
      }
      return total
    },
    totalIva () {
      const total = ((19 * this.totalCarrito) / 100) + this.totalCarrito
      return total
    }
  },
  validations: {
    form: {
      email: { email, required },
      phone: { required },
      fullName: { required }
    }
  },
  async mounted () {
    // this.getCountries()
    // this.form.celCode = 'Chile'
    await this.getCotisations()
    const infoUser = await this.$api.get('user_info')
    this.userCountry = infoUser.country
    this.form = infoUser
    console.log(this.userCountry, this.totalCarrito, 'usuario logueado')
  },
  methods: {
    pagar () {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.dialog({
          title: '¡Atención!',
          message: '¿Desea Confirmar su Pago?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.confirmarPago()
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }
    },
    async confirmarPago (form) {
      this.form.total = this.totalCarrito
      console.log(this.form, 'form')
      const data = {
        wompi: this.$route.query.wompi === '1',
        flow: this.$route.query.flow === '1',
        total: this.totalCarrito,
        amount_in_cents: this.$route.query.wompi === '1' ? form.amount_in_cents : this.totalCarrito + '00'
      }
      console.log(data, 'data enviar pagar')
      this.$q.loading.show()
      await this.$api.put('pay_quotes/' + this.id_event, data).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.$q.notify({
            message: 'Pago Realizado Exitosamente',
            color: 'positive'
          })
          this.$router.push('/inicio_cliente')
        }
      })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.countries = this.countriesOptions
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.countries = this.countriesOptions.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    /* getCountries () {
      this.$api.get('countries').then(res => {
        this.countriesOptions = res
        this.countries = res
      })
    }, */
    async getCotisations () {
      this.$q.loading.show()
      await this.$api.get(`cotisations_by_event/${this.id_event}`).then(res => {
        this.$q.loading.hide()
        console.log(res, 'res')
        this.cotisaciones = res
        this.carrito = res
      })
    }
  }
}
</script>

<style scoped>
.background-tool {
  background-image: url('../../../public/nube1.png');
  width:100%;
  height: 150px;
  background-size: 100% 250px;
}

.input-border-new-re {
  background: #e1f5ff;
  border: 0px solid #bbbbbb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  margin-bottom: 20px;
  padding-left: 0px;
}
</style>
