<template>
  <div>
    <q-btn label="PRUEBA" class="fixed-bottom-left q-ma-md" color="primary" @click="next()" />
    <div class="background-tres"></div>
    <div style="position:absolute; top:10px; left:5px" >
      <q-btn color="white" icon="keyboard_arrow_left" flat dense @click="panel.panel = 'parte_dos'" />
    </div>
    <div class="text-center text-primary text-h6 q-mt-md"> * Preguntas Frecuentes * </div>
    <q-separator class="q-mt-md" inset />
    <div class="column q-ma-md" v-for="(item, index) in preguntas" :key="index">
      <div class="text-subtitle1">* {{item.name}} *</div>
      <div class="column" v-for="(subitem, index2) in item.pregunta" :key="index2">
        <div class="text-caption text-grey-8"> {{subitem.pregunta}} </div>
        <div v-if="subitem.valor" class="column">
          <div class="text-negative text-caption text-bold" v-if="!preguntas[index].pregunta[index2].qvalmin || !preguntas[index].pregunta[index2].qvalmax"> Campos Requeridos </div>
          <div class="row justify-start items-center">
            <q-input borderless dense v-model.number="preguntas[index].pregunta[index2].qvalmin" type="number" style="width:100px; height:30px" class="input-border-new" />
            <div class="text-grey-9 q-mb-md q-ml-sm">Minimo</div>
            <q-input borderless dense v-model.number="preguntas[index].pregunta[index2].qvalmax" type="number" style="width:100px; height:30px" class="input-border-new q-ml-sm" />
            <div class="text-grey-9 q-mb-md q-ml-sm">Maximo</div>
          </div>
        </div>
        <div v-else-if="subitem.sino" class="row justify-start items-center q-mt-xs">
          <div class="text-negative text-caption text-bold" v-if="!primera && !preguntas[index].pregunta[index2].qval"> Obligatorio Responder </div>
          <q-radio v-model="preguntas[index].pregunta[index2].qval" val="si" label="Si" />
          <q-radio v-model="preguntas[index].pregunta[index2].qval" val="no" label="No" />
        </div>
        <div v-else-if="subitem.checks" class="row justify-between q-ma-md">
          <div class="text-negative text-caption text-bold" v-if="!primera && !preguntas[index].pregunta[index2].qvals.length > 0"> Seleccione por lo menos una </div>
          <q-checkbox v-model="preguntas[index].pregunta[index2].qvals" :label="chec" :val="chec" v-for="(chec, checkIndex) in subitem.checks" :key="checkIndex" style="width:140px" />
        </div>
        <div v-else-if="subitem.sinoconrespuesta">
          <div class="text-negative text-caption text-bold" v-if="!primera && !preguntas[index].pregunta[index2].qval"> Obligatorio Responder </div>
          <div class="row items-center">
            <q-radio v-model="preguntas[index].pregunta[index2].qval" val="si" label="Si" />
            <q-radio v-model="preguntas[index].pregunta[index2].qval" val="no" label="No" />
            <q-input v-if="preguntas[index].pregunta[index2].qval === 'si'" :placeholder="preguntas[index].pregunta[index2].suffix" :type="preguntas[index].pregunta[index2].tipo" v-model="preguntas[index].pregunta[index2].qvalsi" borderless class="input-border-new q-ml-md q-mt-md" style="width:100px;height:30px" />
          </div>
        </div>
        <div v-else-if="subitem.respuesta">
          <div class="text-negative text-caption text-bold" v-if="!primera && !preguntas[index].pregunta[index2].qval"> Obligatorio Responder </div>
          <q-input :placeholder="preguntas[index].pregunta[index2].suffix" v-model="preguntas[index].pregunta[index2].qval" borderless class="input-border-new q-ml-md q-mt-md" :style="preguntas[index].pregunta[index2].autogrow ?  'width:250px;height:100px' : 'width:100px;height:30px'" :type="preguntas[index].pregunta[index2].tipo" />
        </div>
        <div v-else-if="subitem.respuestasola">
          <div class="text-negative text-caption text-bold" v-if="!primera && !preguntas[index].pregunta[index2].qval"> Obligatorio Responder </div>
          <q-input v-model="preguntas[index].pregunta[index2].qval" borderless class="input-border-new q-ml-md q-mt-md" style="width:100px;height:30px" :type="preguntas[index].pregunta[index2].tipo" />
        </div>
      </div>
    </div>
    <div>
      <div class="row justify-center q-pa-sm q-mt-md q-mb-md">
        <q-btn class="button-border" style="height:45px; width:150px" color="primary" label="siguiente" @click="next()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['form', 'panel'],
  data () {
    return {
      formTree: {},
      preguntas: [],
      respuestas: {},
      primera: true
    }
  },
  mounted () {
    this.getPreguntas()
    console.log(this.primera, 'primera mountedd')
  },
  methods: {
    getPreguntas () {
      console.log(this.form, 'formm')
      this.$api.post('preguntas', this.form).then(res => {
        for (const j of res) {
          for (const i of j.pregunta) {
            if (i.checks) {
              i.qvals = []
            }
          }
        }
        this.preguntas = res
        console.log(this.preguntas, 'preguntasssssssssssssssss')
      })
    },
    testo (in1, in2) {
      // console.log('respuestas', this.preguntas)
      console.log(this.preguntas[in1].pregunta[in2].qvals, 'sssss')
    },
    changesino (in1, in2, val) {
      this.preguntas[in1].pregunta[in2].qval = val
      console.log(this.preguntas[in1].pregunta[in2].qval, 'sssss')
    },
    async next () {
      this.primera = false
      console.log(this.preguntas, 'preguntassssssssssssssss', this.primera, 'primera')
      /* this.$q.loading.show()
      this.form.respuestas = this.preguntas
      this.panel.panel = 'parte_cuatro'
      this.$q.loading.hide() */
    }
  }
}
</script>

<style>
.background-tres {
  background: url('../../../../public/nube4.png');
  height: 150px;
  background-size: 100% 100%;
}

.sino-true {
  background-color: rgb(4, 174, 233);
  color: white;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 1px;
  padding-left: 20px;
  padding-right: 20px;
}

.sino-false {
  background-color: rgb(239, 250, 255);
  color: rgb(172, 180, 180);
  border: 1px solid grey;
  border-radius: 6px;
  padding: 1px;
  padding-left: 20px;
  padding-right: 20px;
}

</style>
