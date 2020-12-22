

exports.preguntas = async (servicio_id) => {
  if (servicio_id === 2) {
    let retornar = [
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
          'Mesero', 'Acomodador', 'Aseo', 'Seguridad', 'Traductor', 'Animador'
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
    return retornar
  } else if (servicio_id === 3) {
    let retornar = [
      {
        pregunta: '¿Cual es tu experiencia laboral',
        suffix: 'años',
        respuesta: true
      },
      {
        pregunta: '¿Describe tu servicio?',
        respuesta: true,
        autogrow: true
      }
    ]
    return {preguntas: retornar}
  }

};
