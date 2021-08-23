<template>
  <q-card class="test" style="height:600px">
    <q-card-section>
      <div class="row justify-end">
        <q-btn icon="highlight_off" v-close-popup flat dense color="grey" />
      </div>
      <div class="text-primary text-center text-h6 q-mt-xl">* Cotización *</div>
      <q-separator inset class="q-mt-md" />
      <div class="column q-mt-sm">
        <div class="column q-mt-md" v-for="(item, index) in carrito" :key="index">
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
          <div style="font-size:10px">sin iva</div>
        </div>
      </div>
      <div class="row justify-between q-mt-md">
        <q-btn label="negar" color="negative" push dense glossy style="width:40%;height:35px" @click="ejecutar('negar')" v-if="status === 1 && esCliente" />
        <q-btn label="aprobar" color="positive" push dense glossy style="width:40%;height:35px" @click="ejecutar('aprobar')" v-if="status === 1 && esCliente" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['cotisacion_id', 'esCliente'],
  data () {
    return {
      carrito: [
      ],
      status: 0
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
    this.getItems()
  },
  methods: {
    async getItems () {
      await this.$api.get('get_cotisacion_by_id/' + this.cotisacion_id).then(res => {
        this.carrito = res.carrito
        this.status = res.status
      })
    },
    ejecutar (nameFuncion) {
      this.$emit(nameFuncion)
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

.test {
  background: url('../../../public/nube9.png');
  width: 400px;
  height: 400px;
  background-size: 100% 100%;
}
</style>
