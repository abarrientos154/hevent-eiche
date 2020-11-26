<template>
  <q-toolbar>
    <q-toolbar-title>
      <div class="row justify-center">
        {{title}}
      </div>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>
