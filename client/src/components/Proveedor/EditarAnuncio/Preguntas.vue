<template>
  <div>
    <div class="column q-ma-md" v-for="(item, index) in preguntas" :key="index">
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
          <q-radio v-model="preguntas[index].pregunta[index2].qval" val="si" label="Si" />
          <q-radio v-model="preguntas[index].pregunta[index2].qval" val="no" label="No" />
        </div>
        <div v-else-if="subitem.checks" class="row justify-between q-ma-xs">
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
    <div class="row justify-center q-mb-md">
      <q-btn label="guardar" push style="border-radius:12px; width:300px; height:50px" color="primary" @click="modificarPreguntas()" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      preguntas: []
    }
  },
  mounted () {
    this.getPreguntas()
  },
  methods: {
    async getPreguntas () {
      this.$q.loading.show()
      await this.$api.get('servicios_proveedor').then(res => {
        this.preguntas = res
        console.log(this.preguntas, 'preguntas')
      })
      this.$q.loading.hide()
    },
    async modificarPreguntas () {
      this.$q.loading.show()
      const preguntas = this.preguntas.map(v => {
        return {
          _id: v._id,
          pyr: v.pregunta
        }
      })
      console.log(preguntas, 'preguntas')
      await this.$api.put('preguntas', { preguntas: preguntas }).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Descripcion Guardada Exitosamente',
            color: 'positive'
          })
          this.getPreguntas()
        }
      })
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>
