<template>
  <div class="absolute-center column">
    <q-input label="url" v-model="form.url" outlined style="width:500px"/>
    <q-space></q-space>
    <q-btn class="q-mt-sm" label="Prueba" @click="ir()" color="primary" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        url: 'https://app.heventapp.com/#/slider'
      }
    }
  },
  methods: {
    ir () {
      location.href = this.form.url
    }
  }
}
</script>

<style>
.button {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 15px;
  color: #0016b0;
  background-color: #c26969;
  border-radius: 30px;
  border: 2px solid #81ba18;
  height:60px;
  width:60px
}
</style>
