/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

export const throttle = limiter.define('global', () => {
  if (process.env.NODE_ENV === 'test') {
    // Mandatory to avoid typing errors
    return limiter.allowRequests(Infinity).every('1 minute')
  }
  return limiter.allowRequests(15).every('1 minute')
})
