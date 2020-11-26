<template>
  <q-page>
    <div class="col full-width">
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
      <div class="text-grey text-h6 text-center">{{usuario}}</div>
      <div class="text-grey text-subtitle2 text-center">{{ciudad}}</div>
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
                <q-input borderless class="text-subtitle1" v-model="form.description" :placeholder="form.description ? form.description : 'Descripción en 250 carácteres'" />
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
              <q-input class="text-subtitle1" v-model="form.menu_costo" label="¿Cuál es el costo del Menú?" />
              <q-input class="text-subtitle1" v-model="form.invitados" label="¿Número de Invitados?" />
              <q-input class="text-subtitle1" v-model="form.espacios_disp" label="¿Espacios Disponibles?" />
              <q-input class="text-subtitle1" v-model="form.alojamiento" label="¿Dispone alojamiento para invitados?" />
              <q-input class="text-subtitle1" v-model="form.more_event" label="¿Celebra más de un evento al día?" />
              <q-input class="text-subtitle1" v-model="form.menu_conten" label="¿Qué incluye el menú?" />
              <q-input class="text-subtitle1" v-model="form.solo_lugar" label="¿Es posible alquilar solo el espacio, sin el servicio de comida?" />
              <q-input class="text-subtitle1" v-model="form.banquete_o_cocina" label="¿Cuentas con Banquete o cocina propia?" />
              <q-input class="text-subtitle1" v-model="form.banquete_cocina" label="¿Dispone de banquete / cocina propia?" />
              <q-input class="text-subtitle1" v-model="form.tipo_cocina" label="¿Que tipo de cocina prepara?" />
              <q-input class="text-subtitle1" v-model="form.adaptar_menu" label="¿Es posible adaptar o modificar los menús?" />
              <q-input class="text-subtitle1" v-model="form.menu_especial" label="¿Dispone de menús especiales?" />
              <q-input class="text-subtitle1" v-model="form.ponque_matrimonio" label="¿Sirve tambien el ponqué de matrimonio?" />
              <q-input class="text-subtitle1" v-model="form.ponque_propio" label="¿Puedo llevar mi propio ponqué de matrimonio?" />
              <q-input class="text-subtitle1" v-model="form.recargo" label="¿Tiene algún recargo?" />
              <q-input class="text-subtitle1" v-model="form.bebida_servicio" label="¿Cómo funciona el servicio de bebidas?" />
              <q-input class="text-subtitle1" v-model="form.time_limit" label="¿Tiene límite de hora en los eventos?" />
              <q-input class="text-subtitle1" v-model="form.fotografo_exclusivo" label="¿Tiene exclisividad con algún fotógrafo?" />
              <q-input class="text-subtitle1" v-model="form.musica_exclusivo" label="¿Tiene exclisividad con algún grupo musical?" />
              <q-input class="text-subtitle1" v-model="form.banquete_exclusivo" label="¿Tiene exclisividad con algún banquete?" />
              <q-input class="text-subtitle1" v-model="form.pago_lugar" label="¿Existe algún pago fijo por solo el alquiler del lugar?" />
              <q-input class="text-subtitle1" v-model="form.recargo_no_minimo" label="¿Cuál es el recargo en caso de no llegar al mínimo?" />
              <q-input class="text-subtitle1" v-model="form.pago_transaccion" label="¿Cómo se efectua el pago?" />
              <q-input class="text-subtitle1" v-model="form.discapacitados" label="¿Dispone de acceso para discapacitados?" />
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
                no-caps
                @click="server.enable = !server.enable, serviciosEnables(server.id, server.enable)">
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
      <q-btn class="text-subtitle1" style="width: 100%" glossy color="primary" label="Guardar" @click="guardar()" />
    </div>
    <div class="q-px-md q-pb-sm">
      <q-btn class="text-subtitle1" style="width: 100%" outline no-caps color="primary" icon="expand_less" label="Subir" />
    </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      pointTotal: 4,
      date: '2019/02/01',
      usuario: 'Nombre Proveedor',
      ciudad: 'Ciudad',
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
      form: {},
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
    this.getRecord()
  },
  methods: {
    async guardar () {
      this.form.servicios = this.servicios
      this.$q.loading.show()
      await this.$api.post('proveedores', this.form).then(res => {
        if (res) {
          this.$q.notify({
            message: 'Guardado Con Exito',
            color: 'positive'
          })
        }
      })
      this.$q.loading.hide()
      this.$router.push('/inicio_proveedor')
    },
    serviciosEnables (serv, bool) {
      if (bool) {
        this.servicios.push(serv)
      } else {
        this.servicios = this.servicios.filter((v) => v !== serv)
      }
    },
    async getRecord () {
      await this.$api.get('proveedores_perfil').then(res => {
        if (res) {
          this.form = res.form
          console.log('form ', this.form)
          if (this.form.user_data) {
            this.usuario = this.form.user_data.full_name
            this.ciudad = this.form.user_data.city
          }
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
