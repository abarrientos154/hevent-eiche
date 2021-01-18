<template>
  <div class="column q-ma-sm fondo-calendario-3">
    <div class="row items-center">
      <q-btn color="primary" flat round size="md" @click="$router.go(-1)" icon="keyboard_arrow_left" />
      <div class="text-primary text-bold text-h6">Calendario</div>
    </div>
    <div class="row q-gutter-xs q-mt-md items-center">
      <q-btn icon="navigate_before" @click="$refs.calendar.prev(), abrirDialogo(true)" color="primary" flat round/>
      <div class="text-center text-capitalize text-subtitle1" style="min-width: 100px;"> {{mesActual}} </div>
      <q-btn icon="navigate_next" @click="$refs.calendar.next(), abrirDialogo(true)" color="primary" flat round/>
    </div>
    <div style="max-width: 1000px; width: 100%" class="q-mt-md">
      <q-splitter
        v-model="splitterModel"
        :limits="[30, 100]"
        emit-immediately
      >
        <template v-slot:before>
          <q-calendar
            ref="calendar"
            v-model="selectedDate"
            @input="onModelChanged"
            @click:date2="onClickDate2"
            view="month"
            locale="es-es"
            :mini-mode="miniMode"
            :short-weekday-label="shortWeekdayLabel"
          >
            <template #day="{ timestamp, miniMode }">
              <template v-for="(event, index) in getEvents(timestamp.date)">
                <template v-if="miniMode">
                  <q-badge
                    :key="index"
                    style="width: 5px!important; max-width: 5px; height: 5px; max-height: 5px"
                    :class="badgeClasses(event, 'day')"
                    :style="badgeStyles(event, 'day')"
                  ></q-badge>
                </template>
                <template v-else>
                  <q-badge
                    :key="index"
                    style="width: 100%; cursor: pointer; height: 16px; max-height: 16px"
                    class="q-mb-xs"
                    :class="badgeClasses(event, 'day')"
                    :style="badgeStyles(event, 'day')"
                  >
                    <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon><span class="ellipsis">{{ event.title }}</span>
                  </q-badge>
                </template>
              </template>
            </template>
          </q-calendar>
        </template>
        <template v-slot:after>
          <div style="min-width: 20px"></div>
        </template>
      </q-splitter>
    </div>
    <div class="q-pa-md bg-transparent">
      <q-scroll-area horizontal style="height: 300px; width: 100%;" class="bg-transparent" :thumb-style="thumbStyle"
        :content-style="contentStyle">
        <div class="row no-wrap bg-transparent">
          <q-card style="width:300px; height:280px" class="no-shadow bg-transparent" v-for="(item, index) in filtrarMes" :key="index">
            <q-card-section>
              <div class="column">
                <div class="row justify-between">
                  <div class="text-bold">Nombre del Evento:</div>
                  <div v-if="item.evento">{{item.evento.name}}</div>
                </div>
                <div class="row justify-between">
                  <div class="text-bold">Direccion:</div>
                  <div v-if="item.evento">{{item.evento.direccion}}</div>
                </div>
                <div class="q-mt-sm row">
                  <q-img src="example_5.jpg" style="border-radius:12px" />
                  <div class="q-mt-sm text-bold" v-if="item.datos_cliente">{{item.datos_cliente.full_name}}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </div>
    <q-dialog v-model="dialogo" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="nube-dialog q-mt-xl q-pb-xl" style="margin-top:100px">
        <q-card-section>
          <div class="row justify-end">
            <q-btn color="grey" round dense icon="highlight_off" flat outline v-close-popup />
          </div>
          <div class="text-bold text-h6 text-grey-8 q-mt-xl q-ml-md">Eventos</div>
          <div class="column q-mb-xl">
            <q-card style="width:300px; height:280px; border-radius:12px" class="q-pa-lg q-ma-xs" v-for="(item, index) in filtradoEvents" :key="index">
              <q-card-section>
                <div class="column">
                  <div class="row justify-between">
                    <div class="text-bold">Nombre del Evento:</div>
                    <div v-if="item.evento">{{item.evento.name}}</div>
                  </div>
                  <div class="row justify-between">
                    <div class="text-bold">Direccion:</div>
                    <div v-if="item.evento">{{item.evento.direccion}}</div>
                  </div>
                  <div class="q-mt-sm row">
                    <q-img src="example_5.jpg" style="border-radius:12px" />
                    <div class="q-mt-sm text-bold" v-if="item.datos_cliente">{{item.datos_cliente.full_name}}</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// normally you would not import "all" of QCalendar, but is needed for this example to work with UMD (codepen)
import QCalendar from '@quasar/quasar-ui-qcalendar' // ui is aliased from '@quasar/quasar-ui-qcalendar'
import moment from 'moment'

const CURRENT_DAY = new Date()

function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = QCalendar.parseDate(newDay)
  return tm.date
}

const reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/

function textToRgb (color) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string')
  }

  const m = reRGBA.exec(color)
  if (m) {
    const rgb = {
      r: Math.min(255, parseInt(m[2], 10)),
      g: Math.min(255, parseInt(m[3], 10)),
      b: Math.min(255, parseInt(m[4], 10))
    }
    if (m[1]) {
      rgb.a = Math.min(1, parseFloat(m[5]))
    }
    return rgb
  }
  return hexToRgb(color)
}

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  } else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  const num = parseInt(hex, 16)

  return hex.length > 6
    ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) }
    : { r: num >> 16, g: num >> 8 & 255, b: num & 255 }
}

