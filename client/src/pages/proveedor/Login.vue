<template>
  <div>
    <div class="row justify-center">
      <img src="Pagina52/Mesa de trabajo 2.png" style="width: 100%;height:400px"/>
    </div>
    <div class="text-subtitle2 text-center text-primary">Iniciar Sesión</div>
    <div class="q-mt-sm">
      <div>
        <q-input class="input-border-new q-pa-sm q-ml-xl q-mr-xl" label-color="grey-14" type="email" v-model="form.email"
          dense label="Correo electrónico" borderless
        />
      </div>
      <div>
        <q-input class="input-border-new q-pa-sm q-ml-xl q-mr-xl" :type="isPwd ? 'password' : 'text'" v-model="form.password" label="Contraseña" dense label-color="grey-14" borderless>
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-between q-mr-xl q-ml-xl">
     <q-checkbox size="xs" v-model="shape" val="xs" label="Recordar" />
     <label @click="modal = true">¿Olvide contraseña?</label>
    </div>
    <div class="text-center q-ma-sm">
      <q-btn color="primary" class="q-mr-sm button-border" style="width:200px" :loading="loading" @click="onSubmit()" label="Iniciar Sesión">
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
            Cargando...
        </template>
      </q-btn>
    </div>
    <q-dialog v-model="modal" style="width:100%">
      <q-card style="border-radius:35px" class="nube">
        <div class="row justify-end q-mr-md q-mt-md">
          <q-btn color="grey" round dense icon="highlight_off" flat outline v-close-popup />
        </div>
        <div class="q-ma-lg row justify-center">
          <label class="text-h6 q-mb-xs">Restablecer contraseña</label>
          <q-input class="input-border-new" style="width:240px" label-color="grey-14" type="email" v-model="form.verificacion" dense label="correo@gmail.com" borderless/>
          <q-btn color="primary" class="q-mr-sm button-border" style="width:200px" type="submit" label="Enviar correo" @click="modal2 = true"/>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal2" style="width:100%">
      <q-card style="border-radius:35px" class="nube">
        <div class="row justify-end q-mr-md q-mt-md">
          <q-btn color="grey" round dense icon="highlight_off" flat outline v-close-popup />
        </div>
        <div class="q-mr-lg q-ml-lg q-mb-lg row justify-center">
          <label class="text-h6 q-mb-xs">Restablecer contraseña</label>
          <q-input class="input-border-new" style="width:240px" label-color="grey-14" type="email" v-model="form.verificacion" dense label="email escrito" borderless/>
          <div class="text-caption q-mr-sm text-grey">Comprueba si has recibido un email con información sobre como restablecer la contraseña</div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      form: {},
      shape: [],
      modal: false,
      modal2: false,
      password: '',
      repeatPassword: '',
      isPwd: false,
      loading: false
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    onSubmit () {
      // this.loading = true
      console.log(this.form, 'form')
      this.$q.loading.show({
        message: 'Iniciando sesión'
      })
      this.$api.post('login', this.form).then(res => {
        if (res) { // Se debe ejecutar una mutacion que modifique el state con sessionInfo
          const client = res.HEV_SESSION_INFO.roles.find(value => value === 2)
          if (!client) {
            this.login(res)
            this.$router.push('inicio_proveedor')
          } else {
            this.login(res)
            this.$router.push('inicio_cliente')
          }
        } else {
          console.log('error de ususario')
          // this.loading = false
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>

<style>
.nube {
  background: url('../../../public/nube8.png');
  width: 100%;
  height: 220px;
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
</style>>
