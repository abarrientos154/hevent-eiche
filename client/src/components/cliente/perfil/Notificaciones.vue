<template>
  <q-card class="full-width nube-editar-datos-client q-pb-xl q-pb" style="border-radius:20px">
    <div style="position:absolute;top:0px;right:0px" class="q-mt-md">
      <q-btn icon="highlight_off" flat color="grey" size="lg" v-close-popup round />
    </div>
    <div class="row q-mt-xl q-ml-lg items-center" style="margin-top:120px">
      <div class="text-h5 text-grey-8 text-bold text-grey-7">Notificaciones</div>
      <div class="row q-ml-lg items-center q-mt-lg text-grey-7">
        <p>SMS</p>
        <p class="q-ml-md">Email</p>
      </div>
    </div>

    <div class="column q-pa-sm q-ml-md q-mr-md">
      <div class="row items-center justify-around">
        <q-item class="text-grey-7" style="width:300px">
          <q-item-section>
            <q-item-label>
              Recordatorio de Evento
            </q-item-label>
          </q-item-section>
          <q-item-section side center>
            <div class="row">
              <q-toggle v-model="form.eventCel" class="q-ml-md" />
              <q-toggle v-model="form.eventMail" />
            </div>
          </q-item-section>
        </q-item>
      </div>

      <div class="row items-center justify-around">
        <q-item class="text-grey-7" style="width:300px">
          <q-item-section>
            <q-item-label>
              Suscripcion al Blog
            </q-item-label>
          </q-item-section>
          <q-item-section side center>
            <div class="row">
              <q-toggle v-model="form.susCel" class="q-ml-md" />
              <q-toggle v-model="form.susMail" />
            </div>
          </q-item-section>
        </q-item>
      </div>

      <div class="row items-center justify-around">
        <q-item class="text-grey-7" style="width:300px">
          <q-item-section>
            <q-item-label>
              Recibir Mensajes de proveedores
            </q-item-label>
          </q-item-section>
          <q-item-section side center>
            <div class="row">
              <q-toggle v-model="form.proCel" class="q-ml-md" />
              <q-toggle v-model="form.proMail" />
            </div>
          </q-item-section>
        </q-item>
      </div>
    </div>

    <q-card-actions align="center">
      <q-btn push label="guardar" class="gradiente-buttom" style="width:80%; height:40px" @click="guardar()" />
    </q-card-actions>

  </q-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        eventMail: false,
        eventCel: false,
        susMail: false,
        susCel: false,
        proCel: false,
        proMail: false
      }
    }
  },
  validations () {
    return {
      form: {
        full_name: { required },
        email: { required, email },
        phone: { required }
      }
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      this.$api.get('users_perfil').then(res => {
        this.form = res.notificacion
        console.log(res)
      })
    },
    async guardar () {
      await this.$api.put('editar_notificacion_cliente', this.form).then(res => {
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
</script>

<style>
.nube-editar-datos-client {
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
