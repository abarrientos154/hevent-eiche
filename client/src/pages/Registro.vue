<template>
  <q-tab-panels v-model="panel" animated>
    <q-tab-panel name="parte_uno" style="padding:0px">
      <parte-uno :form="form" :panel="panelito" />
    </q-tab-panel>
    <q-tab-panel name="parte_dos">
      <div class="column">
        <parte-dos :form="form" :panel="panelito" />
        <q-btn color="primary" push label="Volver" glossy @click="panelito.panel = 'parte_uno'" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="parte_tres_proveedor_datos">
      <div class="column">
        <parte-tres :form="form" :panel="panelito" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="parte_cuatro_proveedor_planes">
      <div class="column">
        <parte-cuatro :form="form" :panel="panelito" />
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import ParteUno from '../components/Registro/ParteUno'
import ParteDos from '../components/Registro/ParteDos'
import ParteTres from '../components/Registro/ParteTresProveedores'
import ParteCuatro from '../components/Registro/ParteCuatroProveedoresPlanes'
import { required, email, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  components: {
    ParteUno, ParteDos, ParteTres, ParteCuatro
  },
  computed: {
    panel () {
      return this.panelito.panel
    }
  },
  data () {
    return {
      form: {},
      repeatPassword: '',
      password: '',
      options_roles: [
        { label: 'Proveedor', value: 3 },
        { label: 'Cliente', value: 2 }
      ],
      panelito: {
        panel: 'parte_uno'
      }
    }
  },
  validations () {
    return {
      form: {
        full_name: { required, maxLength: maxLength(40) },
        email: { required, email },
        roles: { required }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  methods: {
    test () {
      console.log(this.form)
    }
  }
}
</script>

<style>

</style>
