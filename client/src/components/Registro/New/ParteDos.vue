<template>
  <div>
    <div class="background-dos"></div>
    <div style="position:absolute; top:10px; left:5px" >
      <q-btn color="white" icon="keyboard_arrow_left" flat dense @click="$router.go(-1)" />
    </div>
    <div class="text-center text-primary text-subtitle1 q-mt-md"> * Perfil de tu empresa * </div>
    <q-separator class="q-mt-md" inset />
    <div class="text-center text-subtitle1 q-mt-md text-grey-9 text-bold"> * Grafica * </div>
    <div class="row q-mt-sm justify-center">
      <div class="column items-center">
        <q-avatar size="90px">
          <div class="absolute-center" style="z-index:1">
            <q-file borderless v-model="perfil" class="button-camera" @input="perfilAndPortada()" >
              <q-icon name="camera_alt" class="absolute-center" size="20px" color="black" />
            </q-file>
          </div>
          <q-img :src="imgPerfil ? imgPerfil : 'noimg.png'" />
        </q-avatar>
        <div class="text-grey-9 q-mt-sm">Logo o Foto de perfil</div>
      </div>
      <div class="column items-center">
        <div class="q-ml-lg column items-center">
          <q-avatar rounded style="width:150px;height:100px">
            <div class="absolute-center" style="z-index:1">
              <q-file borderless v-model="portada" class="button-camera" @input="perfilAndPortada()" >
                <q-icon name="camera_alt" class="absolute-center" size="20px" color="black" />
              </q-file>
            </div>
            <q-img :src="imgPortada ? imgPortada : 'example_4.jpg'" style="width:150px;height:100px; border-radius:10px" />
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
        <q-input v-model="formTwo.descripcion" class="input-border-new q-pa-sm q-mt-sm" style="width:300px;height:150px" type="textarea" placeholder="Describe tu empresa con un limite de 500 caracteres" dense borderless
          error-message="la descripcion debe ser menor a 501 caracteres" :error="$v.formTwo.descripcion.$error" @blur="$v.formTwo.descripcion.$touch()"
        />
      </div>
    </div>
    <q-separator class="q-mt-sm" inset />
    <div class="text-center text-subtitle1 q-mt-sm text-grey-9 text-bold"> * Seleccion de servicios * </div>
    <div class="row">
      <div class="row text-grey-9 q-ml-md q-mr-md">Nota:
        Seleccionar todos los servicios que ofreces para poderlos cotizar.
      </div>
    </div>
    <div class="row q-ml-md q-mr-md">
      <div class="column" v-for="(item, index) in servicios" :key="index">
        <div class="text-bold text-subtitle1 q-ma-sm">{{item.name}}</div>
        <div class="column q-ml-md q-mr-md" v-for="(subitem, index) in item.items" :key="index">
          <q-checkbox v-model="formTwo.checks" :label="subitem.name" :val="subitem.id" dense />
        </div>
      </div>
    </div>
    <div>
      <div class="row justify-center q-pa-sm q-mt-md q-mb-md">
        <q-btn class="button-border" style="height:45px; width:240px" color="primary" label="Continuar" @click="next()" />
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import env from '../../../env'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      formTwo: {
        checks: []
      },
      servicios: [],
      perfil: null,
      portada: null,
      baseu: '',
      imgPerfil: '',
      imgPortada: ''
    }
  },
  validations: {
    formTwo: {
      descripcion: {
        required, maxLength: maxLength(501)
      },
      checks: { required }
    }
  },
  mounted () {
    this.getServicios()
    this.baseu = env.apiUrl
  },
  methods: {
    getServicios () {
      this.$api.get('servicios').then(res => {
        this.servicios = res
        console.log(res, 'res')
      })
    },
    perfilAndPortada () {
      if (this.perfil) { this.imgPerfil = URL.createObjectURL(this.perfil) }
      if (this.portada) { this.imgPortada = URL.createObjectURL(this.portada) }
    },
    async next () {
      this.$q.loading.show()
      this.$v.$touch()
      if (!this.$v.formTwo.descripcion.$error) {
        this.form.descripcion = this.formTwo.descripcion
        this.form.checks = this.formTwo.checks
        var files = []
        files[0] = this.perfil
        files[1] = this.portada
        this.$emit('almacenarPP', files)
        this.panel.panel = 'parte_tres'
      }
      this.$q.loading.hide()
    }
  }
}
</script>

<style>
.background-dos {
  background: url('../../../../public/nube4.png');
  height: 150px;
  background-size: 100% 100%;
}
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: #0016b0;
  background-color: #ffffff;
  border-radius: 30px;
  border: 1px solid #7e7e7e;
  height:40px;
  width:40px
}
</style>
