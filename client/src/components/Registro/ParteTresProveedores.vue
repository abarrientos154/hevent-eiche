<template>
  <div class="column">
    <div class="row q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.full_name" label="Nombre Completo" outlined dense
          error-message="Ingrese Nombre y Apellido, maximo de caracteres es de 40"
          :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mb-md">
        <q-input v-model="form.phone" type="tel" label="Telefono" outlined dense />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.birthdate" stack-label type="date" label="Fecha de Nacimiento" outlined dense
          error-message="ingrese una fecha valido" :error="$v.form.birthdate.$error" @blur="$v.form.birthdate.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-select v-model="form.country" label="Pais" outlined dense :options="['Colombia', 'Chile']" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mt-md">
        <q-input v-model="form.city" label="Ciudad" outlined dense />
      </div>
    </div>
    <div class="row">
      <q-btn @click="panel.panel = 'parte_dos'" color="primary" push label="Atras" flat/>
      <q-space />
      <q-btn @click="next()" color="primary" push label="Siguiente" glossy/>
    </div>
  </div>
</template>
<script>
import { required, email, maxLength } from 'vuelidate/lib/validators'
export default {
  props: ['form', 'panel'],
  data () {
    return {
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
  methods: {
    async next (rol) {
      console.log(this.form, 'formmmmmmmmm parte trees datos')
      this.$v.form.full_name.$touch()
      this.$v.form.birthdate.$touch()
      if (!this.$v.form.full_name.$error && !this.$v.form.birthdate.$error) {
        this.panel.panel = 'parte_cuatro_proveedor_planes'
      }
    }
  }
}
</script>

<style>

</style>>
