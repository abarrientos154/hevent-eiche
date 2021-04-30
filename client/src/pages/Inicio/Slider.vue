<template>
  <div style="padding:0px;margin:0px;">
    <q-tab-panels v-model="tab" animated style="padding:0px;margin:0px">
      <q-tab-panel class="window-height" name="one" style="padding:0px;margin:0px;height:100%;width:100%">
        <div style="width:100%;height:100%" class="fondotab-uno" @click="next">
        </div>
      </q-tab-panel>
      <q-tab-panel class="window-height" name="two" style="padding:0px;margin:0px;height:100%;width:100%">
        <div style="width:100%;height:100%" class="fondotab-dos" @click="next">
        </div>
        <div class="column items-center justify-center fixed-bottom vertical-bottom q-mb-lg text-grey-8 q-pl-lg q-pr-lg" style="font-size:16px; text-align:center">
          <div class="row justify-between q-mt-md">
            <q-btn color="primary" label="Registrarse" to="/registro_cliente" />
            <q-space />
            <q-btn color="primary" label="* Iniciar Sesión *" to="/login_cliente" flat />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel class="window-height" name="tree" style="padding:0px;margin:0px;height:100%;width:100%">
        <div style="width:100%;height:100%" class="fondotab-tres" @click="next">
        </div>
        <div class="column items-center justify-center fixed-bottom vertical-bottom q-mb-lg text-grey-8 q-pl-lg q-pr-lg" style="font-size:16px; text-align:center">
          <div class="row justify-between q-mt-md">
            <q-btn color="primary" label="Registrarse" to="/registro_cliente" />
            <q-space />
            <q-btn color="primary" label="* Iniciar Sesión *" to="/login_cliente" flat />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel class="window-height" name="four" style="padding:0px;margin:0px;height:100%;width:100%">
        <div style="width:100%;height:100%" class="fondotab-cuatro" @click="next">
        </div>
        <div class="column items-center justify-center fixed-bottom vertical-bottom q-mb-lg text-grey-8 q-pl-lg q-pr-lg" style="font-size:16px; text-align:center">
          <div class="row justify-between q-mt-md">
            <q-btn color="primary" label="Registrarse" to="/registro_cliente" />
            <q-space />
            <q-btn color="primary" label="* Iniciar Sesión *" to="/login_cliente" flat />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel class="window-height" name="five" style="padding:0px;margin:0px;height:100%;width:100%" @click="next">
        <div style="width:100%;height:100%" class="fondotab-cinco" @click="next">
        </div>
        <div class="column items-center justify-center fixed-bottom vertical-bottom q-mb-lg text-grey-8 q-pl-lg q-pr-lg" style="font-size:16px; text-align:center">
          <div class="row justify-between q-mt-md">
            <q-btn color="primary" label="Registrarse" to="/registro_cliente" />
            <q-space />
            <q-btn color="primary" label="* Iniciar Sesión *" to="/login_cliente" flat />
          </div>
        </div>
      </q-tab-panel>
  </q-tab-panels>
    <div v-if="showBtn" class="row justify-end items-start q-mb-md">
      <q-btn class="float-test" color="primary" label="Siguiente" flat rounded @click="next()" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'one',
      showBtn: false,
      pasar: true,
      timer: '',
      deepLink: 'empty'
    }
  },
  created () {
    this.timer = setInterval(this.test, 3000)
  },
  mounted () {
    const vm = this
    if (this.$q.platform.is.mobile) { // Si es teléfono
      universalLinks.subscribe('ul_myExampleEvent', function (eventData) {
        // do some work
        // alert('Did launch application from the link: ' + eventData.url)
        vm.deepLink = eventData.path
        vm.$router.push(eventData.path)
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    test () {
      console.log('corriendo')
      if (this.pasar) {
        this.tab = 'two'
        this.pasar = false
      }
    },
    next () {
      if (this.tab === 'one') { this.tab = 'two' } else
      if (this.tab === 'two') { this.tab = 'tree' } else
      if (this.tab === 'tree') { this.tab = 'four' } else
      if (this.tab === 'four') { this.tab = 'five' } else {
        this.$router.push('/login_cliente')
      }
    },
    cancelAutoUpdate () { clearInterval(this.timer) }
  }
}
</script>
<style scoped>
.responsive {
  background-size: contain;
  background-repeat: no-repeat;
}
.float-test {
  position: fixed;
  z-index: 1;
  bottom: 10px;
  right: 10px;
}
.label-position {
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fondotab-uno {
  background-image: url("../../../public/Video-GIF.gif");
  background-size: 100% 100%;
  width: 100%;
  height: 100%,
}
.fondotab-dos {
  background-image: url("../../../public/400x700/sliderinicio2.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%,
}
.fondotab-tres {
  background-image: url("../../../public/400x700/sliderinicio3.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%,
}
.fondotab-cuatro {
  background-image: url("../../../public/400x700/sliderinicio4.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%,
}
.fondotab-cinco {
  background-image: url("../../../public/400x700/sliderinicio5.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%,
}
</style>
