import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  protected context(ctx: HttpContext) {
    return {
      requestId: ctx.request.id(),
      userId: ctx.auth.user?.id,
      ip: ctx.request.ip(),
    }
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    return super.handle(error, ctx)

    /**
     * @todo check the behavior of adonis error handler to replace it or not
     *
     * this.logger.error(ctx, error.message, error) // Log the error
     *
     * return this.responseService.error(ctx, error, error.status || 500)
     */
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
