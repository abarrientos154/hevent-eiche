<template>
  <q-page>
    <div class="col full-width">
      <div header class="row">
        <div class="col-3 q-pl-md">
            <q-btn flat class="text-grey" round style="width: 50px" icon="keyboard_arrow_left" @click="$router.go(-1)"/>
        </div>
        <div class="col-5 q-pt-xs text-h6 text-primary text-bold text-center">{{header}}</div>
        <q-btn flat round class="col-2" color="red" icon="favorite_border" />
        <q-btn flat round class="col-2" color="yellow" icon="star_border" />
      </div>
      <q-separator/>
      <q-carousel
      animated
      v-model="slide"
      arrows
      infinite
      style="width: 100%, height: 80px"
    >
        <q-carousel-slide
        v-for="(sl, index) in carrousel"
        :key="index"
        :name="sl.id"
        :img-src="sl.img"
        style="width: 100%">
                <q-btn outline no-caps class="text-white text-subtitle2 absolute-center" color="dark">
                    Cambiar Fotos <br> max de 20
                </q-btn>
        </q-carousel-slide>
      </q-carousel>
      <div class="text-grey text-h6 text-center">{{form.name}}</div>
      <div class="text-grey text-subtitle2 text-center">{{form.ciudad}}</div>
      <div class="row" style="width: 100%">
      <q-btn outline no-caps label="Descripción" class="col text-caption" />
      <q-btn outline no-caps label="Detalles" class="col text-caption" />
      <q-btn outline no-caps label="Servicios" class="col text-caption" />
      <q-btn outline no-caps label="Mapa" class="col text-caption" />
      <q-btn outline no-caps label="Puntuación" class="col text-caption" />
      <q-btn outline no-caps label="Opiniones" class="col text-caption" />
    </div>
    <div class="q-pa-md q-gutter-md">
        <q-card class="my-card shadow-13" style="height: 300px">
            <q-card-section class="text-primary text-h6">
                Descripción
            </q-card-section>
            <q-card-section class="absolute-center" style="width: 100%">
                <q-field borderless class="text-subtitle1" >
                  <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.descripcion ? form.descripcion : 'No ha introducido una descripción'}}</div>
                </q-field>
            </q-card-section>
            <q-card-section class="absolute-bottom text-primary text-subtitle1 text-right">
                Leer más
            </q-card-section>
        </q-card>

        <q-card class="my-card shadow-13">
            <q-card-section class="text-primary text-h6">
                Detalles
            </q-card-section>
            <q-card-section class="q-pt-xs">
              <q-field stack-label class="text-subtitle1" label="¿Cuál es el costo del Menú?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.menu_costo}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Número de Invitados?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.invitados}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Espacios Disponibles?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.espacios_disp}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Dispone alojamiento para invitados?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.alojamiento}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Celebra más de un evento al día?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.more_event}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Qué incluye el menú?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.menu_conten}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Es posible alquilar solo el espacio, sin el servicio de comida?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.solo_lugar}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Cuentas con Banquete o cocina propia?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.banquete_o_cocina}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Dispone de banquete / cocina propia?" >
              <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.banquete_cocina}}</div></q-field>
              <q-field stack-label class="text-subtitle1" label="¿Que tipo de cocina prepara?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.tipo_cocina}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Es posible adaptar o modificar los menús?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.adaptar_menu}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Dispone de menús especiales?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.menu_especial}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Sirve tambien el ponqué de matrimonio?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.ponque_matrimonio}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Puedo llevar mi propio ponqué de matrimonio?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.ponque_propio}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Tiene algún recargo?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.recargo}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Cómo funciona el servicio de bebidas?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.bebida_servicio}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Tiene límite de hora en los eventos?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.time_limit}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1"  label="¿Tiene exclisividad con algún fotógrafo?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.fotografo_exclusivo}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Tiene exclisividad con algún grupo musical?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.musica_exclusivo}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Tiene exclisividad con algún banquete?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.banquete_exclusivo}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Existe algún pago fijo por solo el alquiler del lugar?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.pago_lugar}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Cuál es el recargo en caso de no llegar al mínimo?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.recargo_no_minimo}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Cómo se efectua el pago?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.pago_transaccion}}</div>
              </q-field>
              <q-field stack-label class="text-subtitle1" label="¿Dispone de acceso para discapacitados?" >
                <div class="self-center text-dark full-width no-outline" tabindex="0">{{form.discapacitados}}</div>
              </q-field>
            </q-card-section>
            <q-card-section class="text-primary text-subtitle1 text-right">
                Leer más
            </q-card-section>
        </q-card>

        <q-card class="my-card shadow-13" style="height: 420px">
            <q-card-section class="text-primary text-h6">
                Servicios
            </q-card-section>
            <q-card-section class="row q-gutter-xs q-px-xs q-pt-xl absolute-center justify-around" style="width: 100%">
                <q-btn
                class="col-3"
                v-for="(server, index) in showServicios"
                :key="index"
                stack
                flat
                no-caps>
                    <q-icon v-if="server.enable" center class="text-primary" :name="server.icon" style="font-size: 3em;" />
                    <div v-if="server.enable" class="text-center text-caption text-primary">{{ server.title }}</div>
                    <q-icon v-if="!server.enable" center class="text-grey" :name="server.icon" style="font-size: 3em;" />
                    <div v-if="!server.enable" class="text-center text-strike text-caption text-grey">{{ server.title }}</div>
                </q-btn>
            </q-card-section>
        </q-card>

        <q-card class="my-card shadow-13" style="height: 400px">
            <q-card-section class="row">
                <div class="col-3 text-primary text-h6" style="height: 30px" >Mapa</div>
                <q-input borderless  class="col-9 text-subtitle2" style="height: 30px"  v-model="perfil.direction" placeholder="Escribir Dirección" />
            </q-card-section>
            <q-card-section>
                <q-date
                style="width: 100%"
                v-model="date "
                minimal
                />
            </q-card-section>
        </q-card>

        <q-card class="my-card shadow-13" style="height: 310px">
            <q-card-section>
                <div class="text-primary text-h6" >Puntuación</div>
            </q-card-section>
            <q-card-section class="row q-py-xs">
                <q-rating
                    name="quality"
                    v-model="pointTotal"
                    max="5"
                    size="3.5em"
                    color="yellow"
                    icon="star_border"
                    icon-selected="star"
                    no-dimming
                />
                <div class="q-pl-lg text-h3 text-grey">{{ pointTotal }}</div>
            </q-card-section>
            <q-card-section>
              <div
                class="row justify-between"
                v-for="(point, index) in perfil.rating"
                :key="index">
                <div class="text-subtitle1 text-grey">{{ point.name }}</div>
                <q-rating
                    name="quality"
                    v-model="point.point"
                    max="5"
                    size="2em"
                    color="primary"
                    icon="star_border"
                    icon-selected="star"
                    no-dimming
                />
                </div>
            </q-card-section>
        </q-card>

        <q-card class="my-card shadow-13">
            <q-card-section class="text-primary text-h6">
                Opiniones
            </q-card-section>
            <q-card-section class="q-py-xs">
              <div
                v-for="(opinion, index) in perfil.opiniones"
                :key="index">
                  <div class="row">
                    <div class="col-3">
                        <q-icon class="text-dark" name="account_circle" style="font-size: 5em;" />
                    </div>
                    <div class="text-grey-8 col">
                      <div class="q-pb-xs text-subtitle1">{{ opinion.name }}</div>
                      <div class="text-caption">Realiza el evento el {{ opinion.eventDate }}</div>
                    </div>
                  </div>
                  <div class="text-subtitle1">{{ opinion.coment }}</div>
                  <div class="text-primary text-subtitle1 text-right">Leer más</div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-xs text-primary text-subtitle1 text-left">
                Más Comentarios
            </q-card-section>
        </q-card>
    </div>

    <div class="q-px-md q-pb-sm">
      <q-btn class="text-subtitle1" style="width: 100%" outline no-caps color="primary" icon="expand_less" label="Subir" />
    </div>
    <q-dialog v-model="showEvents">
      <modal-eventos @goChat="goChat" />
    </q-dialog>
    <q-footer elevated class="bg-transparent">
      <q-btn no-caps class="text-subtitle1" color="primary" label="Pide presupuesto gratis" style="width: 100%" @click="showEvents = true" />
      </q-footer>
    </div>
  </q-page>
