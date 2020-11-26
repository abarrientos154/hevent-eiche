<template>
  <div>
    <div class="background-tool" style="height:150px">
      <q-btn color="white" icon="menu" flat round class="q-ma-xs" />
      <div class="text-bold text-white text-h6 text-center row justify-center">HEVENT</div>
    </div>
    <div>
      <div class="q-ml-lg row items-center">
        <div>
          <q-avatar size="100px">
            <img src="noimg.png" style="width: 70px;height:70px">
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
              <div class="shadow-3 q-ma-sm q-ml-md bg-grey-4" style="height:80px;border-radius:12px;width:150px" v-for="(event, index) in data" :key="index" @click="$router.push('mi_evento/' + event._id)">
                <div class="bg-primary row items-center justify-center text-white text-center style-titulo">
                  {{event.name}}
                </div>
                <div style="height:50px; border-bottom-right-radius:12px; border-bottom-left-radius:12px">
                  <img :src="event.img" class="img-event" style="border-bottom-right-radius:12px; border-bottom-left-radius:12px" />
                </div>
              </div>
              <div class="column shadow-3 justify-center items-center q-ma-sm q-ml-md bg-grey-5" style="height:110px;border-radius:12px;width:150px">
                <div class="text-center text-primary q-mb-sm" style="text-decoration: underline">Crear Evento</div>
                <q-btn @click="showCreateEvent = true" round size="20px" push style="width:50px" dense color="primary" icon="add" />
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
        <div class="text-center q-mt-md text-grey-7">Proveedores Favoritos</div>
        <q-scroll-area horizontal style="height: 260px; width: 100%;" class="rounded-borders q-mb-md q-mt-sm" >
          <div class="row no-wrap q-gutter-sm">
            <q-card v-for="n in 8" :key="n" style="width:170px;height:250px;border-radius:12px">
              <div class="text-center text-grey-7 text-bold"> * Nombre Proveedor * </div>
              <img src="example_1.jpg" style="height:170px">
              <div class="text-center text-primary">$2.787.700</div>
              <q-btn color="primary" dense class="full-width q-ma-sm q-mt-md" style="border-radius:6px" label="mas informacion" size="10px" />
            </q-card>
          </div>
        </q-scroll-area>
      </div>
      <q-separator inset color="grey" />
      <div class="column">
        <div class="text-center text-grey-7 q-mt-sm">Blog</div>
        <q-scroll-area horizontal style="height: 120px; width: 100%;" class="bg-grey-1 rounded-borders q-mb-md" >
          <div class="row no-wrap">
            <div class="shadow-3 q-ma-sm q-ml-md bg-grey-4" style="height:80px;border-radius:12px;width:150px" v-for="(blog, index) in blogs" :key="index">
              <div class="bg-primary row items-center justify-center text-white text-center style-titulo">
                {{blog.titulo}}
              </div>
              <div style="height:50px; border-bottom-right-radius:12px; border-bottom-left-radius:12px">
                <img :src="blog.img" class="img-event" style="border-bottom-right-radius:12px; border-bottom-left-radius:12px" />
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
import CrearEvento from '../../../components/CrearEvento'
export default {
  components: {
    CrearEvento
  },
  data () {
    return {
      data: [
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
        { title: 'Localización', id: 'localizacion', icon: 'icon_services/locacion.png' },
        { title: 'Alimentos', id: 'alimentos', icon: 'icon_services/alimentos.png' },
        { title: 'Bebidas', id: 'bebidas', icon: 'icon_services/bebidas.png' },
        { title: 'Fotógrafo', id: 'fotografo', icon: 'icon_services/fotografia.png' },
        { title: 'Vídeo', id: 'video', icon: 'icon_services/video.png' },
        { title: 'Audio', id: 'audio', icon: 'icon_services/audio.png' },
        { title: 'Música', id: 'musica', icon: 'icon_services/musica.png' },
        { title: 'Ver Mas', id: 'vermas', icon: 'icon_services/vermas.png' }
      ],
      blogs: [
        {
          titulo: 'BLOG Tal',
          img: 'example_2.jpg'
        },
        {
          titulo: 'Nombre 1 Blog Tal TAL TAL TAL',
          img: 'example_1.jpg'
        },
        {
          titulo: 'Nombre 1 Blog Tal TAL TAL TAL',
          img: 'example_4.jpg'
        }
      ],
      showCreateEvent: false,
      user: {}
    }
  },
  mounted () {
    this.getEvents()
    this.getUser()
  },
  methods: {
    getEvents () {
      this.$api.get('events_by_user').then(res => {
        if (res) {
          this.data = res.map(v => {
            return {
              _id: v._id,
              name: v.name,
              img: 'example_4.jpg'
            }
          })
          // this.data = res
        }
      })
    },
    getUser () {
      this.$api.get('users_perfil').then(res => {
        if (res) {
          this.user = res
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
  background-image: url("../../../../public/nube5.png");
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

</style>
