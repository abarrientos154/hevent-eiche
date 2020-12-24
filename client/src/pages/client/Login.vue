<template>
  <div>
    <div class="animated-body row justify-center">
      <img src="400x400/002.png" alt="Logo HEvent" style="width: 100%;height:260px">
    </div>
    <div>
      <div class="row justify-center text-h6 text-primary">Iniciar Sesión</div>
      <q-separator class="q-mt-xs" size="3px" inset />
    </div>
    <div>
      <div class="row">
        <q-select borderless class="input-border-new q-pa-sm q-pt-sm" v-model="form.telCode" use-input input-debounce="0" :options="countries" @filter="filterFn" style="width: 80px"
        emit-value map-options option-value="name" option-label="name">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <div class="text-bold q-mt-sm" style="margin-top:12px">{{ scope.opt.dialCode }}</div>
          </template>
        </q-select>
        <q-input v-model="form.phone" class="input-border-new q-pa-sm q-ml-sm" style="width:200px" label="Telefono" dense borderless
        error-message="ingrese un telefono valido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
      </div>
    </div>
    <div>
      <q-separator class="q-mt-md" size="3px" inset />
      <div class="row justify-center text-grey-8" style="font-size:20px">¿No Tienes Cuenta?</div>
      <div class="row justify-center q-mr-sm q-gutter-sm q-mt-sm">
        <q-btn color="secondary" class="q-mt-sm button-border" style="height:45px" :loading="loading" label="Registrarte" @click="$router.push('/registro_cliente')" />
        <q-btn color="secondary" round class="q-mt-sm" :loading="loading" icon="business" @click="$router.push('/slider_proveedor')" />
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      countriesOptions: [],
      countries: []
    }
  },
  validations: {
    form: {
      phone: { required }
    }
  }
}
</script>

<style>

</style>>
