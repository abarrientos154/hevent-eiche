<template>
  <div>
    <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
      <div class="animated-body row justify-center" v-show="show">
        <img src="400x400/002.png" alt="Logo HEvent" style="width: 100%;height:260px">
      </div>
    </animation-transition>
    <animation-transition :animation-in-type="AnimationType.BOUNCEINDOWN" :animation-out-type="AnimationType.ROLLOUT">
      <div v-show="show">
        <div class="row justify-center text-h6 text-primary">Iniciar Sesión</div>
        <q-separator class="q-mt-xs" size="3px" inset />
      </div>
    </animation-transition>
    <q-form @submit="onSubmit" class="q-gutter-sm q-ma-sm q-mt-sm">
      <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
        <div class="animated-body" v-show="show">
          <q-input class="input-border" label-color="grey-14" type="email" v-model="form.email" dense label="Correo electrónico" borderless>
            <template v-slot:prepend>
              <q-icon class="q-pa-sm" name="mail" color="primary"></q-icon>
            </template>
          </q-input>
        </div>
      </animation-transition>
      <animation-transition :animation-in-type="AnimationType.BOUNCEINLEFT" :animation-out-type="AnimationType.ROLLOUT">
        <div class="animated-body" v-show="show">
          <q-input class="input-border" :type="isPwd ? 'password' : 'text'" v-model="form.password" label="Contraseña" dense label-color="grey-14" borderless>
            <template v-slot:prepend>
              <q-icon name="vpn_key" color="primary" class="q-pa-sm" />
            </template>
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility' : 'visibility_off'" class="cursor-pointer q-pa-sm" color="primary" @click="isPwd = !isPwd" />
            </template>
          </q-input>
        </div>
      </animation-transition>
      <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
        <div class="animated-body" v-show="show">
          <div class="text-center q-ma-sm">
            <q-btn color="secondary" class="q-mr-sm button-border" style="width:200px" :loading="loading" type="submit" label="Iniciar Sesión">
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Cargando...
              </template>
            </q-btn>
          </div>
        </div>
      </animation-transition>
    </q-form>
    <animation-transition :animation-in-type="AnimationType.BOUNCEINRIGHT" :animation-out-type="AnimationType.ROLLOUT">
      <div v-show="show">
        <q-separator class="q-mt-md" size="3px" inset />
        <div class="row justify-center text-grey-8" style="font-size:20px">¿No Tienes Cuenta?</div>
        <div class="row justify-center q-mr-sm q-gutter-sm q-mt-sm">
          <q-btn color="secondary" class="q-mt-sm button-border" style="height:45px" :loading="loading" label="Registrarte" @click="$router.push('/registro')" />
          <q-btn color="secondary" round class="q-mt-sm" :loading="loading" icon="business" @click="$router.push('/registro_proveedor')" />
        </div>
      </div>
    </animation-transition>
  </div>
</template>

<script>
import { AnimationVueTransition, AnimationVueTransitionType } from 'vue-animation'
import { mapMutations } from 'vuex'
export default {
  components: {
    [AnimationVueTransition.name]: AnimationVueTransition
  },
  data () {
    return {
      form: {},
      isPwd: true,
      loading: false,
      AnimationType: AnimationVueTransitionType,
      show: false
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    ...mapMutations('generals', ['login']),
    onSubmit () {
      // this.loading = true
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
<style lang="css" scoped>
.footer {
  width: 100%;
  text-align: center;
}
.gray {
  color: darkslategray;
}
</style>
