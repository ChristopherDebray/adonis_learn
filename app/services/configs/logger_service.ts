import { inject } from '@adonisjs/core'
import Logger from '@adonisjs/core/services/logger'
import { type LoggerService as AdonisLoggerServiceType } from '@adonisjs/core/types'
import { HttpContext } from '@adonisjs/core/http'
import { LoggerFlags } from '#enums/configs/logger_flags'

@inject()
export default class LoggerService {
  protected logger: AdonisLoggerServiceType
  constructor() {
    this.logger = Logger
  }

  public info(ctx: HttpContext, message?: string, flag?: LoggerFlags) {
    this.logger.info(this.buildLog(ctx, message, undefined, flag))
  }

  public warn(ctx: HttpContext, message: string, error?: any, flag?: LoggerFlags) {
    this.logger.warn(this.buildLog(ctx, message, error, flag))
  }

  public error(ctx: HttpContext, message: string, error?: any, flag?: LoggerFlags) {
    this.logger.error(this.buildLog(ctx, message, error, flag))
  }

  public security(
    ctx: HttpContext,
    message?: string,
    error?: any,
    flag: LoggerFlags = LoggerFlags.SECURITY
  ) {
    this.logger.error(this.buildLog(ctx, message, error, flag))
  }

  private getContextUserEmail(ctx: HttpContext): string {
    if (ctx.auth.user) {
      return ctx.auth.user.email
    }

    return 'Guest'
  }

  private buildLog(ctx: HttpContext, message?: string, error?: any, flag?: LoggerFlags) {
    return {
      user: this.getContextUserEmail(ctx),
      ip: ctx.request.ip(),
      message,
      error: error ? error.toString() : undefined,
      flag,
    }
  }
}
