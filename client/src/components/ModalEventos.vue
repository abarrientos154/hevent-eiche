<template>
  <q-card style="border-radius:35px" class="nube">
    <q-card-section>
      <div class="row justify-end">
        <q-btn color="grey" round dense icon="highlight_off" flat outline v-close-popup />
      </div>
      <div class="text-bold text-h6 text-grey-8 q-mt-xl">Nombre del evento</div>
      <div class="text-caption text-grey-6">¿Cual evento vas a cotizar? Seleccionar</div>
      <div class="column q-mt-sm">
        <div v-for="(event, index) in data" :key="index" @click="select(index)">
          <div v-if="event.select" class="bg-primary text-white q-pa-xs q-pl-md q-mt-sm" style="border-radius:5px"> {{event.name}} </div>
          <div v-else class="bg-light-blue-1 text-grey-6 q-pa-xs q-pl-md q-mt-sm" style="border-radius:5px"> {{event.name}} </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn color="primary" label="siguiente" style="width:250px; height:45px; border-radius:6px" class="q-mt-lg" @click="goChat()" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.getEvents()
  },
  methods: {
    getEvents () {
      this.$api.get('eventos_no_pagados').then(res => {
        if (res) {
          this.data = res.map(v => {
            return {
              _id: v._id,
              name: v.name,
              select: false
            }
          })
          this.data[0].select = true
        }
      })
    },
    select (index) {
      const indexSelect = this.data.findIndex(v => v.select === true)
      this.data[indexSelect].select = false
      this.data[index].select = true
    },
    goChat () {
      const indexSelect = this.data.findIndex(v => v.select === true)
      console.log(this.data[indexSelect]._id, 'indexselect')
      this.$emit('goChat', this.data[indexSelect])
    }
  }
}
</script>

<style>
.nube {
  background: url('../../public/nube8.png');
  width: 400px;
  height: 400px;
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}

</style>
