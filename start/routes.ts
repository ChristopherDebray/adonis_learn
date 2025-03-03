/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

const AuthController = () => import('#controllers/auth_controller')

router.where('id', router.matchers.number())

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'world !',
      }
    })

    router.get('/test/:id?', async ({ params }) => {
      if (params.id) {
        return {
          test: params.id,
        }
      }

      return {
        test: 'no id',
      }
    })
    /*
    This is part of Inbuilt matchers like :
    router.matchers.uuid()
    router.matchers.slug()
    
    We can also define customs
    
    .where('id', {
      match: /^[0-9]+$/,
      cast: (value) => Number(value),
    })
    */

    router
      .get('middleware', () => {
        return {
          message: 'hi',
        }
      })
      .use(middleware.test())

    // Swagger Docs Routes - Only Available in Local Environment
    router.get('/swagger', async () => {
      return AutoSwagger.default.docs(router.toJSON(), swagger)
    })

    router.get('/docs', async () => {
      return AutoSwagger.default.ui('/api/swagger', swagger)
      // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
      // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
    })

    router.post('/register', [AuthController, 'register']).as('auth.register')
    router.post('/login', [AuthController, 'login']).as('auth.login')
    // This middleware check if user is connected and populates the auth parameter
    router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
    router.get('/me', [AuthController, 'me']).as('auth.me')
  })
  .prefix('api')
