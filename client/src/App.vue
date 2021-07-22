<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      eventos: false
    }
  },
  async mounted () {
    await this.universalL()
    this.comprobarToken()
  },
  methods: {
    async comprobarToken () {
      console.log('comprobando token')
      if (!this.eventos) {
        const value = JSON.parse(this.$q.localStorage.getItem('HEV_SESSION_INFO'))
        if (value) {
          await this.$api.get('isValid').then(res => {
            if (res) {
              if (res.roles[0] === 3) {
                this.$router.push('/inicio_proveedor')
              } else {
                this.$router.push('/inicio_cliente')
              }
            } else {
              this.$router.push('/slider')
            }
          })
        }
      }
    },
    async universalL () {
      const vm = this
      if (this.$q.platform.is.mobile) { // Si es teléfono
        await universalLinks.subscribe('ul_myExampleEvent', function (eventData) {
          vm.eventos = true
          // do some work
          // alert('Did launch application from the link: ' + eventData.url)
          vm.deepLink = eventData.path
          vm.$router.push(eventData.path)
        })
        await universalLinks.subscribe('flowEvent', function (eventData) {
          // do some work
          // alert('Did launch application from the link: ' + eventData.url)
          vm.eventos = true
          vm.deepLink = eventData.path
          vm.$router.push(eventData.path)
        })
        await universalLinks.subscribe('ul_recuperatePass', function (eventData) {
          vm.eventos = true
          // do some work
          // alert('Did launch application from the link: ' + eventData.url)
          vm.$router.push('login_proveedor/' + eventData.params.codigo)
        })
        await universalLinks.subscribe('ul_pagos', function (eventData) {
          vm.eventos = true
          if (eventData.params.pagoEvento && eventData.params.wompi) {
            vm.$router.push('pagar/' + eventData.params.event_id + '?pay=1&ref=' + eventData.params.ref + '&wompi=1')
          } else if (eventData.params.pagoEvento && eventData.params.flow) {
            vm.$router.push('pagar/' + eventData.params.event_id + '?pay=1&flow=1&status=' + eventData.params.status)
          }
        })
      }
    }
  }
}
</script>
