<template>
  <q-card class="full-width nube-editar-datos-client-pass q-pb-xl q-pb" style="border-radius:20px">
    <div style="position:absolute;top:0px;right:0px" class="q-mt-md">
      <q-btn icon="highlight_off" flat color="grey" size="lg" v-close-popup round />
    </div>

    <div class="text-h5 text-grey-8 text-bold text-grey-7 q-mt-xl q-ml-lg" style="margin-top:90px">Modificar Contraseña</div>

    <div class="row q-pa-sm q-ml-md q-mr-md q-mt-md">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input class="input-border-new q-pa-sm" :type="isPwd ? 'password' : 'text'" v-model="form.oldPassword" label="Contraseña Actual" dense label-color="grey-14" borderless
        error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.form.oldPassword.$error" @blur="$v.form.oldPassword.$touch()">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input class="input-border-new q-pa-sm" :type="isPwd ? 'password' : 'text'" v-model="password" label="Contraseña Nueva" dense label-color="grey-14" borderless
        error-message="ingrese una contraseña valida, minimo de caracteres es de 6" :error="$v.password.$error" @blur="$v.password.$touch()">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input class="input-border-new q-pa-sm" :type="isPwd ? 'password' : 'text'" v-model="repeatPassword" label="Confirmar Contraseña" dense label-color="grey-14" borderless
        error-message="las contraseñas deben ser iguales" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
    </div>

    <q-card-actions align="center">
      <q-btn push label="guardar" class="gradiente-buttom" style="width:80%; height:40px" @click="guardar()" />
    </q-card-actions>

  </q-card>
</template>

<script>
import { required, sameAs, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      password: '',
      repeatPassword: '',
      isPwd: true,
      form: {}
    }
  },
  validations () {
    return {
      form: {
        oldPassword: { required }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  },
  methods: {
    async guardar () {
      this.$v.$touch()
      if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
        this.form.password = this.password
        await this.$api.put('editar_contrasena_cliente', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Guardado Correctamente',
              color: 'positive'
            })
          }
        })
      }
    }
  }
}
</script>

<style>
.nube-editar-datos-client-pass {
  background: url('../../../../public/nube9.png');
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
.input-border-new-per {
  background: #e1f5ff;
  border: 0px solid #bbbbbb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  margin-bottom: 20px;
  padding-left: 0px;
}
</style>
