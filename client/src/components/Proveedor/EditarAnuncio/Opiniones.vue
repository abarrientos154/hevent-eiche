<template>
  <div class="q-mb-md q-mt-md" v-if="data.length > 0">
    <q-list class="q-mt-sm q-mb-lg">
      <div v-for="(item, index) in data" :key="index">
        <q-item class="q-mt-md">
          <q-item-section top avatar>
            <q-avatar >
              <q-img :src="item.img" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{item.usuario.full_name}}</q-item-label>
            <q-item-label caption lines="5">{{item.comentario}}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <div class="column">
              <q-item-label caption>{{item.created_at}}</q-item-label>
              <div class="row justify-end q-mt-md items-center">
                <div class="text-subtitle1 text-bold"> {{item.puntuacion}} </div>
                <q-icon name="star" color="orange" class="q-ml-sm" size="30px" />
              </div>
            </div>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
  <div v-else>
    <div class="absolute-center text-subtitle1">
      Actualmente sin opiniones...
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.consultar()
  },
  methods: {
    consultar () {
      this.$api.get('opiniones').then(res => {
        this.data = res
        this.data = res.map(v => {
          return {
            ...v,
            img: 'noimg.png'
          }
        })
      })
    }
  }
}
</script>

<style>

</style>
