
const routes = [
  { path: '/registro', component: () => import('pages/Registro.vue') },
  { path: '/deep_link/:ref', component: () => import('pages/DeepLink.vue') },
  { path: '/registro_cliente', component: () => import('pages/client/RegistroCliente.vue') },
  { path: '/registro_proveedor', component: () => import('pages/RegistroProveedor.vue') },
  { path: '/test', component: () => import('pages/Test.vue') },
  {
    path: '/registro_confirmado',
    component: () => import('pages/client/RegistroConfirmado.vue'),
    meta: { toolbar: false, title: 'Registro Confirmado', footer: true }
  },
  {
    path: '/registro_denegado',
    component: () => import('pages/client/RegistroDenegado.vue'),
    meta: { toolbar: false, title: 'Registro Denegado', footer: true }
  },
  {
    path: '/pago_confirmado',
    component: () => import('pages/client/PagoConfirmado.vue'),
    meta: { toolbar: false, title: 'Pago Confirmado', footer: true }
  },
  {
    path: '/pago_denegado',
    component: () => import('pages/client/PagoDenegado.vue'),
    meta: { toolbar: false, title: 'Pago Denegado', footer: true }
  },
  {
    path: '/verificacion_correo',
    component: () => import('pages/client/VerificacionCorreo.vue'),
    meta: { toolbar: false, title: 'Verificacion Correo', footer: true }
  },
  {
    path: '/verificacion_sms',
    component: () => import('pages/client/VerificacionSms.vue'),
    meta: { toolbar: false, title: 'Verificacion SMS', footer: true }
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    meta: { toolbar: true, title: 'Inicio', footer: true },
    children: [
      {
        path: '/evento/:id',
        component: () => import('pages/client/BuscarProveedores.vue'),
        meta: { toolbar: true, title: 'Organiza tu Evento', footer: true }
      },
      {
        path: '/mensajes/:id',
        component: () => import('pages/client/MensajesClientes.vue'),
        meta: { toolbar: true, title: 'Organiza tu Evento', footer: true }
      },
      {
        path: '/inicio_cliente',
        component: () => import('pages/client/new/Inicio.vue'),
        meta: { toolbar: false, title: 'Mi Evento', footer: true }
      },
      {
        path: '/inicio_cliente/crear_evento',
        component: () => import('pages/client/new/Inicio.vue'),
        meta: { toolbar: false, title: 'Mi Evento', footer: true }
      },
      {
        path: '/mi_evento/:id',
        component: () => import('pages/client/new/Evento.vue'),
        meta: { toolbar: false, title: 'Mi Evento', footer: true }
      },
      {
        path: '/proveedores/:id',
        component: () => import('pages/client/Proveedores.vue'),
        meta: { toolbar: false, title: 'Organiza tu Evento', footer: true, proveedores: true }
      },
      {
        path: '/inicio_proveedor',
        component: () => import('pages/proveedor/Inicio.vue'),
        meta: { toolbar: false, title: 'Hevent', footer: true }
      },
      {
        path: '/perfil_proveedor',
        component: () => import('pages/proveedor/Perfil.vue'),
        meta: { toolbar: false, title: 'Mi Perfil', footer: true }
      },
      {
        path: '/perfil_cliente',
        component: () => import('pages/client/Perfil.vue'),
        meta: { toolbar: false, title: 'Mi Perfil', footer: true }
      },
      {
        path: '/chats_proveedor',
        component: () => import('pages/proveedor/Chats.vue'),
        meta: { toolbar: false, footer: true }
      },
      {
        path: '/chats_clientes',
        component: () => import('pages/proveedor/Chats.vue'),
        meta: { toolbar: false, footer: true }
      },
      {
        path: '/proveedor/:header/:id',
        component: () => import('pages/client/InfoProveedor.vue'),
        meta: { toolbar: false, title: 'Hevent', footer: false }
      },
      {
        path: '/proveedor/:header/:id/:anuncio',
        component: () => import('pages/client/InfoProveedor.vue'),
        meta: { toolbar: false, title: 'Hevent', footer: false }
      },
      {
        path: '/chat/:id',
        component: () => import('pages/client/Chat.vue'),
        meta: { toolbar: false, title: 'Organiza tu Evento', footer: false }
      },
      {
        path: '/aprobacion_cotizacion',
        component: () => import('pages/cotizacion/ListadoAprobacion.vue'),
        meta: { toolbar: false, title: 'Cotizaciones', footer: true }
      },
      {
        path: '/calendario_eventos',
        component: () => import('pages/proveedor/Calendario3.vue'),
        meta: { toolbar: false, title: 'Calendario', footer: true }
      },
      {
        path: '/pagar/:id_event',
        component: () => import('pages/client/Pago.vue'),
        meta: { toolbar: false, title: 'Calendario', footer: false }
      },
      {
        path: '/ver_mas_servicios',
        component: () => import('pages/TiposServicio.vue'),
        meta: { toolbar: false, title: 'Calendario', footer: true }
      },
      {
        path: '/editar_anuncio',
        component: () => import('pages/proveedor/EditarAnuncio.vue'),
        meta: { toolbar: false, title: 'Calendario', footer: true }
      },
      {
        path: '/prueba',
        component: () => import('pages/PruebaVideos.vue'),
        meta: { toolbar: false, title: 'Calendario', footer: false }
      },
      {
        path: '/prueba_pay',
        component: () => import('pages/PruebaPayU.vue'),
        meta: { toolbar: false, title: 'Calendario', footer: false }
      },
      {
        path: '/estadisticas',
        component: () => import('pages/proveedor/Estadisticas.vue'),
        meta: { toolbar: false, title: 'Estadisticas', footer: true }
      },
      {
        path: '/proveedores_me_gustan',
        component: () => import('pages/client/ProveedoresMeGusta.vue'),
        meta: { toolbar: false, title: 'Me Gusta', footer: true }
      },
      {
        path: '/opiniones_proveedor',
        component: () => import('pages/proveedor/Opiniones.vue'),
        meta: { toolbar: false, title: 'Me Gusta', footer: true }
      },
      {
        path: '/eventos_realizados',
        component: () => import('components/cliente/perfil/EventosRealizados.vue'),
        meta: { toolbar: false, title: 'Eventos Realizados', footer: true }
      },
      {
        path: '/blog',
        component: () => import('pages/Blog/List.vue'),
        meta: { toolbar: false, title: 'Eventos Realizados', footer: true }
      },
      {
        path: '/blog/:id',
        component: () => import('pages/Blog/Detalle.vue'),
        meta: { toolbar: false, title: 'Seccion Revista', footer: true }
      },
      {
        path: '/planes_disponibles',
        component: () => import('pages/proveedor/PlanesDisponibles.vue'),
        meta: { toolbar: false, title: 'Seccion Revista', footer: false }
      },
      {
        path: '/planes_disponibles/:proveedor_id',
        component: () => import('pages/proveedor/PlanesDisponibles.vue'),
        meta: { toolbar: false, title: 'Seccion Revista', footer: false }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue')
  },
  {
    path: '/login_cliente',
    component: () => import('pages/client/Login.vue')
  },
  {
    path: '/login_cliente/:code',
    component: () => import('pages/client/Login.vue')
  },
  {
    path: '/login_proveedor',
    component: () => import('pages/proveedor/Login.vue')
  },
  {
    path: '/login_proveedor/referencia_pago/:ref',
    component: () => import('pages/proveedor/Login.vue')
  },
  {
    path: '/login_proveedor/referencia_pago/flow/:reFlow',
    component: () => import('pages/proveedor/Login.vue')
  },
  {
    path: '/login_proveedor/:code',
    component: () => import('pages/proveedor/Login.vue')
  },
  {
    path: '/slider',
    component: () => import('pages/Inicio/Slider.vue')
  },
  {
    path: '/slider_proveedor',
    component: () => import('pages/proveedor/Slider.vue')
  },
  {
    path: '/',
    redirect: '/slider'
  },
  {
    path: '*',
    redirect: '/login_cliente'
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