</template>
<script>
import ModalEventos from '../../components/ModalEventos'
export default {
  components: {
    ModalEventos
  },
  data () {
    return {
      showEvents: false,
      slide: 1,
      header: '',
      id: '',
      pointTotal: 4,
      date: '2019/02/01',
      perfil: {
        direction: '',
        rating: [
          { name: 'Calidad del Servicio', point: 4 },
          { name: 'Relación Costo / Beneficio', point: 4 },
          { name: 'Profesionalidad', point: 4 },
          { name: 'Respuesta', point: 3 },
          { name: 'Flexibilidad', point: 3 }
        ],
        opiniones: [
          { name: 'Nombre de Usuario', eventDate: '08/10/2020', coment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
          { name: 'Nombre de Usuario', eventDate: '08/10/2020', coment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
        ]
      },
      servicios: [],
      form: {
        user_data: {
          full_name: 'Nombre del proveedor'
        }
      },
      showServicios: [
        { title: 'Localización', id: 'localizacion', icon: 'home', enable: false },
        { title: 'Alimentos', id: 'alimentos', icon: 'fastfood', enable: false },
        { title: 'Bebidas', id: 'bebidas', icon: 'local_bar', enable: false },
        { title: 'Fotógrafo', id: 'fotografo', icon: 'camera_alt', enable: false },
        { title: 'Vídeo', id: 'video', icon: 'videocam', enable: false },
        { title: 'Audio', id: 'audio', icon: 'mic', enable: false },
        { title: 'Música', id: 'musica', icon: 'audiotrack', enable: false },
        { title: 'Iluminación', id: 'iluminacion', icon: 'emoji_objects', enable: false },
        { title: 'Invitaciones', id: 'invitaciones', icon: 'drafts', enable: false },
        { title: 'Recordatorios', id: 'recordatorios', icon: 'card_giftcard', enable: false },
        { title: 'Decoración', id: 'decoracion', icon: 'local_florist', enable: false },
        { title: 'Mobiliario', id: 'mobiliario', icon: 'deck', enable: false },
        { title: 'Parqueadero', id: 'parqueadero', icon: 'drive_eta', enable: false },
        { title: 'Personal', id: 'personal', icon: 'person', enable: false },
        { title: 'Wifi', id: 'wifi', icon: 'wifi', enable: false }
      ],
      carrousel: [
        { id: 1, img: 'example_1.jpg' },
        { id: 2, img: 'example_2.jpg' },
        { id: 3, img: 'example_3.jpg' },
        { id: 4, img: 'example_4.jpg' },
        { id: 5, img: 'example_5.jpg' }
      ]
    }
  },
  validations: {
  },
  computed: {

  },
  mounted () {
    if (this.$route.params.header) {
      this.header = this.$route.params.header
    }
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getRecord()
    }
  },
  methods: {
    goChat (event) {
      console.log(event, 'eventttttt')
      this.$api.get('create_cotization/' + this.id + '/' + event._id).then(v => {
        if (v) {
          this.$router.push('/chat/' + v._id)
        }
      })
    },
    async getRecord () {
      await this.$api.get('show_provider_for_user/' + this.id).then(res => {
        if (res) {
          this.form = res
          console.log(this.form)
          if (this.form.servicios) {
            this.servicios = this.form.servicios
            this.showServicios.map(v => {
              if (this.servicios.find(vv => vv === v.id)) {
                v.enable = true
              }
            })
          }
        }
      })
    }
  }
}
</script>
