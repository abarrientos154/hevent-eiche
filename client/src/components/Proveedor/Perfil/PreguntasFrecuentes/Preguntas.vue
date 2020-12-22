<template>
  <div>
    <div class="background-tres"></div>
    <div style="position:absolute; top:10px; left:5px" >
      <q-btn color="white" icon="arrow_back" flat dense @click="panel.panel = 'parte_dos'" />
    </div>
    <div class="text-center text-primary text-h6 q-mt-md"> * Preguntas Frecuentes * </div>
    <q-separator class="q-mt-md" inset />
    <div class="column q-ma-sm" v-for="(item, index) in preguntas" :key="index">
      <div class="text-subtitle1">* {{item.name}} *</div>
      <div class="column" v-for="(subitem, index2) in item.pregunta" :key="index2">
        <div class="text-caption text-grey-8"> {{subitem.pregunta}} </div>
        <div v-if="subitem.valor" class="row justify-start items-center q-mt-xs">
          <q-input borderless dense v-model.number="preguntas[index].pregunta[index2].qvalmin" type="number" style="width:100px; height:30px" class="input-border-new" />
          <div class="text-grey-9 q-mb-md q-ml-sm">Minimo</div>
          <q-input borderless dense v-model.number="preguntas[index].pregunta[index2].qvalmax" type="number" style="width:100px; height:30px" class="input-border-new q-ml-sm" />
          <div class="text-grey-9 q-mb-md q-ml-sm">Maximo</div>
        </div>
        <div v-else-if="subitem.sino" class="row justify-start items-center q-mt-xs">
          <!-- <div :class="preguntas[index].pregunta[index2].qval === 'si' ? 'sino-true q-mr-sm' : 'sino-false q-mr-sm'" @click="changesino(index, index2, 'si')">Si</div>
          <div :class="preguntas[index].pregunta[index2].qval === 'no' ? 'sino-true q-mr-sm' : 'sino-false q-mr-sm'" @click="changesino(index, index2, 'no')">No</div> -->
          <q-radio v-model="preguntas[index].pregunta[index2].qval" val="si" label="Si" />
          <q-radio v-model="preguntas[index].pregunta[index2].qval" val="no" label="No" />
        </div>
        <div v-else-if="subitem.checks" class="row justify-between q-ma-md">
          <q-checkbox v-model="preguntas[index].pregunta[index2].qvals" :label="chec" :val="chec" v-for="(chec, checkIndex) in subitem.checks" :key="checkIndex" style="width:140px" />
        </div>
        <div v-else-if="subitem.sinoconrespuesta">
          <div class="row items-center">
            <q-radio v-model="preguntas[index].pregunta[index2].qval" val="si" label="Si" />
            <q-radio v-model="preguntas[index].pregunta[index2].qval" val="no" label="No" />
            <q-input v-if="preguntas[index].pregunta[index2].qval === 'si'" :placeholder="preguntas[index].pregunta[index2].suffix" :type="preguntas[index].pregunta[index2].tipo" v-model="preguntas[index].pregunta[index2].qvalsi" borderless class="input-border-new q-ml-md q-mt-md" style="width:100px;height:30px" />
          </div>
        </div>
        <div v-else-if="subitem.respuesta">
          <q-input :placeholder="preguntas[index].pregunta[index2].suffix" v-model="preguntas[index].pregunta[index2].qval" borderless class="input-border-new q-ml-md q-mt-md" :style="preguntas[index].pregunta[index2].autogrow ?  'width:250px;height:100px' : 'width:100px;height:30px'" :type="preguntas[index].pregunta[index2].tipo" />
        </div>
        <div v-else-if="subitem.respuestasola">
          <q-input v-model="preguntas[index].pregunta[index2].qval" borderless class="input-border-new q-ml-md q-mt-md" style="width:100px;height:30px" :type="preguntas[index].pregunta[index2].tipo" />
        </div>
      </div>
    </div>
    <q-separator inset class="q-mt-md" />
    <div class="row justify-center q-mt-lg">
      <q-btn label="Guardar" @click="save" color="primary" push style="width:140px;height:45px"  />
    </div>
  </div>
</template>

<script>
export default {
  props: ['form', 'servicios', 'user'],
  data () {
    return {
      preguntas: []
    }
  },
  async mounted () {
    await this.getPreguntas()
    this.formatear()
  },
  methods: {
    async getPreguntas () {
      this.$q.loading.show()
      console.log(this.form.checks, 'form')
      await this.$api.post('preguntas', this.form).then(res => {
        for (const j of res) {
          for (const i of j.pregunta) {
            if (i.checks) {
              i.qvals = []
            }
          }
        }
        this.preguntas = res
      })
      this.$q.loading.hide()
    },
    async formatear () {
      var preguntas1 = this.preguntas
      await this.$api.get('servicios_proveedor').then(res => {
        var preguntas2 = res
        console.log(preguntas1, '1111111', preguntas2, '2222222222222')
        for (var j of preguntas1) {
          const buscar = preguntas2.find(v => v.id === j.id)
          if (buscar) {
            j.pregunta = buscar.pregunta
          }
        }
      })
    },
    async save () {
      this.$q.loading.show()
      const preguntas = this.preguntas.map(v => {
        return {
          id: v.id,
          pyr: v.pregunta,
          servicio_id: v.servicio_id
        }
      })
      console.log(preguntas, 'preguntas', this.form.checks, 'checks')

      await this.$api.put('modificar_servicios_preguntas', { preguntas: preguntas, servicios: this.form.checks }).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Guardado Correctamente',
            color: 'positive'
          })
          // this.$router.go(this.$router.currentRoute)
        }
      })
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>
