<template>
  <div>
    <q-list>
      <q-item>
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="bluetooth" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>
    </q-list>
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
      })
    }
  }
}
</script>

<style>

</style>
