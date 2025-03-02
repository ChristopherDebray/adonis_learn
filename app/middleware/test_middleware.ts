import { HttpContext } from '@adonisjs/core/http'

export default class TestMiddleware {
  async handle(ctx: HttpContext) {
    // send response + do not call next
    ctx.response.send({
      status: 401,
      message: 'Ending request',
    })
  }
}
