<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <tool-bar :title="title" v-if="toolbar" />
    </q-header>
    <q-footer v-if="footer" elevated>
      <div class="bg-white text-primary shadow-2 full-width row justify-between" >
        <template v-for="(item, index) in buttons_footer" v-bin:key="index">
          <div v-if="can(item.permission)" v-bind:key="index">
            <q-btn :name="item.to" :label="item.title" flat round style="width: 60px; height: 60px" @click="$router.push(item.to)">
              <img :src="item.icon" style="width: 30px; height: 30px"/>
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
    ...mapGetters('generals', ['can'])
  },
  data () {
    return {
      tab: '/revista',
      buttons_footer: [
        // TODOS LOS ITEM EN MENU PARA LOS CLIENTES
        { title: 'Blog', icon: 'search', to: '/revista', permission: 1 /* CLIENTE */ },
        { title: 'Proveedores', icon: 'list_alt', to: '/evento/buscar', permission: 1 /* CLIENTE */ },
        { title: 'Mi Evento', icon: 'event', to: '/inicio_cliente', permission: 1 /* CLIENTE */ },
        { title: 'Aprobación', icon: 'assignment_turned_in', to: '/aprobacion_cotizacion', permission: 1 }, // CLIENTE
        { title: 'Mensajes', icon: 'question_answer', to: '/mensajes/mensajes', permission: 1 /* CLIENTE */ },
        { title: 'Cerrar Sesion', icon: 'logout', to: '/login', permission: 1 },
        // TODOS LOS ITEM EN MENU PARA LOS PROVEEDORES
        { icon: 'icons/Iconos_Menu_5.png', to: '/inicio_proveedor', permission: 2 /* PROVEEDOR */ },
        { icon: 'icons/Iconos_Menu_1.png', to: '/perfil_proveedor', permission: 2 /* PROVEEDOR */ },
        { icon: 'icons/Iconos_Menu_2.png', to: '/calendario_eventos', permission: 2 }, // PROVEEDOR
        { icon: 'icons/Iconos_Menu_3.png', to: '/chats_proveedor', permission: 2 },
        { icon: 'icons/Iconos_Menu_4.png', to: '/perfil_proveedor', permission: 2 }
      ]
    }
  }
}
</script>
