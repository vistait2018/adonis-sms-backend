/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import YearsController from '#controllers/years_controller'
const HealthChecksController = () => import('#controllers/health_checks_controller')

router.get('/health', [HealthChecksController])

router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.get('/me', [AuthController, 'me']).as('auth.me')
router
  .group(() => {
    router.delete('/logout', [AuthController, 'logout']).as('auth.logout')
    router.post('admin/create-school', [AuthController, 'createSchool']).as('admin.create.school')
    router.post('admin/lock-user/:id', [AuthController, 'lockUser']).as('admin.lock.user')
    router.post('admin/unlock-user/:id', [AuthController, 'unlockUser']).as('admin.unlock.user')
    router.post('admin/start-session', [YearsController, 'startNewYear']).as('admin.start.year')
  })
  .use(middleware.auth())
router.get('/', async () => {
  return {
    hello: 'world',
  }
})
