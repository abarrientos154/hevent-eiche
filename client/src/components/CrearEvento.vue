<template>
  <q-card style="border-radius:30px" class="test">
    <q-card-section v-if="panel == 'one'">
      <div class="row justify-end">
        <q-btn color="grey" round dense icon="highlight_off" flat outline v-close-popup />
      </div>
      <div class="text-h6 text-grey-8 q-mt-lg text-bold">Crear Evento</div>
      <div class="text-grey-6 q-mt-md q-ml-sm">¿Qué clase de evento vas a realizar?</div>
      <div class="row q-gutter-sm justify-center q-mt-md">
        <q-card v-for="(tag, index) in tags" :key="index" class="q-pa-xs q-pl-sm q-pr-sm color-background-tags q-mt-md" :style="!tag.select ? 'background-color: rgba(143, 214, 255, 0.561);' : 'background-color: rgb(0, 153, 255); color: white'" @click="cambiarTipoEvento(index)">
          <div :class="!tag.select ? 'text-grey':'text-white'"> {{tag.title}} </div>
        </q-card>
      </div>
    </q-card-section>
    <q-card-section v-if="panel == 'two'">
      <div class="row justify-end">
        <q-btn color="grey" round dense icon="highlight_off" flat outline v-close-popup />
      </div>
      <div class="text-h6 text-grey-8 text-bold q-mt-lg">Información de evento</div>
      <div style="width:250px" class="row justify-start">
        <q-input v-model="form.name" label="Nombre del evento" style="width:250px" class="q-mt-md input-border" dense borderless label-color="grey-14" outlined />
        <div class="row q-mt-sm">
          <q-input v-model="form.date" style="width:130px; height:40px" mask="date" :rules="['date']" class="input-border q-pa-xs q-pl-sm q-pr-sm" dense borderless >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input borderless class="input-border q-ml-sm q-pa-xs q-pl-sm q-pr-sm" style="width:100px;height:40px" v-model="form.time" mask="time" :rules="['time']">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="form.time">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="row items-center">
          <q-input v-model.number="form.invitados" type="number" style="width:100px" class="q-mt-sm input-border" dense borderless label-color="grey-14" outlined />
          <div class="q-ml-md text-subtitle2 text-grey"># de invitados</div>
        </div>
        <div class="row justify-center">
          <q-input v-model="form.direccion" label="Direccion" style="width:250px" class="q-mt-md input-border" dense borderless label-color="grey-14" outlined />
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn v-if="panel == 'one'" label="siguiente" color="primary" style="width:200px; border-radius:12px; height:45px" class="q-mt-xl" @click="panel = 'two'" />
      <q-btn v-if="panel == 'two'" label="Guardar" color="primary" style="width:200px; border-radius:12px; height:45px" class="q-mt-xl" v-close-popup @click="save" />
    </q-card-actions>
  </q-card>
  <!-- <div class="test">
    <div class="absolute-center">asss</div>
  </div> -->
</template>

<script>
export default {
  data () {
    return {
      form: {
        invitados: 1,
        tags: []
      },
      panel: 'one',
      tags: [
        { title: 'Celebración', id: 'celebracion', select: true },
        { title: 'Boda', id: 'boda', select: false },
        { title: 'Corporativo', id: 'corporativo', select: false },
        { title: 'Reunión', id: 'reunion', select: false },
        { title: 'Convención', id: 'convencion', select: false },
        { title: 'Artístico', id: 'artistico', select: false },
        { title: 'Espititual', id: 'espiritual', select: false }
      ]
    }
  },
  mounted () {
  },
  methods: {
    save () {
      var tag = this.tags.find(v => v.select === true)
      delete tag.select
      this.form.tipoEvento = tag
      this.$api.post('event', this.form).then(res => {
        if (res) {
          this.$router.push('mi_evento/' + res._id)
        }
      })
    },
    cambiarTipoEvento (index) {
      var tag = this.tags.find(v => v.select)
      tag.select = false
      this.tags[index].select = true
    }
  }
}
</script>

<style>
.color-background-tags {
  border-radius: 12px;
}

.test {
  background: url('../../public/nube8.png');
  width: 400px;
  height: 490px;
  padding-top: 10%;
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
</style>
