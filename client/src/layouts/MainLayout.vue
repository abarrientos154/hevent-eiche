<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <tool-bar :title="title" v-if="toolbar" />
    </q-header>
    <q-footer v-if="footer" elevated>
      <div class="bg-white text-primary shadow-2 full-width row justify-between" >
        <template v-for="(item, index) in buttons_footer" v-bin:key="index">
          <div v-if="can(item.permission)" v-bind:key="index">
            <q-btn :name="item.to" :label="item.title" flat round style="width: 60px; height: 60px" @click="$router.push(item.to), irRuta(item.to)">
              <img :src="rutaActual === item.to ? item.iconSelect : item.icon" style="width: 40px; height: 40px"/>
            </q-btn>
          </div>
        </template>
      </div>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import ToolBar from '../components/ToolBar'
export default {
  components: {
    ToolBar
  },
  computed: {
    title () {
      return this.$route.meta.title
    },
    toolbar () {
      return this.$route.meta.toolbar
    },
    footer () {
      return this.$route.meta.footer
    },
    icono () {
      return this.$router.currentRoute.path
    },
    ...mapGetters('generals', ['can'])
  },
  data () {
    return {
      tab: '/revista',
      rutaActual: this.$router.currentRoute.path,
      buttons_footer: [
        // TODOS LOS ITEM EN MENU PARA LOS CLIENTES
        { icon: 'iconos_menu/iinicio.png', to: '/inicio_cliente', permission: 1, iconSelect: 'iconos_menu/iinicioa.png' },
        { icon: 'iconos_menu/iblog.png', to: '/revista', permission: 1, iconSelect: 'iconos_menu/ibloga.png' },
        { icon: 'iconos_menu/iproveedor.png', to: '/ver_mas_servicios', permission: 1, iconSelect: 'iconos_menu/iproveedora.png' },
        { icon: 'iconos_menu/ichats.png', to: '/chats_clientes', permission: 1, iconSelect: 'iconos_menu/ichatsa.png' },
        { icon: 'iconos_menu/iperfil.png', to: '/perfil_cliente', permission: 1, iconSelect: 'iconos_menu/iperfila.png' },
        // TODOS LOS ITEM EN MENU PARA LOS PROVEEDORES
        { icon: 'iconos_menu/iinicio.png', to: '/inicio_proveedor', permission: 2, iconSelect: 'iconos_menu/iinicioa.png' /* PROVEEDOR */ },
        { icon: 'iconos_menu/iestadisticas.png', to: '/estadisticas', permission: 2, iconSelect: 'iconos_menu/iestadisticasa.png' /* PROVEEDOR */ },
        { icon: 'iconos_menu/icalendario.png', to: '/calendario_eventos', permission: 2, iconSelect: 'iconos_menu/icalendarioa.png' }, // PROVEEDOR
        { icon: 'iconos_menu/ichats.png', to: '/chats_proveedor', permission: 2, iconSelect: 'iconos_menu/ichatsa.png' },
        { icon: 'iconos_menu/iperfil.png', to: '/perfil_proveedor', permission: 2, iconSelect: 'iconos_menu/iperfila.png' }
      ]
    }
  },
  methods: {
    irRuta (to) {
      console.log(this.rutaActual, 'r1')
      this.rutaActual = to
      console.log(this.rutaActual, 'r2')
    }
  },
  mounted () {
    console.log(this.$router.currentRoute, 'console')
  }
}
</script>
