<template>
  <q-page class="q-pb-lg">
    <div class="q-mx-md q-mt-md q-m text-right row justify-end q-gutter-x-xs text-grey-7">
      <label class="text-subtitle1">Queremos</label>
      <label class="text-bold text-subtitle1">Escucharte</label>
    </div>
    <div class="row justify-end q-gutter-x-sm q-mx-md">
      <div style="width:8px;height:8px;border-radius:100%" v-for="n in 3" :key="n" class="bg-grey"></div>
    </div>
    <div class="column q-ml-lg q-mt-md">
      <div class="text-bold text-primary text-h6">BLOG</div>
      <div class="text-primary">LO MAS ACTUAL</div>
    </div>
    <div class="row items-center q-gutter-x-sm q-ml-sm q-mt-md">
      <div class="rotar col-1">IDEAS</div>
      <q-scroll-area horizontal style="height: 120px;width:80%" class="bg-white rounded-borders q-mb-md" >
        <div class="row no-wrap">
          <div v-for="(blog, index) in data.ideas" :key="index" class="shadow-3 q-ma-sm q-ml-md bg-white" style="height:80px;border-radius:12px;width:150px"
            @click="$router.push('blog/' + blog._id)"
          >
            <div class="bg-primary row items-center justify-center text-white text-center style-titulo">
              {{blog.titulo}}
            </div>
            <div style="height:50px; border-bottom-right-radius:12px; border-bottom-left-radius:12px">
              <img :src="baseu + blog._id + '/' + blog.img" class="img-event" style="border-bottom-right-radius:12px; border-bottom-left-radius:12px" />
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>

    <div class="row items-center q-gutter-x-sm q-ml-sm q-mt-md">
      <div class="rotar col-1 q-mt-md">CONSEJOS</div>
      <q-scroll-area horizontal style="height: 120px;width:80%" class="bg-white rounded-borders q-mb-md" >
        <div class="row no-wrap">
          <div v-for="(blog, index) in data.consejos" :key="index" class="shadow-3 q-ma-sm q-ml-md bg-white" style="height:80px;border-radius:12px;width:150px"
            @click="$router.push('blog/' + blog._id)"
          >
            <div class="bg-primary row items-center justify-center text-white text-center style-titulo">
              {{blog.titulo}}
            </div>
            <div style="height:50px; border-bottom-right-radius:12px; border-bottom-left-radius:12px">
              <img :src="baseu + blog._id + '/' + blog.img" class="img-event" style="border-bottom-right-radius:12px; border-bottom-left-radius:12px" />
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>

    <div class="row items-center q-gutter-x-sm q-ml-sm q-mt-md">
      <div class="rotar col-1 q-mt-md">ARTICULOS</div>
      <q-scroll-area horizontal style="height: 120px;width:80%" class="bg-white rounded-borders q-mb-md" >
        <div class="row no-wrap">
          <div v-for="(blog, index) in data.articulos" :key="index" class="shadow-3 q-ma-sm q-ml-md bg-white" style="height:80px;border-radius:12px;width:150px"
            @click="$router.push('blog/' + blog._id)"
          >
            <div class="bg-primary row items-center justify-center text-white text-center style-titulo">
              {{blog.titulo}}
            </div>
            <div style="height:50px; border-bottom-right-radius:12px; border-bottom-left-radius:12px">
              <img :src="baseu + blog._id + '/' + blog.img" class="img-event" style="border-bottom-right-radius:12px; border-bottom-left-radius:12px" />
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>

    <!-- <div class="row justify-around q-gutter-x-sm q-ma-sm">
      <div class="shadow-3 row items-center justify-center" :class="n.titulo === selectCat ? 'circulo-azul': 'circulo-gris'" v-for="(n, index) in categorias" :key="index"
        @click="selectCat = n.titulo"
      >
        {{n.titulo}}
      </div>
    </div> -->
  </q-page>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      selectCat: 'Celebra',
      data: [],
      categorias: [
        {
          titulo: 'Celebra'
        },
        {
          titulo: 'Bodas'
        },
        {
          titulo: 'Seminario'
        }
      ]
    }
  },
  mounted () {
    this.getBlogs()
    this.baseu = env.apiUrl + 'blogs_img/'
  },
  methods: {
    async getBlogs () {
      this.$q.loading.show()
      await this.$api.get('blogs').then(res => {
        this.data = res
        this.$q.loading.hide()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.img-event {
  width:100%;
  height:100%;
}
.style-titulo {
  height: 60px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.rotar {
  transform: rotate(270deg)
}

.circulo-gris {
  width: 80px;
  height:  80px;
  border-radius: 100%;
  background: $grey-4;
}

.circulo-azul {
  width: 80px;
  height:  80px;
  border-radius: 100%;
  background: $primary;
  color: white;
}
</style>
