import { ResponseStatusType } from '#contracts/config/response_status_type'
import { ResponseStatuses } from '#enums/config/response_statuses'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'

export default class ResponseService {
  public success(
    ctx: HttpContext,
    data: any,
    message: string = 'Request successful.',
    statusCode: ResponseStatusType = ResponseStatus.BadRequest
  ) {
    return ctx.response.status(statusCode).send({
      status: ResponseStatuses.SUCCESS,
      data,
      errors: null,
      message,
      code: null,
    })
  }

  public error(
    ctx: HttpContext,
    error: any,
    statusCode: ResponseStatusType = ResponseStatus.BadRequest
  ) {
    return ctx.response.status(statusCode).send({
      status: ResponseStatuses.ERROR,
      data: null,
      errors: error.messages,
      message: error.message,
      code: error.code,
    })
  }
}
