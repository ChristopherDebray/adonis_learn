/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

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
  })
  .prefix('api')
