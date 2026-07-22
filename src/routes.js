import { index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.jsx'),
  route('nosotros', 'routes/nosotros.jsx'),
  route('wmu', 'routes/wmu.jsx'),
  route('wmu-especificaciones', 'routes/wmu-especificaciones.jsx'),
  route('wmu-cero', 'routes/wmu-cero.jsx'),
  route('wmu-cero-2', 'routes/wmu-cero-2.jsx'),
  route('wmu-campo', 'routes/wmu-campo.jsx'),
  route('wmu-aldea', 'routes/wmu-aldea.jsx'),
  route('wmu-sauce', 'routes/wmu-sauce.jsx'),
  route('privacidad', 'routes/privacidad.jsx'),
  route('terminos', 'routes/terminos.jsx'),
  route('sostenibilidad', 'routes/sostenibilidad.jsx'),
  route('servicios', 'routes/servicios.jsx'),
  route('steel-frame-parana', 'routes/steel-frame-parana.jsx'),
  route('404', 'routes/not-found.jsx'),
  route('*', 'routes/catch-all.jsx'),
]
