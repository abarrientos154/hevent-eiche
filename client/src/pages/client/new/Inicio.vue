<template>
  <div>
    <div class="background-tool" style="height:150px">
      <!--  <div class="text-bold text-white text-h6 text-center row justify-center items-center" style="height:85%">HEVENT</div> -->
    </div>
    <div>
      <div class="q-ml-lg row items-center">
        <div>
          <q-avatar size="100px">
            <img :src="user.perfil ? perfilImg : 'noimg.png'" style="width: 70px;height:70px">
          </q-avatar>
        </div>
        <div class="column">
          <div class="text-grey-8 text-bold"> Hola </div>
          <div class="text-grey-7"> {{user.full_name}} </div>
        </div>
      </div>
      <q-separator inset color="grey" />
      <div class="column">
        <div class="text-center q-mt-md text-grey-7">Mi Evento</div>
        <div>
          <q-scroll-area horizontal style="height: 130px; width: 100%;" class="bg-grey-1 rounded-borders q-mb-md" >
            <div class="row no-wrap">
              <div class="shadow-3 q-ma-sm q-ml-md bg-grey-4" style="height:80px;border-radius:12px;width:150px" v-for="(event, index) in eventos" :key="index" @click="$router.push('mi_evento/' + event._id)">
                <div class="bg-primary row items-center justify-center text-white text-center style-titulo">
                  {{event.name}}
                </div>
                <div style="height:50px; border-bottom-right-radius:12px; border-bottom-left-radius:12px">
                  <img :src="event.img ? baseuEvent + event._id : 'evento.jpg'" class="img-event" style="border-bottom-right-radius:12px; border-bottom-left-radius:12px" />
                </div>
              </div>
              <div class="column shadow-3 justify-center items-center q-ma-sm q-ml-md bg-grey-5" style="height:110px;border-radius:12px;width:150px">
                <div class="text-center text-primary q-mb-sm" style="text-decoration: underline">Crear Evento</div>
                <q-btn @click="showCreateEvent = true" round size="20px" push style="width:50px" dense color="primary" icon="add" />
              </div>
              <div class="shadow-3 q-ma-sm q-ml-md bg-grey-4" style="height:80px;border-radius:12px;width:150px" v-for="(eventPay, index2) in eventosPagados" :key="index2" @click="$router.push('mi_evento/' + eventPay._id)">
                <div class="bg-primary row items-center justify-center text-white text-center style-titulo">
                  {{eventPay.name}}
                </div>
                <div style="height:50px; border-bottom-right-radius:12px; border-bottom-left-radius:12px">
                  <img :src="eventPay.img ? baseuEvent + eventPay._id : 'evento.jpg'" class="img-event" style="border-bottom-right-radius:12px; border-bottom-left-radius:12px" />
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
      <q-dialog v-model="showCreateEvent">
        <crear-evento />
      </q-dialog>
      <q-separator inset color="grey" />
      <div class="column">
        <div class="text-center text-grey text-bold q-mt-sm q-ma-sm"> Proveedores </div>
        <div class="row justify-center">
          <div class="row q-gutter-sm justify-around" style="width:300px" >
            <div v-for="(serv, index) in servicios" :key="index" style="width:90px; height:40px" class="q-mt-lg" @click="irProveedor(serv.id)">
              <div class="column items-center">
                <q-img :src="serv.icon" style="width:35px;height:35px" />
                <div class="row justify-center items-center text-grey-7"> {{serv.title}} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-separator inset color="grey" class="q-mt-lg" />
      <div class="column">
        <div class="row justify-end items-center">
          <div class="text-center q-mt-md text-grey-7">Proveedores Favoritos</div>
          <q-icon class="q-ml-xl q-mt-md q-mr-xl" flat color="grey" dense name="favorite_border" size="sm" @click="$router.push('/proveedores_me_gustan')" />
        </div>
        <q-scroll-area horizontal style="height: 260px; width: 100%;" class="rounded-borders q-mb-md q-mt-sm q-ml-sm" >
          <div class="row no-wrap q-gutter-sm" v-if="favoritos.length > 0">
            <q-card v-for="(item, index) in favoritos" :key="index" style="width:170px;height:250px;border-radius:12px;border:1px solid grey">
              <div class="text-center text-grey-7 text-bold"> * {{item.info_proveedor.name}} * </div>
              <img :src="baseu + item.proveedor_id" style="height:83%">
              <q-btn dense class="full-width gradiente-buttom" push style="border-radius:6px" label="mas informacion" size="10px" @click="masInformacion(item.proveedor_id)" />
              <div class="puntuacion-favoritos row justify-center items-center" >
                <q-icon name="star_rate" size="25px" color="orange" />
                <div class="text-white text-bold q-mr-sm"> 0 </div>
              </div>
              <q-btn icon="favorite" flat round dense color="primary" style="position:absolute;top:20px;right:5px" />
            </q-card>
          </div>
          <div v-else class="sin-favoritos" style="height:245px;width:360px" @click="$router.push('/proveedores/localizacion')">
          </div>
        </q-scroll-area>
      </div>
      <q-separator inset color="grey" />
      <div class="column">
        <div class="text-center text-grey-7 q-mt-sm">Blog</div>
        <q-scroll-area horizontal style="height: 120px; width: 100%;" class="bg-grey-1 rounded-borders q-mb-md" >
          <div class="row no-wrap">
            <div v-for="(blog, index) in blogs" :key="index" class="shadow-3 q-ma-sm q-ml-md bg-grey-4" style="height:80px;border-radius:12px;width:150px"
              @click="$router.push('blog/' + blog._id)"
            >
              <div class="bg-primary row items-center justify-center text-white text-center style-titulo">
                {{blog.titulo}}
              </div>
              <div style="height:50px; border-bottom-right-radius:12px; border-bottom-left-radius:12px">
                <img :src="baseu2 + blog._id + '/' + blog.img" class="img-event" style="border-bottom-right-radius:12px; border-bottom-left-radius:12px" />
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <q-dialog v-model="calificarD">
      <calificar :proveedores="proveedores" />
    </q-dialog>
  </div>
