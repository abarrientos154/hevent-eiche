<template>
  <div>
    <div class="q-ma-sm q-pa-sm bg-grey-4 q-mb-xl" style="border-radius:20px;margin-bottom: 80px">
      <div class="column" v-for="(item, index) in preguntas" :key="index">
        <div class="text-subtitle1">* {{item.name}} *</div>
        <div class="column" v-for="(subitem, index2) in item.pregunta" :key="index2">
          <div class="text-caption text-grey-8"> {{subitem.pregunta}} </div>
          <div v-if="subitem.valor" class="row justify-start q-ml-sm q-mb-sm items-center q-mt-xs q-gutter-sm">
            <div class="text-grey-9">Minimo</div>
            <div> {{preguntas[index].pregunta[index2].qvalmin}} </div>
            <div class="text-grey-9">Maximo</div>
            <div> {{preguntas[index].pregunta[index2].qvalmax}} </div>
          </div>
          <div v-else-if="subitem.sino" class="row justify-start items-center q-mt-xs q-ml-sm q-mb-sm">
            {{ preguntas[index].pregunta[index2].qval }}
          </div>
          <div v-else-if="subitem.checks" class="row q-ma-xs q-gutter-sm justify-around q-mb-sm">
            <div v-for="(chec, checkIndex) in preguntas[index].pregunta[index2].qvals" :key="checkIndex">
              {{chec}}
            </div>

          </div>
          <div v-else-if="subitem.sinoconrespuesta">
            <div class="row items-center q-ml-md">
              <div class="row justify-center">
                <div class="q-mr-sm"> {{preguntas[index].pregunta[index2].qval}} </div>
                <div v-if="preguntas[index].pregunta[index2].qval === 'si'" class="row q-ml-md">
                  <div> {{preguntas[index].pregunta[index2].suffix}}: </div>
                  <div class="q-ml-sm">{{preguntas[index].pregunta[index2].qvalsi}} </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="subitem.respuesta" class="row q-ml-sm">
            <div class="q-ml-sm"> {{preguntas[index].pregunta[index2].qval}} </div>
            <div class="q-ml-sm" v-if="preguntas[index].pregunta[index2].suffix"> {{preguntas[index].pregunta[index2].suffix}} </div>
          </div>
          <div v-else-if="subitem.respuestasola">
            <q-input v-model="preguntas[index].pregunta[index2].qval" borderless class="input-border-new q-ml-md q-mt-md" style="width:100px;height:30px" :type="preguntas[index].pregunta[index2].tipo" disable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id_proveedor'],
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
      await this.$api.get('servicios_proveedor/' + this.id_proveedor).then(res => {
        this.preguntas = res
        console.log(this.preguntas, 'preguntas')
      })
      this.$q.loading.hide()
    }
  }
}
</script>

<style>
.flotar {
  position: absolute;
  bottom: 0px;
}

</style>
