import { PUBLIC_ROUTES } from './src/config/site.js'

export default {
  appDirectory: 'src',
  buildDirectory: 'build',
  ssr: false,
  prerender: [...PUBLIC_ROUTES, '/404'],
}
