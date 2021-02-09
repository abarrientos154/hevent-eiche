<template>
  <q-card class="full-width nube-editar-datos-client q-pb-xl q-pb" style="border-radius:20px">
    <div style="position:absolute;top:0px;right:0px" class="q-mt-md">
      <q-btn icon="highlight_off" flat color="grey" size="lg" v-close-popup round />
    </div>
    <div class="text-h5 text-grey-8 q-mt-xl q-ml-lg text-bold text-grey-7" style="margin-top:120px">Editar Perfil</div>

    <div class="row q-pa-sm q-ml-md q-mr-md">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.full_name" class="input-border-new q-pa-sm" label="Nombre Compelto" borderless dense
          error-message="Requerido" :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="row">
          <q-select borderless v-model="telCode" :options="countries" option-value="name" option-label="name" emit-value map-options
            style="width:120px" @input="changePais()" class="input-border-new-per"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
                <q-item-section avatar>
                  <q-img :src="scope.opt.name !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg' " />
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.name" />
                  <q-item-label caption>{{ scope.opt.dialCode }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
              <template v-slot:selected-item="scope" class="row" >
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
                <q-item-section avatar>
                  <q-img :src="form.telCode !== 'Chile' ? 'banderas_paises/col.jpeg' : 'banderas_paises/ch.jpeg'" style="width:30px;height:20px" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.dialCode }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input v-model="form.phone" class="input-border-new q-pa-sm q-ml-sm" style="width:150px" label="Telefono" dense borderless
            error-message="ingrese un telefono valido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"
          />
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <q-input v-model="form.email" class="input-border-new q-pa-sm" label="Email" borderless dense
          error-message="Requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"
        />
      </div>
    </div>

    <q-card-actions align="center">
      <q-btn push label="guardar" class="gradiente-buttom" style="width:80%; height:40px" @click="guardar()" />
    </q-card-actions>

  </q-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      telCode: '',
      countries: [
        {
          name: 'Chile',
          dialCode: '+56',
          code: 'CL'
        },
        {
          name: 'Colombia',
          dialCode: '+57',
          code: 'CO'
        }
      ]
    }
  },
  validations () {
    return {
      form: {
        full_name: { required },
        email: { required, email },
        phone: { required }
      }
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    changePais () {
      this.form.telCode = this.telCode
    },
    getInfo () {
      this.$api.get('users_perfil').then(res => {
        this.form = res
        this.telCode = this.form.telCode
      })
    },
    async guardar () {
      console.log(this.form, 'form')
      this.$v.$touch()
      if (!this.$v.form.$error) {
        await this.$api.post('editar_perfil_cliente', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Guardado Correctamente',
              color: 'positive'
            })
          }
        })
        // this.getInfo()
      }
    }
  }
}
</script>

<style>
.nube-editar-datos-client {
  background: url('../../../../public/nube9.png');
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
.input-border-new-per {
  background: #e1f5ff;
  border: 0px solid #bbbbbb;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  margin-bottom: 20px;
  padding-left: 0px;
}
</style>
