'use strict'

/*
|--------------------------------------------------------------------------
| Routes
  Existen 2 grupos de rutas: Las que necesitan autenticación del usuario y las que no. TOMAR MUY EN CUENTA ESTO
  Dentro del grupo de las que necesitan autenticación se debe especificar el middleware para verificar si el
  usuario(autenticado) tiene el permiso para acceder a esa ruta. Ejemplo: .middleware('verifyPermission:1')
  El número 1 indica el permiso que debe tener para acceder a esa ruta
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})

/* Route.post('hello-world/:tokenPay', ({ view }) => {
  return view.render('flow-pay')
}) */

Route.post('pay-flow', ({ view }) => {
  return view.render('flow-pay')
})

const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");
  return group;
};


addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí

    Route.post("pay-flow-event-response-token", "UserController.payFlowNew");
    Route.post("pay_flow_event/:event_id/:ref", "UserController.payFlowRedirectEvent");

    Route.post("login", "UserController.login");
    Route.post("register", "UserController.register")
    Route.post("registrar_cliente", "UserController.registrarCliente")
    Route.get("validate_email/:email", "UserController.validateEmail")
    Route.get("plans", "PlanController.index")
    Route.get("get_provider_by_reference/:ref", "UserController.getProviderByReference")
    Route.post("registrar_proveedor", "UserController.registrarProveedor")

    Route.post("pasa_token", "PlanController.pasaToken")

    ////////////////////////PAISES////////////////////////////
    Route.get("countries", "CountryController.index")
    /////////////////////////////////////////////////////////

    ///////////SERVICIOS Y PREGUNTAS////////////////
    Route.get("servicios", "ServicioController.index")
    Route.post("preguntas", "ServicioController.preguntasPorCheck")
    Route.put("preguntas", "ServicioController.update")

    Route.get("file_proveedor/:file", "UploadController.getFileByDirectory")
    Route.get("file_proveedor_video/:file", "UploadController.getFileByDirectoryVideo")
    Route.delete("eliminar_archivo_proveedor/:file", "UploadController.eliminarArchivo")

    Route.delete("eliminar_archivo_proveedor_video/:file", "UploadController.eliminarArchivoVideo")
    Route.get("test_file/:file", "UploadController.testFile")
    Route.get("file_proveedor/:carpeta/:id", "UploadController.traerImagenPortadaPerfilProveedor")
    Route.get("file_event/:file", "UploadController.getFileByDirectoryEvent")

    Route.put("actualizar_pass/:code", "UserController.actualizarPass")
    Route.get("email_send/:email", "UserController.recuperacion")
    Route.get("code_verification/:code", "UserController.verificarCode")

    Route.put("proveedor_aprobado/:ref", "UserController.aprovedProvider")

    Route.post("flow-pay-update", "UserController.payFlowUpdateVerify")

    Route.post("pay_flow", "UserController.payFlow")
    Route.post("verificar_flow_ref/:ref", "UserController.verificarPayFlow")

    Route.post("pay_flow_update", "UserController.payFlowUpdate")
    Route.post("pay_by_wompi", "UserController.cambioPlanByWompi")

    Route.get("user_info/:id", "UserController.userInfoById")

    Route.get("blogs_img/:id/:file", "BlogController.showImg")

    Route.get("pruebaC/:event_id", "CotisationController.pruebaC")
  })
);

