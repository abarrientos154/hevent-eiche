<template>
  <div>
    <div>
      <q-img :src="form.img" style="width:100%; height:150px" native-context-menu>
        <q-btn @click="$router.go(-1)" class="absolute all-pointer-events" size="12px" round icon="arrow_back" outline color="primary" style="top: 0px; left: 0px" />
      </q-img>
    </div>
    <div>
      <div class="text-h5 text-primary"> {{form.titulo}} </div>
      <div class="text-h6 text-grey-8" > {{form.autor}} </div>
      <q-separator inset class="q-ma-sm" />
      <p class="text-grey-7" > {{form.contenido}} </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
