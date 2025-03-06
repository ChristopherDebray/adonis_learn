import LoggerService from '#services/configs/logger_service'
import ResponseService from '#services/configs/response_service'
import { inject } from '@adonisjs/core'

@inject()
export default abstract class BaseController {
  constructor(
    protected logger: LoggerService,
    protected response: ResponseService
  ) {}
}
