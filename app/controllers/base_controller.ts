import LoggerService from '#services/config/logger_service'
import ResponseService from '#services/config/response_service'
import { inject } from '@adonisjs/core'

@inject()
export default abstract class BaseController {
  constructor(
    protected logger: LoggerService,
    protected response: ResponseService
  ) {}
}
