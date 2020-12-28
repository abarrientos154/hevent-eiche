<template>
  <q-card class="full-width nube-editar-datos q-pb-xl">
    <div style="position:absolute;top:0px;right:0px" class="q-mt-md">
      <q-btn icon="highlight_off" flat color="grey" size="lg" v-close-popup round />
    </div>
    <div class="text-h5 text-grey-8 q-mt-xl q-ml-xl text-bold text-grey-7" style="margin-top:120px">Perfil de tu empresa</div>
    <q-separator color="grey" inset />
    <div class="text-center text-subtitle1 q-mt-md text-grey-9 text-bold"> * Grafica * </div>
    <div class="row q-mt-sm justify-center">
      <div class="column items-center">
        <q-avatar size="90px">
          <div class="absolute-center" style="z-index:1">
            <q-file borderless v-model="perfil" class="button-camera" @input="changePerfil()" accept=".jpg, image/*" >
              <q-icon name="camera_alt" class="absolute-center" size="20px" color="black" />
            </q-file>
          </div>
          <q-img :src="perfilImg ? perfilImg : 'noimg.png'" />
        </q-avatar>
        <div class="text-grey-9 q-mt-sm">Logo o Foto de perfil</div>
      </div>
      <div class="column items-center">
        <div class="q-ml-lg column items-center">
          <q-avatar rounded style="width:150px;height:100px">
            <div class="absolute-center" style="z-index:1">
              <q-file borderless v-model="portada" class="button-camera" @input="changePortada()" accept=".jpg, image/*" >
                <q-icon name="camera_alt" class="absolute-center" size="20px" color="black" />
              </q-file>
            </div>
            <q-img :src="portadaImg ? portadaImg : 'example_4.jpg'" style="width:150px;height:100px; border-radius:10px" />
          </q-avatar>
          <div class="text-grey-9">Cambiar foto de portada</div>
        </div>
      </div>
    </div>
    <q-separator class="q-mt-sm" inset />
    <div class="text-center text-subtitle1 q-mt-sm text-grey-9 text-bold"> * Descripcion * </div>
    <div class="row justify-center">
      <div class="row text-grey-9 q-ml-md q-mr-md">Nota:
        No permitimos datos de contacto de la empresa como correo electronico, telefono, celular o web.
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 row justify-center">
        <q-input v-model="form.descripcion" class="input-border-new q-pa-sm q-mt-sm" style="width:300px;height:150px" type="textarea" placeholder="Describe tu empresa con un limite de 500 caracteres" dense borderless
          error-message="la descripcion debe ser menor a 501 caracteres" :error="$v.form.descripcion.$error" @blur="$v.form.descripcion.$touch()"
        />
      </div>
    </div>
    <div class="row justify-center q-mb-md">
      <q-btn label="Guardar" @click="save" class="shadow-3 gradiente-buttom" style="width:150px; height:50px" push />
    </div>
  </q-card>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import env from '../../../env'
export default {
  data () {
    return {
      form: {
      },
      perfil: null,
      perfilImg: '',
      portada: null,
      portadaImg: '',
      baseu: '',
      user: {}
    }
  },
  validations: {
    form: {
      descripcion: {
        required, maxLength: maxLength(501)
      }
    }
  },
  async mounted () {
    await this.getInfo()
    this.baseu = env.apiUrl
    this.perfilImg = this.baseu + 'file_proveedor/perfil/' + this.form._id
    this.portadaImg = this.baseu + 'file_proveedor/portada/' + this.form._id
  },
  methods: {
    save () {
      this.$v.$touch()
      console.log(this.$v.form.$error)
      if (!this.$v.form.$error) {
        this.$api.post('guardar_descripcion_proveedor', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Guardado Con Exito',
              color: 'positive'
            })
            this.$router.go(this.$router.currentRoute)
          }
        })
      }
    },
    async getInfo () {
      await this.$api.get('users_perfil').then(res => {
        this.form = res
      })
    },
    async changePerfil () {
      if (this.perfil) {
        var formData = new FormData()
        var files = []
        files[0] = this.perfil
        formData.append('files', files[0])
        await this.$api.post('actualizar_file_proveedor/perfil', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          console.log(res, 'respuesta')
          this.perfilImg = this.baseu + 'file_proveedor/perfil/' + this.user._id
          console.log(this.perfilImg, 'portada img funcion')
          this.$router.go(this.$router.currentRoute)
        })
      }
    },
    async changePortada () {
      if (this.portada) {
        var formData = new FormData()
        var files = []
        files[0] = this.portada
        formData.append('files', files[0])
        await this.$api.post('actualizar_file_proveedor/portada', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          console.log(res, 'respuesta')
          this.perfilImg = this.baseu + 'file_proveedor/portada/' + this.form._id
          console.log(this.perfilImg, 'portada img funcion')
          this.$router.go(this.$router.currentRoute)
        })
      }
    }
  }
}
</script>

<style>

</style>>
