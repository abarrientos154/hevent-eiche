<template>
  <q-card class="full-width nube-editar-datos-cal q-pb-xl q-pb" style="border-radius:20px">
    <div style="position:absolute;top:0px;right:0px" class="q-mt-md">
      <q-btn icon="highlight_off" flat color="grey" size="lg" v-close-popup round />
    </div>
    <div class="text-grey-7 q-ml-lg q-mt-xl text-h6" style="margin-top:100px"> ¿Como te fue en tu evento con? </div>

    <div class="row justify-center">
      <q-item>
        <q-item-section avatar>
          <q-img :src="baseu + proveedores[indCoti].datos_proveedor._id" style="border-radius:100%; width:70px;height:70px" />
        </q-item-section>

        <q-item-section class="text-primary text-subtitle1"> * {{proveedores[indCoti].datos_proveedor.name}} * </q-item-section>
      </q-item>
    </div>

    <q-list dense class="q-mt-md">
      <q-item>
        <q-item-section class="q-ml-lg" style="width:300px">
          <q-item-label class="text-grey-7">Calidad del Servicio</q-item-label>
        </q-item-section>

        <q-item-section side center class="q-ml-lg" style="width:150px">
          <q-rating v-model="form.calidadS" size="1.5em" class="q-ml-md" color="primary" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section class="q-ml-lg" style="width:150px">
          <q-item-label class="text-grey-7">Costo Beneficio</q-item-label>
        </q-item-section>

        <q-item-section side center>
          <q-rating v-model="form.costoB" size="1.5em" class="q-ml-md" color="primary" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section class="q-ml-lg" style="width:150px">
          <q-item-label class="text-grey-7">Profesionalidad</q-item-label>
        </q-item-section>

        <q-item-section side center>
          <q-rating v-model="form.profesionalidad" size="1.5em" class="q-ml-md" color="primary" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section class="q-ml-lg" style="width:150px">
          <q-item-label class="text-grey-7">Respuesta</q-item-label>
        </q-item-section>

        <q-item-section side center>
          <q-rating v-model="form.respuesta" size="1.5em" class="q-ml-md" color="primary" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section class="q-ml-lg" style="width:150px">
          <q-item-label class="text-grey-7">Flexibilidad</q-item-label>
        </q-item-section>

        <q-item-section side center>
          <q-rating v-model="form.flexibilidad" size="1.5em" class="q-ml-md" color="primary" />
        </q-item-section>
      </q-item>
    </q-list>
    <div class="row justify-center">
      <div class="q-pa-sm row justify-center items-center estilo-puntuacion">
        <div>
          <q-icon name="start" color="orange" size="md" />
        </div>
        <div class="text-h6 text-grey-6"> {{totalPuntuado}} </div>
      </div>
    </div>

    <div class="q-ma-sm">
      <q-input label="Deja tu Opinion" v-model="form.opinion" dense class="input-border-new" borderless type="textarea" style="height:100px" />
    </div>

    <q-card-actions align="center">
      <q-btn push label="Siguiente" v-if="proveedores.length > 1 && indCoti != (proveedores.length - 1)" class="gradiente-buttom" style="width:80%; height:40px" @click="siguiente()" />
      <q-btn push label="Finalizar" v-if="indCoti === (proveedores.length - 1)"  class="gradiente-buttom" style="width:80%; height:40px" @click="guardar()" v-close-popup />
    </q-card-actions>

  </q-card>
</template>

<script>
import env from '../../env'
export default {
  props: ['proveedores'],
  data () {
    return {
      baseu: '',
      indProveedor: 0,
      indCoti: 0,
      form: {
        calidadS: 0,
        costoB: 0,
        profesionalidad: 0,
        respuesta: 0,
        flexibilidad: 0,
        opinion: ''
      },
      datos: []
    }
  },
  computed: {
    totalPuntuado () {
      var total = this.form.calidadS + this.form.costoB + this.form.profesionalidad + this.form.respuesta + this.form.flexibilidad
      console.log(total, 'asd')
      var devolver = (total / 5)
      console.log(devolver, 'asdfdddd')
      return devolver
    }
  },
  methods: {
    guardar () {
      this.form.cotisacion_id = this.proveedores[this.indCoti]._id
      this.form.proveedor_id = this.proveedores[this.indCoti].proveedor_id
      this.datos.push(this.form)
      const mandar = {
        datos: this.datos
      }
      this.$api.post('opinar', mandar).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Haz puntuado con exito a tu/s proveedor/es'
          })
        }
      })
    },
    siguiente () {
      this.form.cotisacion_id = this.proveedores[this.indCoti]._id
      this.form.proveedor_id = this.proveedores[this.indCoti].proveedor_id
      this.datos.push(this.form)
      console.log(this.datos, 'datos agregados')
      this.form = {
        calidadS: 0,
        costoB: 0,
        profesionalidad: 0,
        respuesta: 0,
        flexibilidad: 0,
        opinion: ''
      }
      this.indCoti += 1
    }
  },
  mounted () {
    console.log(this.proveedores, 'proveedores')
    this.baseu = env.apiUrl + 'file_proveedor/perfil/'
  }
}
</script>

<style>
.nube-editar-datos-cal {
  background: url('../../../public/nube9.png');
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
.input-border-new-cal {
  background: #e1f5ff;
  border: 0px solid #bbbbbb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  margin-bottom: 20px;
  padding-left: 0px;
}

.estilo-puntuacion {
  background-color: rgb(226, 226, 226);
  margin: 10px;
  width: 100px;
  height: 40px;
}
</style>
