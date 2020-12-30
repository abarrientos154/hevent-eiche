<template>
  <q-card>
    <q-card-section>
      <div class="row justify-end">
        <q-btn icon="highlight_off" v-close-popup flat dense color="grey" />
      </div>
      <div class="text-primary text-center text-h6">* Cotización *</div>
      <div class="text-caption text-grey">Elige el servicio que deseas</div>
      <div class="row q-gutter-sm justify-center">
        <q-card v-for="(tag, index) in tags" :key="index" class="q-pa-xs q-pl-sm q-pr-sm color-background-tags round-tag q-mt-md" :style="!tag.select ? 'background-color: rgba(143, 214, 255, 0.561);' : 'background-color: rgb(0, 153, 255); color: white'" @click="seleccionarServicio(index)">
          <div :class="!tag.select ? 'text-grey':'text-white'"> {{tag.name}} </div>
        </q-card>
      </div>
      <div class="text-caption text-grey q-mt-lg">Escribe el producto, la cantidad, el precio y agregalo</div>
        <!-- <div class="row justify-between q-ml-sm q-mr-sm">
        <div class="title-table q-pa-xs" style="width:90px">Producto</div>
        <div class="title-table q-pa-xs q-ml-xs">Cantidad</div>
        <div class="title-table q-pa-xs q-ml-xs" style="width:70px">Precio</div>
        <div class="title-table q-pa-xs q-ml-xs" style="width:70px">Total</div>
      </div> !-->
      <div class="row q-gutter-xs q-mt-sm justify-between">
        <q-input v-model="add.prod" placeholder="Producto" style="width:90px" dense outlined error-message="Requerido" :error="$v.add.prod.$error" @blur="$v.add.prod.$touch()"/>
        <q-input v-model.number="add.cant" placeholder="Cantidad" style="width:50px" dense outlined error-message="Requerido" :error="$v.add.cant.$error" @blur="$v.add.cant.$touch()" />
        <q-input v-model.number="add.prec" placeholder="Precio" style="width:70px" dense outlined error-message="Requerido" :error="$v.add.prec.$error" @blur="$v.add.prec.$touch()" />
        <q-input v-model.number="add.tot" placeholder="Total" style="width:70px" dense outlined error-message="Requerido" :error="$v.add.tot.$error" @blur="$v.add.tot.$touch()" />
      </div>
      <div class="row justify-end q-mt-md">
        <q-btn label="agregar" dense style="padding:1px; border-radius:12px;width:150px" color="primary" push glossy @click="addCarrito(add)"/>
      </div>
      <q-separator inset class="q-mt-md" />
      <div class="column q-mt-sm">
        <div class="column q-mt-md" v-for="(item, index) in carrito" :key="index">
          <!-- <div class="text-center text-h6">{{item.servicioName}}</div> -->
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
      <div class="row justify-around q-mt-md">
        <div class="text-h6 text-primary">Total</div>
        <div class="column text-primary">
          <div class="text-h6">$ {{totalCarrito}}</div>
          <div style="font-size:10px">iva incluido</div>
        </div>
      </div>
      <div class="row justify-center q-mt-md">
        <q-btn label="enviar" color="primary" push glossy style="width:150px;height:45px" @click="enviarCotizacion()" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      tags: [],
      add: {},
      carrito: [
      ],
      id_servicio: null
    }
  },
  validations () {
    return {
      add: {
        prod: { required },
        cant: { required },
        prec: { required },
        tot: { required }
      }
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
    this.getServiciosByProveedor()
  },
  methods: {
    getServiciosByProveedor () {
      this.$api.get('servicios_proveedor').then(res => {
        this.tags = res
        this.tags[0].select = true
        this.id_servicio = this.tags[0].servicio_id
      })
    },
    seleccionarServicio (index) {
      const tag = this.tags.find(v => v.select)
      tag.select = false
      this.tags[index].select = true
      this.id_servicio = this.tags[index].servicio_id
      console.log(this.id_servicio, 'id_servicios')
    },
    addCarrito (miObjeto) {
      this.$v.$touch()
      if (!this.$v.$error) {
        const servicio = this.retornarServicio()
        console.log(servicio, 'servicio')
        var findSer = this.carrito.findIndex(v => v.servicio_id === this.id_servicio)
        if (findSer >= 0) {
          var indexItem = this.carrito[findSer].subitems.findIndex(v => v.id === servicio.id)
          if (indexItem >= 0) {
            this.carrito[findSer].subitems[indexItem].productos.push(miObjeto)
            console.log('1')
          } else {
            this.carrito[findSer].subitems.push({
              id: servicio.id,
              name: servicio.name,
              productos: [miObjeto]
            })
            console.log('2')
          }
        } else {
          console.log('3')
          this.carrito.push({
            servicio_id: this.id_servicio,
            servicioName: servicio.servicioName,
            subitems: [
              {
                id: servicio.id,
                name: servicio.name,
                productos: [miObjeto]
              }
            ]
          })
        }
        // this.carrito = carrito
        this.add = {}
        this.$v.$reset()
        console.log(this.carrito, 'cattir')
      }
    },
    retornarServicio () {
      return this.tags.find(v => v.servicio_id === this.id_servicio && v.select === true)
    },
    enviarCotizacion () {
      if (this.carrito.length > 0) {
        this.$api.post(`enviar_cotizacion/${this.$route.params.id}`, { carrito: this.carrito }).then(res => {
          if (res) {
            this.$router.go(-1)
            this.$q.notify({
              message: 'Cotizacion Enviada con Exito',
              color: 'positive'
            })
          }
        })
      } else {
        this.$q.notify({
          message: 'Ingrese Productos antes de enviar una cotizacion',
          color: 'warning'
        })
      }
    }
  }
}
</script>

<style>
.round-tag {
  border-radius: 12px;
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
