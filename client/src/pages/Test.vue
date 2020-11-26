<template>
  <div>
    <div class="q-ma-md">
      <q-file borderless v-model="model" class="button" >
        <q-icon name="camera_alt" class="absolute-center" size="30px" color="white" />
      </q-file>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {},
      model: null
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
