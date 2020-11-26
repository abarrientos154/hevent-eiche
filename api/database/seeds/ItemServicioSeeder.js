'use strict'

/*
|--------------------------------------------------------------------------
| ItemServicioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const preguntaFuncion = use("App/Functions/Preguntas")
const ItemServicio = use("App/Models/ItemServicio")
const data = [
  {
    id: 'mesero',
    name: 'Mesero',
    servicio_id: 3,
    pregunta: [
      {
        pregunta: '¿Cual es tu experiencia laboral',
        suffix: 'años',
        respuesta: true,
        tipo: 'Number',
        autogrow: false
      },
      {
        pregunta: '¿Describe tu servicio?',
        respuesta: true,
        autogrow: true,
        tipo: 'textarea',
      }
    ]
  },
  {
    id: 'acomodador',
    name: 'Acomodador',
    servicio_id: 3,
    pregunta: [
      {
        pregunta: '¿Cual es tu experiencia laboral',
        suffix: 'años',
        respuesta: true,
        tipo: 'Number',
        autogrow: false
      },
      {
        pregunta: '¿Describe tu servicio?',
        respuesta: true,
        autogrow: true,
        tipo: 'textarea',
      }
    ]
  },
  {
    id: 'aseo',
    name: 'Aseo',
    servicio_id: 3,
    pregunta: [
      {
        pregunta: '¿Cual es tu experiencia laboral',
        suffix: 'años',
        respuesta: true,
        tipo: 'Number',
        autogrow: false
      },
      {
        pregunta: '¿Describe tu servicio?',
        respuesta: true,
        autogrow: true,
        tipo: 'textarea',
      }
    ]
  },
  {
    id: 'seguridad',
    name: 'Seguridad',
    servicio_id: 3,
    pregunta: [
      {
        pregunta: '¿Cual es tu experiencia laboral',
        suffix: 'años',
        respuesta: true,
        tipo: 'Number',
        autogrow: false
      },
      {
        pregunta: '¿Describe tu servicio?',
        respuesta: true,
        autogrow: true,
        tipo: 'textarea',
      }
    ]
  },
  {
    id: 'traductores',
    name: 'Traductores',
    servicio_id: 3,
    pregunta: [
      {
        pregunta: '¿Cual es tu experiencia laboral',
        suffix: 'años',
        respuesta: true,
        tipo: 'Number',
        autogrow: false
      },
      {
        pregunta: '¿Describe tu servicio?',
        respuesta: true,
        autogrow: true,
        tipo: 'textarea',
      }
    ]
  },
  {
    id: 'animador',
    name: 'Animador',
    servicio_id: 3,
    pregunta: [
      {
        pregunta: '¿Cual es tu experiencia laboral',
        suffix: 'años',
        respuesta: true,
        tipo: 'Number',
        autogrow: false
      },
      {
        pregunta: '¿Describe tu servicio?',
        respuesta: true,
        autogrow: true,
        tipo: 'textarea',
      }
    ]
  },
  {
    id: 'heventPlaner',
    name: 'Hevent Planer',
    servicio_id: 3,
    pregunta: [
      {
        pregunta: '¿Cual es tu experiencia laboral',
        suffix: 'años',
        respuesta: true,
        tipo: 'Number',
        autogrow: false
      },
      {
        pregunta: '¿Describe tu servicio?',
        respuesta: true,
        autogrow: true,
        tipo: 'textarea',
      }
    ]
  },
  {
    id: 'haciendas',
    name: 'Haciendas',
    servicio_id: 2,
    pregunta: [
      {
        pregunta: '¿Valor por alquiler del lugar?',
        valor: true
      },
      {
        pregunta: '¿Celebra más de un evento al dia?',
        sino: true
      },
      {
        pregunta: '¿Es posible alquilar solo el espacio, sin otros servicios?',
        sino: true
      },
      {
        pregunta: '¿Con que espacios dispones?',
        checks: [
          'Recepción', 'Cocina', 'Baños', 'Pista de Baile', 'Zona de Niños', 'Zona de Fumadores', 'Zona Verdes', 'Capilla', 'Parqueadero'
        ]
      },
      {
        pregunta: '¿Con que servicios dispone?',
        checks: [
          'Valet Parking', 'Sonido', 'Alimentos', 'Bebidas', 'Fotógrafo', 'Video', 'Audio', 'Música', 'Iluminación', 'Mobiliario', 'Menaje'
        ]
      },
      {
        pregunta: '¿Con que personal dispone?',
        checks: [
          'Mesero', 'Acomodador', 'Aseo', 'Seguridad', 'Traductor', 'Animador', 'Otro'
        ]
      },
      {
        pregunta: '¿Tiene limite de hora en los eventos, Cuantas?',
        sinoconrespuesta: true,
        suffix: '# horas',
        tipo: 'Number'
      },
      {
        pregunta: '¿Dispone de parqueaderos, Cuántas?',
        sinoconrespuesta: true,
        suffix: '# de Parqueaderos',
        tipo: 'Number'
      },
      {
        pregunta: 'Dispone zonas para discapacitados',
        sino: true
      }
    ]
  },
  {
    id: 'hoteles',
    name: 'Hoteles',
    servicio_id: 2,
    pregunta: [
      {
        pregunta: '¿Valor por alquiler del lugar?',
        valor: true
      },
      {
        pregunta: '¿Celebra más de un evento al dia?',
        sino: true
      },
      {
        pregunta: '¿Es posible alquilar solo el espacio, sin otros servicios?',
        sino: true
      },
      {
        pregunta: '¿Con que espacios dispones?',
        checks: [
          'Recepción', 'Cocina', 'Baños', 'Pista de Baile', 'Zona de Niños', 'Zona de Fumadores', 'Zona Verdes', 'Capilla', 'Parqueadero'
        ]
      },
      {
        pregunta: '¿Con que servicios dispone?',
        checks: [
          'Valet Parking', 'Sonido', 'Alimentos', 'Bebidas', 'Fotógrafo', 'Video', 'Audio', 'Música', 'Iluminación', 'Mobiliario', 'Menaje'
        ]
      },
      {
        pregunta: '¿Con que personal dispone?',
        checks: [
          'Mesero', 'Acomodador', 'Aseo', 'Seguridad', 'Traductor', 'Animador', 'Otro'
        ]
      },
      {
        pregunta: '¿Tiene limite de hora en los eventos, Cuantas?',
        sinoconrespuesta: true,
        suffix: '# horas',
        tipo: 'Number'
      },
      {
        pregunta: '¿Dispone de parqueaderos, Cuántas?',
        sinoconrespuesta: true,
        suffix: '# de Parqueaderos',
        tipo: 'Number'
      },
      {
        pregunta: 'Dispone zonas para discapacitados',
        sino: true
      }
    ]
  },
  {
    id: 'restaurantes',
    name: 'Restaurantes',
    servicio_id: 2,
    pregunta: [
      {
        pregunta: '¿Valor por alquiler del lugar?',
        valor: true
      },
      {
        pregunta: '¿Celebra más de un evento al dia?',
        sino: true
      },
      {
        pregunta: '¿Es posible alquilar solo el espacio, sin otros servicios?',
        sino: true
      },
      {
        pregunta: '¿Con que espacios dispones?',
        checks: [
          'Recepción', 'Cocina', 'Baños', 'Pista de Baile', 'Zona de Niños', 'Zona de Fumadores', 'Zona Verdes', 'Capilla', 'Parqueadero'
        ]
      },
      {
        pregunta: '¿Con que servicios dispone?',
        checks: [
          'Valet Parking', 'Sonido', 'Alimentos', 'Bebidas', 'Fotógrafo', 'Video', 'Audio', 'Música', 'Iluminación', 'Mobiliario', 'Menaje'
        ]
      },
      {
        pregunta: '¿Con que personal dispone?',
        checks: [
          'Mesero', 'Acomodador', 'Aseo', 'Seguridad', 'Traductor', 'Animador', 'Otro'
        ]
      },
      {
        pregunta: '¿Tiene limite de hora en los eventos, Cuantas?',
        sinoconrespuesta: true,
        suffix: '# horas',
        tipo: 'Number'
      },
      {
        pregunta: '¿Dispone de parqueaderos, Cuántas?',
        sinoconrespuesta: true,
        suffix: '# de Parqueaderos',
        tipo: 'Number'
      },
      {
        pregunta: 'Dispone zonas para discapacitados',
        sino: true
      }
    ]
  },
  {
    id: 'clubs',
    name: 'Clubs',
    servicio_id: 2,
    pregunta: [
      {
        pregunta: '¿Valor por alquiler del lugar?',
        valor: true
      },
      {
        pregunta: '¿Celebra más de un evento al dia?',
        sino: true
      },
      {
        pregunta: '¿Es posible alquilar solo el espacio, sin otros servicios?',
        sino: true
      },
      {
        pregunta: '¿Con que espacios dispones?',
        checks: [
          'Recepción', 'Cocina', 'Baños', 'Pista de Baile', 'Zona de Niños', 'Zona de Fumadores', 'Zona Verdes', 'Capilla', 'Parqueadero'
        ]
      },
      {
        pregunta: '¿Con que servicios dispone?',
        checks: [
          'Valet Parking', 'Sonido', 'Alimentos', 'Bebidas', 'Fotógrafo', 'Video', 'Audio', 'Música', 'Iluminación', 'Mobiliario', 'Menaje'
        ]
      },
      {
        pregunta: '¿Con que personal dispone?',
        checks: [
          'Mesero', 'Acomodador', 'Aseo', 'Seguridad', 'Traductor', 'Animador', 'Otro'
        ]
      },
      {
        pregunta: '¿Tiene limite de hora en los eventos, Cuantas?',
        sinoconrespuesta: true,
        suffix: '# horas',
        tipo: 'Number'
      },
      {
        pregunta: '¿Dispone de parqueaderos, Cuántas?',
        sinoconrespuesta: true,
        suffix: '# de Parqueaderos',
        tipo: 'Number'
      },
      {
        pregunta: 'Dispone zonas para discapacitados',
        sino: true
      }
    ]
  },
  {
    id: 'galeria',
    name: 'Galería de Arte',
    servicio_id: 2,
    pregunta: [
      {
        pregunta: '¿Valor por alquiler del lugar?',
        valor: true
      },
      {
        pregunta: '¿Celebra más de un evento al dia?',
        sino: true
      },
      {
        pregunta: '¿Es posible alquilar solo el espacio, sin otros servicios?',
        sino: true
      },
      {
        pregunta: '¿Con que espacios dispones?',
        checks: [
          'Recepción', 'Cocina', 'Baños', 'Pista de Baile', 'Zona de Niños', 'Zona de Fumadores', 'Zona Verdes', 'Capilla', 'Parqueadero'
        ]
      },
      {
        pregunta: '¿Con que servicios dispone?',
        checks: [
          'Valet Parking', 'Sonido', 'Alimentos', 'Bebidas', 'Fotógrafo', 'Video', 'Audio', 'Música', 'Iluminación', 'Mobiliario', 'Menaje'
        ]
      },
      {
        pregunta: '¿Con que personal dispone?',
        checks: [
          'Mesero', 'Acomodador', 'Aseo', 'Seguridad', 'Traductor', 'Animador', 'Otro'
        ]
      },
      {
        pregunta: '¿Tiene limite de hora en los eventos, Cuantas?',
        sinoconrespuesta: true,
        suffix: '# horas',
        tipo: 'Number'
      },
      {
        pregunta: '¿Dispone de parqueaderos, Cuántas?',
        sinoconrespuesta: true,
        suffix: '# de Parqueaderos',
        tipo: 'Number'
      },
      {
        pregunta: 'Dispone zonas para discapacitados',
        sino: true
      }
    ]
  },
  {
    id: 'salon',
    name: 'Salón',
    servicio_id: 2,
    pregunta: [
      {
        pregunta: '¿Valor por alquiler del lugar?',
        valor: true
      },
      {
        pregunta: '¿Celebra más de un evento al dia?',
        sino: true
      },
      {
        pregunta: '¿Es posible alquilar solo el espacio, sin otros servicios?',
        sino: true
      },
      {
        pregunta: '¿Con que espacios dispones?',
        checks: [
          'Recepción', 'Cocina', 'Baños', 'Pista de Baile', 'Zona de Niños', 'Zona de Fumadores', 'Zona Verdes', 'Capilla', 'Parqueadero'
        ]
      },
      {
        pregunta: '¿Con que servicios dispone?',
        checks: [
          'Valet Parking', 'Sonido', 'Alimentos', 'Bebidas', 'Fotógrafo', 'Video', 'Audio', 'Música', 'Iluminación', 'Mobiliario', 'Menaje'
        ]
      },
      {
        pregunta: '¿Con que personal dispone?',
        checks: [
          'Mesero', 'Acomodador', 'Aseo', 'Seguridad', 'Traductor', 'Animador', 'Otro'
        ]
      },
      {
        pregunta: '¿Tiene limite de hora en los eventos, Cuantas?',
        sinoconrespuesta: true,
        suffix: '# horas',
        tipo: 'Number'
      },
      {
        pregunta: '¿Dispone de parqueaderos, Cuántas?',
        sinoconrespuesta: true,
        suffix: '# de Parqueaderos',
        tipo: 'Number'
      },
      {
        pregunta: 'Dispone zonas para discapacitados',
        sino: true
      }
    ]
  },
  {
    id: 'auditorias',
    name: 'Auditorias',
    servicio_id: 2,
    pregunta: [
      {
        pregunta: '¿Valor por alquiler del lugar?',
        valor: true
      },
      {
        pregunta: '¿Celebra más de un evento al dia?',
        sino: true
      },
      {
        pregunta: '¿Es posible alquilar solo el espacio, sin otros servicios?',
        sino: true
      },
      {
        pregunta: '¿Con que espacios dispones?',
        checks: [
          'Recepción', 'Cocina', 'Baños', 'Pista de Baile', 'Zona de Niños', 'Zona de Fumadores', 'Zona Verdes', 'Capilla', 'Parqueadero'
        ]
      },
      {
        pregunta: '¿Con que servicios dispone?',
        checks: [
          'Valet Parking', 'Sonido', 'Alimentos', 'Bebidas', 'Fotógrafo', 'Video', 'Audio', 'Música', 'Iluminación', 'Mobiliario', 'Menaje'
        ]
      },
      {
        pregunta: '¿Con que personal dispone?',
        checks: [
          'Mesero', 'Acomodador', 'Aseo', 'Seguridad', 'Traductor', 'Animador', 'Otro'
        ]
      },
      {
        pregunta: '¿Tiene limite de hora en los eventos, Cuantas?',
        sinoconrespuesta: true,
        suffix: '# horas',
        tipo: 'Number'
      },
      {
        pregunta: '¿Dispone de parqueaderos, Cuántas?',
        sinoconrespuesta: true,
        suffix: '# de Parqueaderos',
        tipo: 'Number'
      },
      {
        pregunta: 'Dispone zonas para discapacitados',
        sino: true
      }
    ]
  },
  {
    id: 'alimentos',
    name: 'Alimentos',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Valor por plato?',
        valor: true
      },
      {
        pregunta: '¿Que incluye el plato?',
        checks: [ 'Entrada', 'Principal', 'Postre', 'Bebidas' ]
      },
      {
        pregunta: '¿Que tipo de comida prepara?',
        checks: [ 'Típica', 'Rápida', 'Pastas', 'Carnes', 'Mar', 'Sushi', 'Vegetariana', 'Vegana', 'Mexicana', 'Internacional', 'Asiática', 'Desayunos', 'Postres' ]
      },
      {
        pregunta: '¿Es posible adaptar o modificar los menús?',
        sino: true
      },
      {
        pregunta: '¿Hay algún costo extra por desplazamiento?',
        sino: true
      }

    ]
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Valor por Bebida?',
        valor: true
      },
      {
        pregunta: '¿Qué bebidas preparas?',
        checks: [ 'Jugos o Smoothie', 'Malteadas', 'Cocteles', 'Cocteles sin Alcohol', 'Calientes' ]
      },
      {
        pregunta: '¿Qué tipo de Bebidas Alcohólicas tiene?',
        checks: [ 'Champagne', 'Cerveza', 'Whisky', 'Vodka', 'Tequila', 'Ron', 'Ginebra', 'Brandy', 'Vino', 'Amaratto', 'Aguardiente', 'Pisco', 'Brandy' ]
      },
      {
        pregunta: '¿Que tipo de Bebidas Calientes tiene?',
        checks: [ 'Café', 'Aromática', 'Cappuccinos' ]
      },
      {
        pregunta: '¿Que tipo de jugos o Smoothie tiene?',
        checks: [ 'Fresa', 'Melon', 'Naranja', 'Limon', 'Papaya', 'Mango', 'Guayaba', 'Mora', 'Otro' ]
      },
      {
        pregunta: '¿Hay algún costo extra por desplazamiento?',
        sino: true
      }
    ]
  },
  {
    id: 'fotografia',
    name: 'Fotografia',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Que estilo de fotografía realiza?',
        checks: [ 'Tradicional', 'Artistica' ]
      },
      {
        pregunta: '¿Qué sensor Utilizas?',
        checks: [ 'Full Fram', 'APSC' ]
      },
      {
        pregunta: '¿Cual es el tiempo de entrega aproximado del material?',
        checks: [ '3 Dias', '5 Dias', '7 Dias' ]
      },
      {
        pregunta: '¿En que formato entregas las fotos?',
        checks: [ 'JPGE', 'PNG', 'GIF', 'TIFF', 'PSD' ]
      },
      {
        pregunta: '¿Hay algún costo extra por desplazamiento?',
        sino: true
      }
    ]
  },
  {
    id: 'video',
    name: 'Video',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Que estilo de video realiza?',
        checks: ['Tradicional', 'Artistica']
      },
      {
        pregunta: '¿Que sensor utilizas?',
        checks: [ 'Full Fram', 'APSC' ]
      },
      {
        pregunta: '¿Cual es el tiempo de entrega aproximado del material?',
        checks: [ '3 Dias', '5 Dias', '7 Dias' ]
      },
      {
        pregunta: '¿En que formato entrega el video?',
        checks: [ 'MP4', 'AVI', 'MOV' ]
      },
      {
        pregunta: '¿Hay algún costo extra por desplazamiento?',
        sino: true
      }
    ]
  },
  {
    id: 'audio',
    name: 'Audio',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Que tipo de Equipos tienes Audio?',
        checks: ['Altavoces', 'Mezcladores de Audio', 'Sistema inalambrico digital', 'Microfonos de Conferencia', 'Microfonos Inalambricos', 'Accesorios', 'Sistema de Control']
      },
      {
        pregunta: '¿Que tipo de Equipos tienes iluminación?',
        checks: [ 'Proyector', 'Pantallas LED', 'Monitores de plasma', 'Luces LED', 'Bola de espejos', 'Maquina de humo', 'Foco LED', 'Videowalls', 'Sistema de control', 'Accesorios' ]
      },
      {
        pregunta: '¿Hay algun costo por desplazamiento?',
        sino: true
      }
    ]
  },
  {
    id: 'musica',
    name: 'Musica',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Cuantas personas estan en la agrupación?',
        respuestasola: true,
        tipo: 'Number'
      },
      {
        pregunta: '¿Que genero tocan?',
        checks: [ 'Merengue', 'Salsa', 'Porros', 'Cumbia', 'Pasodobles', 'Reggaetón', 'Vallenato', 'Zamba', 'Boleros', 'Rancheras', 'Jazz', 'Electrónica', 'Rock', 'Pop', 'Rap', 'Crossover' ]
      },
      {
        pregunta: '¿Cuánto tiempo dura el servicio?',
        suffix: '# horas',
        respuesta: true,
        tipo: 'Number',
        autogrow: false
      },
      {
        pregunta: '¿Hay algún costo extra por desplazamiento?',
        sino: true
      }
    ]
  },
  /* {
    id: 'iluminacion',
    name: 'Iluminación',
    servicio_id: 1
  }, */
  {
    id: 'invitaciones',
    name: 'Invitaciones',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿que tipo de Invitaciones Realizas?',
        checks: ['Digital', 'Impresa']
      },
      {
        pregunta: '¿Que otros servicios ofrece?',
        checks: [ 'Servicio de impresion', 'tarjetas de agradecimiento', 'Diseños Personalizados', 'Recuerdos para eventos', 'Otro' ]
      },
      {
        pregunta: '¿Que tipo de impresiones hace?',
        checks: ['Impresión láser', 'Impresion en relieve', 'Offset', 'Impresión', 'tipográfica', 'Otros']
      },
      {
        pregunta: '¿Hay algún costo extra por envio?',
        sinoconrespuesta: true,
        suffix: 'cuanto',
        tipo: 'Number'
      }
    ]
  },
  {
    id: 'recordatorios',
    name: 'Recordatorios',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Dispone de un catalogo cerrado o es posible hacer recuerdos a medida?',
        checks: ['Recuerdos personalizados', 'Recuerdos catalago']
      },
      {
        pregunta: '¿Algún costo extra por envio?',
        sinoconrespuesta: true,
        suffix: 'cuanto',
        tipo: 'Number'
      }
    ]
  },
  {
    id: 'decoracion',
    name: 'Decoración',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Que tipo de decoración manejas?',
        checks: ['Globs', 'Telas', 'Velas', 'Flores', 'Decoración Sillas', 'Decoración Mesas', 'Vajilla', 'Decoración en icopor', 'Decoracion en Híelo']
      },
      {
        pregunta: '¿Al contratar el servicio se encarga del montaje?',
        sino: true
      },
      {
        pregunta: '¿Al contratar el servicio se encarga del desmontaje?',
        sino: true
      },
      {
        pregunta: '¿Hay algún costo extra por desplazamiento?',
        sino: true
      }
    ]
  },
  {
    id: 'mobiliario',
    name: 'Mobiliario',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Que mobiliario tienes?',
        checks: ['Sillas', 'Mesas', 'Carpas', 'Tarimas', 'Pistas de Baile']
      },
      {
        pregunta: '¿Al contratar el servicio se encarga del montaje?',
        sino: true
      },
      {
        pregunta: '¿Al contratar el servicio se encarga del desmontaje?',
        sino: true
      },
      {
        pregunta: '¿Hay algún costo extra por desplazamiento?',
        sino: true
      }
    ]
  },
  {
    id: 'transporte',
    name: 'Transporte',
    servicio_id: 1,
    pregunta: [
      {
        pregunta: '¿Que tipo de transporte tiene?',
        checks: ['Van', 'Autobus', 'Chiva', 'Carro', 'Camioneta', 'Limusina']
      },
      {
        pregunta: '¿Que incluye el alquiler?',
        checks: ['Conductor', 'Combustible', 'Sesión de fotos', 'Comida', 'Bebidas', 'Música', 'Decoración Interior', 'Decoración Exterior']
      },
      {
        pregunta: '¿Hay in tiempo minimo de alquiler?',
        sinoconrespuesta: true,
        suffix: 'cuantas horas',
        tipo: 'Number'
      },
      {
        pregunta: '¿Que servicio de transporte ofrece?',
        checks: ['Recorridos Programados', 'Encuentro en un punto']
      }
    ]
  }
]

class ItemServicioSeeder {
  async run() {
    for (let i in data) {
      let itemServicio = await ItemServicio.findBy('id', data[i].id)
      if (!itemServicio) {
        await ItemServicio.create(data[i])
      } else {
        itemServicio.name = data[i].name
        itemServicio.servicio_id = data[i].servicio_id
        itemServicio.id = data[i].id
        itemServicio.pregunta = data[i].pregunta
        await itemServicio.save()
      }
    }
    console.log('Finished Servicios Item')
  }
}

module.exports = ItemServicioSeeder