function luminosity (color) {
  if (typeof color !== 'string' && (!color || color.r === undefined)) {
    throw new TypeError('Expected a string or a {r, g, b} object as color')
  }

  const
    rgb = typeof color === 'string' ? textToRgb(color) : color,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export default {
  data () {
    return {
      splitterModel: 100, // start at 90%
      selectedDate: '',
      miniMode: true,
      shortWeekdayLabel: false,
      filtradoEvents: [],
      eventos: [],
      dialogo: false,
      events: [
      ],
      contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },

      contentActiveStyle: {
        backgroundColor: '#eee',
        color: 'black'
      },

      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0
      }
    }
  },
  watch: {
    splitterModel (val) {
      const rect = this.$refs.calendar.$el.getBoundingClientRect()
      this.miniMode = rect.width < 1024
      this.shortWeekdayLabel = rect.width < 300
    }
  },
  computed: {
    mesActual () {
      return moment(this.selectedDate).locale('es').format('MMMM YYYY')
    },
    filtrarMes () {
      const data = this.events
      const mesActual = moment(this.selectedDate).format('YYYY/MM')
      const filtrar = data.filter(v => v.mesAnnio === mesActual)
      return filtrar
    }
  },
  mounted () {
    this.obtenerEventos()
    this.onToday()
  },
  methods: {
    filtrarDiaMesAnnio () {
      this.$api.get('eventos_pagados_por_proveedor').then(res => {
        const data = res.map(v => {
          return {
            ...v,
            date: moment(v.evento.date).format('YYYY/MM/DD')
          }
        })
        console.log(data, 'data')
        const mesActual = moment(this.selectedDate).format('YYYY/MM/DD')
        const filtrar = data.filter(v => v.date === mesActual)
        console.log(filtrar, 'filtrar', mesActual, 'mesactual')
        this.filtradoEvents = filtrar
        if (filtrar.length > 0) { this.dialogo = true } else {
          this.dialogo = false
          this.$q.notify({
            message: 'Sin Eventos para Este Dia',
            color: 'warning'
          })
        }
      })
    },
    abrirDialogo (cambioMes) {
      console.log(cambioMes, 'cambio mes')
      if (!cambioMes) {
        this.dialogo = true
        this.filtrarDiaMesAnnio()
        console.log(this.filtradoEvents, 'filtrado eventes por mes')
      } else {
        this.dialogo = false
      }
    },
    isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },
    onClickDay2 (data) {
      this.events.unshift(`click:day2: ${JSON.stringify(data)}`)
      this.abrirDialogo(false)
    },
    onClickDate2 (data) {
      this.events.unshift(`click:date2: ${JSON.stringify(data)}`)
      this.abrirDialogo(false)
    },
    onToday () {
      this.selectedDate = getCurrentDay(CURRENT_DAY.getDate())
    },
    filtrarFecha (data) {
      data = this.events
      const annioActual = moment(this.selectedDate).format('YYYY')
      const filtrar = data.filter(v => v.annio === annioActual)
      this.events = filtrar
    },
    onModelChanged (date) {
      this.events.unshift(`Model changed: ${date}`)
    },
    obtenerEventos () {
      this.$api.get('eventos_pagados_por_proveedor').then(res => {
        console.log(res, 'res')
        this.events = res.map(v => {
          var format = moment(v.evento.date).format()
          v.date = moment(format).dayOfYear()
          return {
            ...v,
            title: v.evento.name,
            bgcolor: 'green',
            date: getCurrentDay(v.date),
            annio: moment(v.evento.date).format('YYYY'),
            mesAnnio: moment(v.evento.date).format('YYYY/MM')
          }
        })
        this.filtrarFecha(this.events)
        // this.filtrarMes()
        console.log(this.events, 'events')
      })
    },
    badgeClasses (event, type) {
      const cssColor = this.isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
      }
    },

    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      const s = {}
      if (this.isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s.color = luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
      }
      if (timeStartPos) {
        s.top = timeStartPos(event.time) + 'px'
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },

    getEvents (dt) {
      const currentDate = QCalendar.parseTimestamp(dt)
      const events = []
      for (let i = 0; i < this.events.length; ++i) {
        let added = false
        if (this.events[i].date === dt) {
          if (this.events[i].time) {
            if (events.length > 0) {
              // check for overlapping times
              const startTime = QCalendar.parseTimestamp(this.events[i].date + ' ' + this.events[i].time)
              const endTime = QCalendar.addToDate(startTime, { minute: this.events[i].duration })
              for (let j = 0; j < events.length; ++j) {
                if (events[j].time) {
                  const startTime2 = QCalendar.parseTimestamp(events[j].date + ' ' + events[j].time)
                  const endTime2 = QCalendar.addToDate(startTime2, { minute: events[j].duration })
                  if (QCalendar.isBetweenDates(startTime, startTime2, endTime2) || QCalendar.isBetweenDates(endTime, startTime2, endTime2)) {
                    events[j].side = 'left'
                    this.events[i].side = 'right'
                    events.push(this.events[i])
                    added = true
                    break
                  }
                }
              }
            }
          }
          if (!added) {
            this.events[i].side = undefined
            events.push(this.events[i])
          }
        } else if (this.events[i].days) {
          // check for overlapping dates
          const startDate = QCalendar.parseTimestamp(this.events[i].date)
          const endDate = QCalendar.addToDate(startDate, { day: this.events[i].days })
          if (QCalendar.isBetweenDates(currentDate, startDate, endDate)) {
            events.push(this.events[i])
            added = true
          }
        }
      }
      return events
    }
  }
}
</script>

<style scoped>
.nube-dialog {
  background: url('../../../public/nube9.png');
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0);
}
.fondo-calendario-3 {
  background: url('../../../public/fondo-calendario.png');
  background-size: 100% 100%;
}
</style>
