import LoggerService from '#services/config/logger_service'
import type { ApplicationService } from '@adonisjs/core/types'

export default class LoggerServiceProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(LoggerService, () => {
      console.log('LoggerService instantiated only once')
      return new LoggerService()
    })
  }
}
