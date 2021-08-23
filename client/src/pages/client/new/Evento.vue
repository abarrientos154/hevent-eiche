<template>
  <div>
    <q-img :src="form.img ? baseu : 'nubeazul1.png'" style="height:280px;width:100%;position:absolute;top:0px;z-index:-1" />
    <div class="fondo-para-nube-anuncio" style="width:100%;height:280px;z-index:1;position:absolute;top:0px;">
    </div>
    <div style="height:280px;position:absolute;top:0px;z-index:2;width:100%">
      <div class="column">
        <div>
          <q-btn color="white" icon="keyboard_arrow_left" flat round class="q-ma-xs" @click="$router.go(-1)" />
        </div>
        <div class="column justify-center items-center">
          <q-file borderless v-model="portadaEvento" class="button-camera" @input="crearImgPortada()" >
            <q-icon name="camera_alt" class="absolute-center" size="20px" color="primary" />
          </q-file>
          <q-input label="Nombre del Evento" style="width: 290px; height:35px" v-model="form.name" dense class="input-border q-mt-sm q-pa-sm"
            borderless @blur="actualizarDatosEvento({ name: form.name })"
          />
          <div class="row q-mt-sm">
            <q-input v-model="form.date" style="width:130px; height:35px" mask="date" :rules="['date']" class="input-border q-pa-xs q-pl-sm q-pr-sm" dense borderless >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.date" @input="actualizarDatosEvento({ date: form.date })">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input borderless class="input-border q-ml-sm q-pa-xs q-pl-sm q-pr-sm" style="width:100px;height:35px" v-model="form.time" mask="time" :rules="['time']">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="form.time" @input="actualizarDatosEvento({ time: form.time })">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center justify-end q-mr-md" style="padding-top:280px">
      <q-icon name="alarm" size="30px" color="grey-7" />
      <div class="q-ml-sm bg-grey q-pa-xs text-white text-bold" style="border-radius:6px">Faltan {{form.diasRestantes}} Dias </div>
    </div>
    <q-separator inset class="q-mt-sm" />
    <div class="q-pa-md" v-if="!form.pay">
      <div class="cot-pen row items-center q-px-md" @click="$router.push('/aprobacion_cotizacion')">
        <div>Cotizaciones Pendientes</div>
        <q-space />
        <div>#{{cotizacionesPen}}</div>
      </div>
      <q-separator class="q-mt-md" />
    </div>

    <div class="text-bold text-grey row justify-center q-mt-md">
      Información del evento
    </div>
    <div class="column">
      <div class="row justify-center text-grey"> Tipo de Evento </div>
      <q-scroll-area horizontal style="height: 60px; width: 100%;" class="bg-grey-1 rounded-borders q-mb-md" >
        <div class="row no-wrap">
          <q-card @click="actualizarDatosEvento({ tipoEvento: { title: tag.title, id: tag.id } }), cambiarTag(index)" v-for="(tag, index) in tags" :key="index" class="q-pa-xs q-pl-sm q-pr-sm color-background-tags q-mt-md q-mr-sm q-ml-sm" :style="!tag.select ? 'background-color: rgba(143, 214, 255, 0.561);' : 'background-color: rgb(0, 153, 255); color: white'">
            <div :class="!tag.select ? 'text-grey':'text-white'"> {{tag.title}} </div>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <div class="column q-ml-md q-mr-md items-center">
      <q-input label="Organizador" style="width: 290px; height:35px" v-model="form.organizador" dense class="input-border q-mt-sm q-pa-sm" borderless />
      <q-input label="Co - organizador" style="width: 290px; height:35px" v-model="form.coOrganizador" dense class="input-border q-mt-sm q-pa-sm" borderless />
      <div class="row items-center justify-start" >
        <q-input v-model.number="form.invitados" type="number" style="width:100px" class="q-mt-sm input-border" dense borderless label-color="grey-14" outlined />
        <div class="q-ml-md text-subtitle2 text-grey"># de invitados</div>
      </div>
    </div>
    <q-separator inset class="q-mt-sm" />
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
    <q-separator inset class="q-mt-md" />
    <div class="column">
      <div class="text-grey text-bold text-center q-mt-sm">Cotización Aprobada</div>
      <div class="column q-mt-sm">
        <div class="column q-mt-md q-ma-md" v-for="(item, index) in carrito" :key="index">
         <div class="column" v-for="(subitem, index2) in item.subitems" :key="index2">
            <div class="row items-center justify-start" v-if="item.servicio_id !== 3 && item.servicio_id !== 2 || index2 === 0">
              <q-avatar style="width:40px;height:40px">
                <q-img :src="`icon_services/${item.servicio_id === 3 ? 'personas' : item.servicio_id === 2 ? 'locacion' : subitem.id }.png`" />
              </q-avatar>
              <div class="text-subtitle2 text-grey-9 q-ml-sm"> * {{item.servicio_id === 2 && index2 === 0 || item.servicio_id === 3 && index2 === 0 ? item.servicioName : subitem.name  }} *</div>
            </div>
            <div class="column" v-for="(proveedor, index3) in subitem.proveedores" :key="index3">
              <div class="text-subtitle1 text-bold text-grey-7 q-ml-md"> {{proveedor.proveedorName}} </div>
              <div>
                <div class="row justify-between q-mr-sm">
                  <div class="title-table q-pa-xs" style="width:90px">Producto</div>
                  <div class="title-table q-pa-xs q-ml-xs">Cantidad</div>
                  <div class="title-table q-pa-xs q-ml-xs" style="width:70px">Precio</div>
                  <div class="title-table q-pa-xs q-ml-xs" style="width:70px">Total</div>
                </div>
                <div class="row justify-between q-mr-sm q-mt-sm" v-for="(prod, index4) in proveedor.productos" :key="index4">
                  <div class="title-table-product q-pa-xs" style="width:90px">{{prod.prod}}</div>
                  <div class="title-table-product q-pa-xs q-ml-xs" style="width:70px">{{prod.cant}}</div>
                  <div class="title-table-product q-pa-xs q-ml-xs" style="width:70px">{{prod.prec}}</div>
                  <div class="title-table-product q-pa-xs q-ml-xs" style="width:70px">{{prod.tot}}</div>
                </div>
              </div>
            </div>
         </div>
        </div>
      </div>
      <!--<div class="column q-mt-sm">
        <div class="column q-mt-md q-ma-md" v-for="(item, index) in carrito" :key="index">
          <div class="column" v-for="(subitem, index2) in item.subitems" :key="index2">
            <div class="row items-center" v-if="item.servicio_id !== 3 && item.servicio_id !== 2 || index2 === 0">
              <q-avatar size="lg">
                <q-img :src="`icon_services/${item.servicio_id === 3 ? 'personas' : item.servicio_id === 2 ? 'locacion' : subitem.id }.png`" />
              </q-avatar>
              <div class="text-subtitle2 text-grey-9 q-ml-sm"> * {{item.servicio_id === 2 && index2 === 0 || item.servicio_id === 3 && index2 === 0 ? item.servicioName : subitem.name  }} *</div>
            </div>
            <div class="row justify-between q-mr-sm" v-if="item.servicio_id !== 3 && item.servicio_id !== 2 || index2 === 0">
              <div class="title-table q-pa-xs" style="width:90px">Producto</div>
              <div class="title-table q-pa-xs q-ml-xs">Cantidad</div>
              <div class="title-table q-pa-xs q-ml-xs" style="width:70px">Precio</div>
              <div class="title-table q-pa-xs q-ml-xs" style="width:70px">Total</div>
            </div>
            <div class="row justify-between q-mr-sm q-mt-sm" v-for="(prod, index3) in subitem.productos" :key="index3">
              <div class="title-table-product q-pa-xs" style="width:90px">{{prod.prod}}</div>
              <div class="title-table-product q-pa-xs q-ml-xs" style="width:70px">{{prod.cant}}</div>
              <div class="title-table-product q-pa-xs q-ml-xs" style="width:70px">{{prod.prec}}</div>
              <div class="title-table-product q-pa-xs q-ml-xs" style="width:70px">{{prod.tot}}</div>
            </div>
          </div>
          <q-separator class="q-mt-md" inset />
        </div>
      </div> -->
    </div>
    <!--<div class="row justify-center q-mt-md">
      <div class="colmun">
        <div class="items-table q-pa-sm">Subtotal</div>
        <div class="items-table q-pa-sm q-mt-sm">IVA-18%</div>
      </div>
      <div class="colmun q-ml-md">
        <div class="items-table q-pa-sm">Subtotal</div>
        <div class="items-table q-pa-sm q-mt-sm">IVA-18%</div>
      </div>
    </div>
    <q-separator inset class="q-mt-md" /> -->
    <div class="column text-primary q-mt-sm q-px-xl">
      <div class="row justify-between">
        <div class="text-h6">Sub-Total</div>
        <div class="text-h6">$ {{totalCarrito}}</div>
      </div>
      <div class="row justify-between">
        <div class="text-h6">IVA 19%</div>
        <div class="text-h6">$ {{((19 * totalCarrito) / 100)}}</div>
      </div>
      <div class="row justify-between items-center">
        <div class="text-bold text-h6">Total</div>
        <div class="column">
          <div class="text-bold text-h6">$ {{((19 * totalCarrito) / 100) + totalCarrito}}</div>
        </div>
      </div>
    </div>

    <div class="row justify-center q-mt-lg q-mb-lg" v-if="!form.pay">
      <q-btn label="Pagar" style="height: 45px; width:200px; border-radius:12px" color="primary" @click="$router.push('/pagar/' + id)" />
    </div>
    <div v-if="form.pay" class="text-h6 text-center q-mb-lg text-grey-8">
      Este Evento ya fue pagado
    </div>
  </div>