</template>

<script>
import CrearEvento from '../../../components/CrearEvento'
import env from '../../../env'
import Calificar from '../../../components/cliente/Calificar'
export default {
  components: {
    CrearEvento, Calificar
  },
  data () {
    return {
      calificarD: false,
      baseuEvent: '',
      eventos: [],
      eventosPagados: [],
      baseu: '',
      data: [
        {
          name: 'Nombre 2 Evento Tal',
          img: 'example_2.jpg'
        }
      ],
      data2: [
        {
          name: 'Nombre 2 Evento Tal',
          img: 'example_2.jpg'
        },
        {
          name: 'Nombre 1 Evento Tal TAL TAL TAL',
          img: 'example_1.jpg'
        },
        {
          name: 'Nombre 1 Evento Tal TAL TAL TAL',
          img: 'example_4.jpg'
        }
      ],
      servicios: [
        { title: 'Locación', id: 'localizacion', icon: 'icon_services/locacion.png' },
        { title: 'Alimentos', id: 'alimentos', icon: 'icon_services/alimentos.png' },
        { title: 'Bebidas', id: 'bebidas', icon: 'icon_services/bebidas.png' },
        { title: 'Fotógrafo', id: 'fotografia', icon: 'icon_services/fotografia.png' },
        { title: 'Vídeo', id: 'video', icon: 'icon_services/video.png' },
        { title: 'Audio', id: 'audio', icon: 'icon_services/audio.png' },
        { title: 'Música', id: 'musica', icon: 'icon_services/musica.png' },
        { title: 'Ver Mas', id: 'vermas', icon: 'icon_services/vermas.png' }
      ],
      blogs: [
      ],
      showCreateEvent: false,
      user: {},
      favoritos: [],
      perfilImg: 'noimg.png',
      baseuBlog: '',
      proveedores: []
    }
  },
  async mounted () {
    this.getEvents()
    this.getUser()
    this.misProveedoresFavoritos()
    await this.obtenerEventosRealizados()
    this.baseu2 = env.apiUrl + 'blogs_img/'
    await this.getBlogs()
    this.baseu = env.apiUrl + 'file_proveedor/portada/'
    this.baseuEvent = env.apiUrl + 'file_event/'
    if (this.$route.path === '/inicio_cliente/crear_evento') {
      this.showCreateEvent = true
    }
  },
  methods: {
    async obtenerEventosRealizados () {
      const user = JSON.parse(localStorage.getItem('HEV_SESSION_INFO'))
      console.log(user.roles[0], 'EVENTOS REALIZADOS')
      if (user.roles[0] === 2) {
        await this.$api.get('eventos_terminados_por_fecha').then(res => {
          if (res) {
            console.log(res, 'resssss eventos terminados')
            this.proveedores = res
            if (this.proveedores.length > 0) { this.calificarD = true }
          }
        })
      }
    },
    async getBlogs () {
      this.$q.loading.show()
      await this.$api.get('blogs_index').then(res => {
        this.$q.loading.hide()
        this.blogs = res
      })
    },
    async masInformacion (id) {
      this.$q.loading.show()
      this.$router.push('/proveedor/1/' + id)
      await this.$api.post('impressions/' + id).then(res => {
        this.$q.loading.hide()
        console.log(res, 'res impresiones')
      })
    },
    async misProveedoresFavoritos () {
      this.$q.loading.show()
      await this.$api.get('favoritos').then(res => {
        this.$q.loading.hide()
        if (res) {
          this.favoritos = res
        }
      })
    },
    async getEvents () {
      this.$q.loading.show()
      await this.$api.get('events_by_user').then(res => {
        this.$q.loading.hide()
        if (res) {
          this.data = res.map(v => {
            console.log(res, 'ssssss')
            if (v.pay) {
              this.eventosPagados.push({
                ...v
              })
            } else {
              this.eventos.push({
                ...v
              })
            }
            return {
              _id: v._id,
              name: v.name
            }
          })
          console.log(this.eventosPagados, this.eventos, 'eventos')
          // this.data = res
        }
      })
    },
    async getUser () {
      this.$q.loading.show()
      await this.$api.get('users_perfil').then(res => {
        this.$q.loading.hide()
        if (res) {
          this.user = res
          this.perfilImg = env.apiUrl + 'file_proveedor/perfil/' + this.user._id
          console.log(this.user, 'this user')
        }
      })
    },
    irProveedor (id) {
      if (id !== 'vermas') { this.$router.push('/proveedores/' + id) } else { this.$router.push('/ver_mas_servicios') }
    }
  }
}
</script>

<style>
.background-tool {
  background-image: url("../../../../public/nubecliente.jpg");
  background-size: 100% 100%;
}
.skewed {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #2c3e50;
  z-index: 0;
  transform: skewY(0deg);
  transform-origin: top right;
}

.style-titulo {
  height: 60px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.img-event {
  width:100%;
  height:100%;
}

.puntuacion-favoritos {
  position: absolute;
  top: 20px;
  right: 40px;
  padding: 3px;
}

.sin-favoritos {
  background: url('../../../../public/mensaje_no_favoritos.jpg');
  background-size: 100% 100%;
  width: 100%;
  height: 100%
}

</style>
