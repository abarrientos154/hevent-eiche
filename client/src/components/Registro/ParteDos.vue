<template>
  <div>
    <div class="text-h6 text-center text-grey-9" >¿Eres Un?</div>
    <q-list>
      <q-card v-ripple style="border-radius:10px;width:100%" class="q-pa-sm q-mt-md q-mb-md" v-for="(item, index) in options_roles" :key="index" @click="onSubmit(item.value)" >
        <q-item>
          <q-item-section avatar>
            <q-avatar :icon="item.icon" class="text-primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-primary text-h6">{{item.label}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="arrow_right" color="primary" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-list>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      options_roles: [
        { label: 'Proveedor', value: 3, icon: 'store' },
        { label: 'Cliente', value: 2, icon: 'person' }
      ]
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async onSubmit (rol) {
      this.$q.loading.show()
      this.form.roles = rol
      console.log(this.form, 'formmmm parte dos')
      if (rol === 2) { // Es Cliente
        await this.$api.post('register', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Ya formas parte de Hevent, Bienvenido',
              color: 'positive'
            })
            this.loguear()
          }
        })
      } else if (rol === 3) { // Es proveedor
        this.panel.panel = 'parte_tres_proveedor_datos'
      }
      this.$q.loading.hide()
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
    }
  }
}
</script>

<style>

</style>>
