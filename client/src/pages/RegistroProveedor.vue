<template>
  <q-tab-panels v-model="panel" animated>
    <q-tab-panel name="parte_uno" style="padding:0px">
      <parte-uno :form="form" :panel="panelito" />
    </q-tab-panel>
    <q-tab-panel name="parte_dos" style="padding:0px">
      <div class="column">
        <parte-dos :form="form" :panel="panelito" @almacenarPP="almacenarPP" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="parte_tres" style="padding:0px">
      <div class="column">
        <parte-tres :form="form" :panel="panelito" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="parte_cuatro" style="padding:0px">
      <div class="column">
        <parte-cuatro :form="form" :panel="panelito" :files="files" />
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import ParteUno from '../components/Registro/New/ParteUno'
import ParteDos from '../components/Registro/New/ParteDos'
import ParteTres from '../components/Registro/New/ParteTres'
import ParteCuatro from '../components/Registro/New/ParteCuatro'
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
      },
      perfil: null,
      portada: null,
      files: null
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
    },
    almacenarPP (files) {
      this.files = files
      console.log(this.files, 'asd')
    }
  }
}
</script>

<style>

</style>