</template>

<script>
import env from '../../../env'
export default {
  data () {
    return {
      cotizacionesPen: 0,
      baseu: '',
      portadaImg: null,
      form: {},
      cotisaciones: [],
      carrito: [],
      id: this.$route.params.id,
      img: 'example_1.jpg',
      tags: [
        { title: 'Celebración', id: 'celebracion', select: false },
        { title: 'Boda', id: 'boda', select: false },
        { title: 'Corporativo', id: 'corporativo', select: false },
        { title: 'Reunión', id: 'reunion', select: false },
        { title: 'Convención', id: 'convencion', select: false },
        { title: 'Artístico', id: 'artistico', select: false },
        { title: 'Espititual', id: 'espiritual', select: false },
        { title: 'Deportivo', id: 'deportivo', select: false }
      ],
      servicios: [
        { title: 'Locación', id: 'localizacion', icon: 'icon_services/locacion.png' },
        { title: 'Alimentos', id: 'alimentos', icon: 'icon_services/alimentos.png' },
        { title: 'Bebidas', id: 'bebidas', icon: 'icon_services/bebidas.png' },
        { title: 'Fotógrafo', id: 'fotografo', icon: 'icon_services/fotografia.png' },
        { title: 'Vídeo', id: 'video', icon: 'icon_services/video.png' },
        { title: 'Audio', id: 'audio', icon: 'icon_services/audio.png' },
        { title: 'Música', id: 'musica', icon: 'icon_services/musica.png' },
        { title: 'Ver Mas', id: 'vermas', icon: 'icon_services/vermas.png' }
      ],
      listaFormateada: [],
      portadaEvento: null
    }
  },
  computed: {
    totalCarrito () {
      let total = 0
      if (this.carrito.length > 0) {
        for (const j of this.carrito) {
          for (const h of j.subitems) {
            for (const f of h.proveedores) {
              for (const i of f.productos) {
                total = total + i.tot
              }
            }
          }
        }
      }
      return total
    }
  },
  mounted () {
    this.baseu = env.apiUrl + 'file_event/' + this.id
    this.getRecord()
    this.getCotisations()
    this.getLengthCotPen()
  },
  methods: {
    async getLengthCotPen () {
      this.$q.loading.show()
      await this.$api.get('cotizacionesPendientesLength').then(res => {
        this.$q.loading.hide()
        this.cotizacionesPen = res
      })
    },
    cambiarTag (ind) {
      const indSelect = this.tags.findIndex(v => v.select)
      this.tags[indSelect].select = false
      this.tags[ind].select = true
    },
    async actualizarDatosEvento (data) {
      this.$q.loading.show()
      await this.$api.put(`events/${this.id}`, data).then(res => {
        this.$q.loading.hide()
        this.getRecord()
        if (res) {
          this.$q.notify({
            message: 'Guardado Correctamente',
            color: 'positive'
          })
        }
      })
    },
    async crearImgPortada () {
      if (this.portadaEvento) {
        var formData = new FormData()
        var files = []
        files[0] = this.portadaEvento
        formData.append('files', files[0])
        await this.$api.post('subir_imagen_evento/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          this.$router.go(this.$router.currentRoute)
        })
      }
    },
    async getRecord () {
      this.$q.loading.show()
      await this.$api.get(`event/${this.id}`).then(res => {
        this.$q.loading.hide()
        this.form = res
        const indextag = this.tags.findIndex(v => v.id === this.form.tipoEvento.id)
        this.tags[indextag].select = true
      })
    },
    getCotisations () {
      this.$api.get(`cotisations_by_event/${this.id}`).then(res => {
        console.log(res, 'res')
        this.cotisaciones = res
        this.carrito = res
        console.log(this.carrito, 'carritoo')
      })
    },
    irProveedor (id) {
      if (id !== 'vermas') { this.$router.push('/proveedores/' + id) } else { this.$router.push('/ver_mas_servicios') }
    }
  }
}
</script>

<style scoped lang="scss">

.cot-pen {
  width: 100%;
  height:40px;
  background-color: $primary;
  color: white;
  border-radius: 9px;
}

.fondo-para-nube-anuncio {
  background-image: url('../../../../public/nube-carousel.png');
  background-size: 100% 100%;
}
.background-tool {
  background-image: url("../../../../public/nube5.png");
  background-size: 100% 100%;
}
.title-table {
  border-radius: 12px;
  background-color: rgb(186, 239, 255);
  color: rgb(0, 106, 206);
}

.items-table {
  border-radius: 12px;
  background-color: rgb(156, 156, 156);
  color: white
}

.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: #0016b0;
  background-color: #ffffff;
  border-radius: 30px;
  border: 1px solid #7e7e7e;
  height:40px;
  width:40px
}

.title-table {
  border-radius: 12px;
  background-color: #b3e3f4;
  color: #529cb3;
  border: 1px solid grey;
}

.title-table-product {
  border-radius: 12px;
  background-color: #cccccc;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
}
</style>