addPrefixToGroup(
  Route.group(() => {

    // Insertar rutas con protección de autenticación aquí

    Route.get('validar_plan', 'UserController.validarCambioPlan')
    Route.get('tu_plan', 'UserController.tuPlan')

    // Validar TOKEN
    Route.get('isValid', 'UserController.validarToken')

    /////////////Imagenes///////////////////
    //Route.post('subirImagenes', 'UploadController.uploadShopImage');
    ///////////////////////////////

    ///////////PROVEEDORES/////////////////////
    Route.get('proveedores', 'ProveedorController.index')
    Route.get('proveedores_premiun/:header', 'ProveedorController.premiun')
    Route.get('proveedores_perfil', 'ProveedorController.show')
    Route.post('proveedores', 'ProveedorController.store')
    Route.get('proveedores_servicios/:id_servicio', 'ServicioController.preguntasPorId')
    Route.get('preguntas_proveedor', 'ServicioController.preguntasPorId')
    Route.get('servicios_proveedor', 'ServicioController.preguntasPorProveedor')
    Route.get('servicios_proveedor/:id_proveedor', 'ServicioController.preguntasPorProveedorId')
    Route.get('obtener_check_servicios_perfil/:id_proveedor', 'ServicioController.obtenerCheckServiciosPerfil')
    Route.get('obtener_check_servicios_anuncio/:id_proveedor', 'ServicioController.obtenerCheckServiciosAnuncio')
    Route.put('modificar_servicios_preguntas', 'ServicioController.modificarServiciosPreguntas')
    ///////////PROVEEDORES/////////////////////

    ///////////Usuarios/////////////////////
    Route.get('users_perfil', 'UserController.show')
    Route.get('info_proveedor/:id', 'UserController.showInfoProveedorAnuncio')
    Route.put('editar_datos_proveedor', 'UserController.editarDatosProveedor')
    Route.post('guardar_descripcion_proveedor', 'UserController.guardarDescripcionProveedor')
    Route.put('users_perfil', 'UserController.update')
    Route.get("show_provider_for_user/:id", "ProveedorController.showProviderForUser")
    Route.get("user_info", "UserController.userInfo") // metodo para obtener informacion del usuario que esta logueado
    Route.post("actualizar_file_cliente", "UploadController.actualizarFileCliente") // metodo para obtener informacion del usuario que esta logueado
    Route.post('editar_perfil_cliente', 'UserController.editarDCliente')
    Route.put("editar_contrasena_cliente", "UserController.editarPCliente")


    //rutas para cotizaciones
    Route.get("create_cotization/:id_proveedor/:id_event", "CotisationController.store")
    Route.post("enviar_cotizacion/:id", "CotisationController.enviarCotizacion")
    Route.get("show_all_info_cotization/:id_cotisation", "CotisationController.showAllInfoCotisation")
    Route.get("get_chats", "CotisationController.getChat") //obtiene todas los chats
    Route.post("add_detail_services/:id_cotisation", "CotisationController.addDetailServices") //agrega los detalles del servicio a la cotizacion
    Route.get("show_detail_service_by_id/:id_cotisation/:id_service", "CotisationController.showDetailServiceById") //agrega los detalles del servicio a la cotizacion
    Route.get("get_cotisation_in_status", "CotisationController.getCotisationInStatus")
    Route.put("approve_quote/:id", "CotisationController.approveQuote")
    Route.put("desapprove_quote/:id", "CotisationController.disapproveQuote")
    Route.put("pay_quotes/:event_id", "CotisationController.payQuotes")
    Route.get("quotes_by_status_approve", "CotisationController.quotesByStatusApprove")
    Route.get("cotisations_by_event/:event_id", "CotisationController.cotisationsByEvent")
    Route.get("get_cotisacion_by_id/:id", "CotisationController.getCotisacionById")
    Route.get("eventos_terminados_por_fecha", "CotisationController.eventosRealizados")
    Route.get("cotizacionesPendientesLength", "CotisationController.cotizacionesPendientesLength")

    ////////// EVENTOS ////////////////////
    Route.get("events", "CotisationController.getEvents")
    Route.put("events/:id", "EventController.update")
    Route.get("event_by_id/:id", "CotisationController.getEventById")
    Route.get("eventos_no_pagados", "EventController.eventosNoPagados")
    Route.post("event", "EventController.store")
    Route.get("event/:id", "EventController.show")
    Route.get("events_by_user", "EventController.index")
    Route.get("eventos_pagados_por_proveedor", "EventController.eventosPagadosPorProveedor")
    ///////////// EVENTOS ///////////

    /////////////MENSAJES//////////////////////////
    Route.post("send_message/:id_cotisation", "ChatController.store") // metod para enviar un mensaje
    Route.get("show_messages/:id_cotisation", "ChatController.show") // metodo para obtener todos los mensajes de una cotisacion

    Route.post("subir_archivo_proveedor", "UploadController.subirArchivoProveedor")
    Route.post("subir_archivo_proveedor_video", "UploadController.subirArchivoProveedorVideo")
    Route.post("actualizar_file_proveedor/:carpeta", "UploadController.actualizarPortadaPerfilProveedor")
    Route.post("subir_imagen_evento/:event_id", "UploadController.subirImagenEvento")

    ///////////////////////////OPINIONES Y ESTADISTICAS///////////////////////////////
    Route.get("opiniones", "OpinionController.index")
    Route.get("opiniones/:id_proveedor", "OpinionController.opinionesPorProveedorId")
    Route.post("opinar", "OpinionController.store")
    Route.get("estadisticas", "OpinionController.estadisticas")


    ///////////////////////////FAVORITOS///////////////////////////////
    Route.get("favoritos/:id_proveedor", "ProveedoresFavoritoController.index")
    Route.post("favoritos/:id_proveedor", "ProveedoresFavoritoController.store")
    Route.get("favoritos", "ProveedoresFavoritoController.misFavoritos")
    Route.get("proveedores_que_me_gustan", "ProveedoresFavoritoController.proveedoresLike")

    ///////////////////////////////////////////NOTIFICACIONES///////////////////////////////////////////////////////////////////
    Route.put("editar_notificacion_cliente", "NotificacionController.update")

    ///////////////////////////////////////////----IMPRESIONES----///////////////////////////////////////////////////////////////////
    Route.post("impressions/:proveedor_id", "ImpressionController.store")

    ///////////////////////////-----BLOGS-----/////////////////////////////////////////////////////////////
    Route.get("blogs", "BlogController.index")
    Route.get("blogs_index", "BlogController.indexAll")
    Route.get("blogs/:id", "BlogController.show")


  }).middleware("auth")
);
