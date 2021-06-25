<template>
  <div>
    <q-btn color="white" icon="keyboard_arrow_left" flat round class="q-ma-xs" @click="$router.go(-1)" style="position:absolute" />
    <div class="background-tool" />
    <div class="text-primary text-h6 text-center"> * Datos de Pago * </div>
    <div class="column q-ma-md">
      <q-input v-model="form.fullName" style="height:50px; padding-top: 18px" class="input-border-new" borderless label="Nombre Completo" error-message="ingrese su nombre completo" :error="$v.form.fullName.$error" @blur="$v.form.fullName.$touch()" />
      <div class="row">
          <q-select borderless class="input-border-new q-pa-sm q-pt-sm" v-model="form.celCode" use-input input-debounce="0" :options="countries" @filter="filterFn" style="width: 80px"
            emit-value map-options option-value="name" option-label="name"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin Resultados
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope">
              <div class="text-bold q-mt-sm" style="margin-top:12px">{{ scope.opt.dialCode }}</div>
            </template>
          </q-select>
          <q-input v-model="form.celular" class="input-border-new q-pa-sm q-ml-sm" style="width:200px" label="Celular" dense borderless
            error-message="ingrese un celular valido" :error="$v.form.celular.$error" @blur="$v.form.celular.$touch()"
          />
      </div>
      <q-input v-model="form.email" style="height:50px; padding-top: 18px" class="input-border-new" borderless label="Email" type="email" error-message="ingrese un email valido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()" />
    </div>
    <div class="row justify-around text-primary q-mt-sm items-center">
      <div class="text-bold text-h6">Total</div>
      <div class="column">
        <div class="text-bold text-h6">$ {{totalCarrito}}</div>
        <div class="q-pt-none q-mt-none">iva incluido</div>
      </div>
    </div>
    <div class="row justify-center q-mt-md q-mb-md">
      <q-btn label="Pagar" color="primary" style="border-radius:6px;width:150px;height:50px" push @click="pagar()" />
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      calificarD: true,
      form: {},
      countriesOptions: [],
      countries: [],
      id_event: this.$route.params.id_event,
      cel: null,
      carrito: [],
      cotisaciones: []
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
    }
  },
  validations: {
    form: {
      email: { email, required },
      celular: { required },
      fullName: { required }
    }
  },
  mounted () {
    this.getCountries()
    this.form.celCode = 'Chile'
    this.getCotisations()
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
    confirmarPago () {
      this.form.total = this.totalCarrito
      console.log(this.form, 'form')
      this.$api.put('pay_quotes/' + this.id_event, this.form).then(res => {
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
    getCountries () {
      this.$api.get('countries').then(res => {
        this.countriesOptions = res
        this.countries = res
      })
    },
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

<style>
.background-tool {
  background-image: url('../../../public/nube1.png');
  width:100%;
  height: 150px;
  background-size: 100% 250px;
}
</style>
