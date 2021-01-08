<template>
  <div>
    <div class="background-tool" style="height:250px">
      <div class="column">
        <div>
          <q-btn color="white" icon="menu" flat round class="q-ma-xs" />
        </div>
        <div class="column justify-center items-center">
          <q-file borderless v-model="portadaEvento" class="button-camera" @input="crearImgPortada()" >
            <q-icon name="camera_alt" class="absolute-center" size="20px" color="black" />
          </q-file>
          <q-input label="Nombre del Evento" style="width: 290px; height:35px" v-model="form.name" dense class="input-border q-mt-sm q-pa-sm" borderless />
          <div class="row q-mt-sm">
            <q-input v-model="form.date" style="width:130px; height:35px" mask="date" :rules="['date']" class="input-border q-pa-xs q-pl-sm q-pr-sm" dense borderless >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.date">
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
                    <q-time v-model="form.time">
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
    <div class="row items-center justify-end q-mr-md">
      <q-icon name="alarm" size="30px" color="grey-7" />
      <div class="q-ml-sm bg-grey q-pa-xs text-white text-bold" style="border-radius:6px">Faltan {{form.diasRestantes}} Dias </div>
    </div>
    <q-separator inset class="q-mt-sm" />
    <div class="text-bold text-grey row justify-center q-mt-md">
      Información del evento
    </div>
    <div class="column">
      <div class="row justify-center text-grey"> Tipo de Evento </div>
      <q-scroll-area horizontal style="height: 60px; width: 100%;" class="bg-grey-1 rounded-borders q-mb-md" >
        <div class="row no-wrap">
          <q-card v-for="(tag, index) in tags" :key="index" class="q-pa-xs q-pl-sm q-pr-sm color-background-tags q-mt-md q-mr-sm q-ml-sm" :style="!tag.select ? 'background-color: rgba(143, 214, 255, 0.561);' : 'background-color: rgb(0, 153, 255); color: white'">
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
      </div>
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
    <div class="row justify-around text-primary q-mt-sm items-center q-mb-md">
      <div class="text-bold text-h6">Total</div>
      <div class="column">
        <div class="text-bold text-h6">$ {{totalCarrito}}</div>
        <div class="q-pt-none q-mt-none">iva incluido</div>
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
export default {
  data () {
    return {
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
        { title: 'Espititual', id: 'espiritual', select: false }
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
            for (const i of h.productos) {
              total = total + i.tot
            }
          }
        }
      }
      return total
    }
  },
  mounted () {
    this.getRecord()
    this.getCotisations()
  },
  methods: {
    crearImgPortada () {

    },
    getRecord () {
      this.$api.get(`event/${this.id}`).then(res => {
        this.form = res
        const indextag = this.tags.findIndex(v => v.id === this.form.tipoEvento.id)
        this.tags[indextag].select = true
      })
    },
    getCotisations () {
      this.$api.get(`cotisations_by_event/${this.id}`).then(res => {
        this.cotisaciones = res
        this.carrito = res.carrito
        console.log(this.carrito, 'carritoo')
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
