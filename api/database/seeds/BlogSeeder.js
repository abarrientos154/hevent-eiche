'use strict'

/*
|--------------------------------------------------------------------------
| BlogSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Blog = use("App/Models/Blog")
const data = [
  {
    _id: '6092d9536cba4a18b8832cfd',
    id: 1,
    titulo: `
      El mejor recuerdo de un evento son las fotos, por eso sigue estos consejos para contratar a un fotógrafo.
    `,
    tipo: 1, // CONSEJOS
    categoria: '',
    subtitulo: 'Consejos',
    description: `
      Una imagen vale más que mil palabras, el refrán que va muy bien en el ámbito de los eventos ya que: más vale hacer fotos increíbles durante tu evento para enseñar y difundir todo el concepto, momentos especiales y experiencias inolvidables que los asistentes o invitados presenciaron de primera mano. Pero, ¿cómo hacer las mejores fotos y que estas tengan repercusión y sean interesantes para los curiosos de las redes sociales? Sigue estos consejos y conseguirás conseguir al mejor fotógrafo para tu evento y así las fotos hablen por si solas.
      Especialidad: No todos los fotógrafos son válidos para transmitir el concepto del evento y lo que se desarrolle en él, ya que varios no les gusta hacer fotos de eventos porque no entienden el sector y la importancia que tienen. La fotografía de eventos requiere de un profesional que le guste la industria, por eso es importante que sepa diferenciar entre los diferentes tipos de eventos como por ejemplo los de prensa donde se busca dar cierta imagen, o los eventos internos donde esta característica no es determinante. Importante mirar su portafolio en eventos y preguntarle ¿Qué le puedes aportar al evento?
      La iluminación. Una buena iluminación permite captar fotografías de un evento y crear diferentes ambientes, es fundamental para diseñar y transmitir la atmósfera deseada creada directamente desde el entorno y si se va a utilizar flash que predomine la luz natural.
    `,
    descriptionTwo: `
    Un buen Broshure: Por tu parte debes pasarle la mayor información al fotógrafo y más si la tienes resumida en un broshure asi le permitirás que llegue con anticipación al evento, de que se trata y el concepto que va a manejar, si es necesario hacer fotos a personas concretas, escenarios, decoración etc y coordinar desde antes de realizar el evento que día se necesita el material y para donde va ser dirigido si para redes sociales, web o impresión (nota: procesar las fotos tarda tiempo y es probable que el fotógrafo solo te pueda hacer una selección muy parcial si necesitas fotos justo al acabar el evento). Además, muéstrale con referentes que tipo de fotografía quieres y los planos.
    El photocall, el gran protagonista. Ese punto localizado sutilmente es donde puedes controlar a los asistentes y sacarles las mejores fotos. El photocall permite diseñar una foto con los elementos claves para que el resultado sea bueno y ellos queden encantados para un gran recuerdo como complemento del fotógrafo.
    Otros elementos que sí importan. A veces detalles tan insignificantes como la botella de agua en una mesa de presidencia, los micros en una ponencia, o durante una proyección no cuidar la intensidad de la luz, parecen inofensivos, pero en realidad son elementos que entorpecen visualmente una foto. Cuidar los detalles puede ser una labor a la cual a priori no damos importancia, pero sí la tiene.
    `,
    imgs: ['1.jpg', '2.jpg', '3.jpg', '5.jpg', '6.jpg'],
    img: 'portada.jpg',
    autor: ''
  },
  {
    _id: '60da1f32646eea097c79a4ec',
    id: 2,
    titulo: `
      Medidas y Recomendaciones sanitarias para realizar su evento.
    `,
    tipo: 3, // ARTICULO
    categoria: '',
    subtitulo: 'Articulo',
    description: `
      Desde la llegada del coronavirus y sus nuevas sepas, el sector de eventos en Latinoamérica se encuentra en un momento crítico. En primer lugar, por las cancelaciones de reuniones programadas y no poder realizar ninguna clase de eventos. Provocado una importante crisis económica que ha afectado especialmente al sector. Y en segundo, porque se ha tenido que adecuar los espacios para cumplir toda la normativa de bioseguridad. Por este motivo, sólo el diseño de un sistema de prevención coordinado y que cubriera toda la cadena de valor del sector permitiría dar el primer paso para la reapertura de los establecimientos y el reinicio de la actividad, por eso es importante seguir estas recomendaciones.
      A la hora de buscar un espacio es importante preguntar cuál es el nuevo cupo disponible para así saber cuántos invitados podemos tener. Y lo segundo es preguntarle qué medidas está tomando ya que ellos son los responsables de definir, implementar y ejecutar todas las medidas necesarias impuestas por cada país, así como hacerlas cumplir entre todos los proveedores que estarán en el evento.
    `,
    descriptionTwo: `
    Importante enviarles a los proveedores como invitados cuales son las medidas compartidas por el administrador donde se va realizar el evento. Estas deben tener: limpieza y desinfección de las instalaciones, las medidas de higiene personal, el distanciamiento físico entre personas y señalización de las mismas que se deben cumplir durante el evento.
    Esperemos que estas medidas generales te sirvan para darle un impulso a la recuperación de nuestro sector.
    `,
    imgs: ['1.jpg', '2.jpg'],
    img: 'portada.jpg',
    autor: ''
  },
  {
    _id: '60da205e27bbd21ac4599fb1',
    id: 3,
    titulo: `
      Como ocupar tu tiempo antes de regresar hacer eventos
    `,
    tipo: 2, // IDEAS
    categoria: '',
    subtitulo: 'Idea',
    description: `
      Si eres organizador de eventos o tu actividad económica está relacionada con esta actividad este artículo es para ti, toma nota de estos consejos para ganar tiempo cuando regresemos a la ansiada normalidad. Por eso es momento de sacar adelante aquellas tareas que siempre se han visto relegadas o contratadas por el ritmo frenético del día a día y ahora las puedes desarrollar.
      1.	Calendario: Es hora de plantearse nuevas actividades, formatos y calendario. ¡Renueva tu oferta y destaca entre los demás!
      2.	Búsqueda de proveedores. Generalmente tendemos a llamar a los proveedores de siempre para que nos ayuden. ¿Qué tal una búsqueda de alternativas? o unirte a la nueva app de eventos Heventapp.com y ganar la visibilidad de tu negocio a otros clientes y comparar precios con la competencia. Quién sabe, puede que te estén escribiendo y te empiecen a llegar increíble propuesta.
      3.	Organiza las fotos de los eventos. Todos tenemos en nuestro equipo una o varias carpetas de fotos de eventos que no hemos revisado o no nos acordamos de su contenido. Puede ser que encuentres gran contenido para compartir a tu audiencia.
    `,
    descriptionTwo: `
    4.	Planifica las redes sociales. Siempre tendemos a descuidar las redes sociales. Generalmente porque no vemos el retorno de la inversión (en este caso, el tiempo) a corto plazo. Sin embargo, ¿muestran las redes sociales la imagen que queremos transmitir? Aprovecha para cambiar las portadas, descripciones, enlaces y publicar contenido para resaltar tus logros. Hootsuite es una herramienta muy práctica que puede ayudarte a gestionar fácilmente los perfiles de Linkedin, Instagram, Twitter y Facebook.
    5.	Actualiza el sitio web. No te olvides de publicar los últimos proyectos en tu página web. Aprovecha para revisar cómo tienes estructurada la información. ¿Está todo claro? Es un momento perfecto para dar un repaso a la redacción y de utilizar palabras clave más potentes para posicionar mejor la página en los principales motores de búsqueda.
    Espero que este articulo sea de tu ayuda y recuerda siempre estar pendiente al blog que estaremos subiendo artículos así de interesantes y de gran ayuda para proveedores como usuarios que les fascinan hacer eventos.

    `,
    imgs: ['1.jpg', '2.jpg', '3.jpg'],
    img: 'portada.jpg',
    autor: ''
  }
]

class BlogSeeder {
  async run () {
    for (let i in data) {
      let search = await Blog.findBy('id', data[i].id)
      if (!search) {
        await Blog.create(data[i])
      } else {
        await Blog.query().where('id', data[i].id).update(data[i])
      }
    }
    console.log('Finished Blogs')
  }
}

module.exports = BlogSeeder
