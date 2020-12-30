<template>
  <div class="column q-ma-sm">
    <div class="row items-center">
      <q-btn color="primary" flat round size="md" icon="keyboard_arrow_left" />
      <div class="text-primary text-bold text-h6">Calendario</div>
    </div>
    <div class="row q-gutter-xs q-mt-md items-center">
      <q-btn icon="navigate_before" @click="$refs.calendar.prev(), obtenerEventos()" color="primary" flat round/>
      <div class="text-center text-capitalize text-subtitle1" style="min-width: 100px;"> {{mesActual}} </div>
      <q-btn icon="navigate_next" @click="$refs.calendar.next(), obtenerEventos()" color="primary" flat round/>
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
            view="month"
            @input="onModelChanged"
            locale="es-es"
            :mini-mode="true"
            :short-weekday-label="shortWeekdayLabel"
          >
            <template #day="{ timestamp, miniMode }" style="height:400px">
              <template v-for="(event, index) in getEvents(timestamp.date)">
                <template v-if="miniMode" >
                  <q-badge
                    :key="index"
                    style="width: 10px!important; max-width: 10px; height: 10px; max-height: 10px;z-index:-1"
                    :class="badgeClasses(event, 'day', index)"
                    :style="badgeStyles(event, 'day')"
                    @click="test(event)"
                  ></q-badge>
                </template>
                <template v-else>
                  <q-badge
                    @click="test(event)"
                    :key="index"
                    style="width: 100%; cursor: pointer; height: 16px; max-height: 16px"
                    class="q-mb-xs"
                    :class="badgeClasses(event, 'day', index)"
                    :style="badgeStyles(event, 'day')"
                  >
                    <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>
                    <span class="ellipsis">{{ event.title }}</span>
                  </q-badge>
                </template>
              </template>
            </template>
          </q-calendar>
        </template>
        <!--<template v-slot:separator>
          <q-avatar color="secondary" text-color="white" size="40px" icon="drag_indicator" />
        </template> -->
        <template v-slot:after>
          <div style="min-width: 20px"></div>
        </template>
      </q-splitter>
    </div>
    <div class="q-pa-md">
      <q-scroll-area horizontal style="height: 300px; width: 100%;" :thumb-style="thumbStyle"
        :content-style="contentStyle">
        <div class="row no-wrap">
          <q-card style="width:300px; height:280px" class="no-shadow" v-for="(item, index) in events" :key="index">
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
      miniMode: false,
      shortWeekdayLabel: false,
      locale: 'es-es',
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
      },
      events: [
        {
          title: '1st of the Month',
          details: 'Everything is funny as long as it is happening to someone else',
          date: getCurrentDay(4),
          bgcolor: 'red'
        }
      ]
    }
  },
  watch: {
    splitterModel (val) {
      const rect = this.$refs.calendar.$el.getBoundingClientRect()
      this.miniMode = rect.width < 500
      this.shortWeekdayLabel = rect.width < 300
    }
  },
  computed: {
    mesActual () {
      return moment(this.selectedDate).locale('es').format('MMMM YYYY')
    }
  },
  mounted () {
    // var aaa = moment().format('DD')
    // var aa = parseInt(aaa)
    this.onToday()
    this.obtenerEventos()
  },
  methods: {
    filtrarFecha (data) {
      const mesAnnioActual = moment(this.selectedDate).format('YYYY/MM')
      console.log(mesAnnioActual, 'actual', data, 'dataaa')
      const filtrar = data.filter(v => v.mesAnnio === mesAnnioActual)
      console.log(filtrar, 'filtrar')
      this.events = filtrar
      this.getEvents()
    },
    obtenerEventos () {
      this.$api.get('eventos_pagados_por_proveedor').then(res => {
        console.log(res, 'res')
        this.events = res.map(v => {
          return {
            ...v,
            title: v.evento.name,
            bgcolor: 'green',
            date: getCurrentDay(moment(v.evento.date).format('DD')),
            mesAnnio: v.evento.date.slice(0, 7)
          }
        })
        this.filtrarFecha(this.events)
      })
    },
    onToday () {
      this.selectedDate = getCurrentDay(CURRENT_DAY.getDate())
      console.log(this.selectedDate, 'selected')
    },
    onModelChanged (date) {
      this.obtenerEventos()
      this.events.unshift(`Model changed: ${date}`)
      this.getEvents()
      console.log('onModelChange')
    },
    test (event) {
      console.log(event, 'se a ejecutado el test')
    },
    isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },

    badgeClasses (event, type, index) {
      const cssColor = this.isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      const add = index === 0 ? 'q-mt-xs' : 'q-mt-xs'
      console.log(add)
      const margen = {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
      }
      return margen
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
