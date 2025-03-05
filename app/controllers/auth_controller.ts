import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import BaseController from './base_controller.js'
import { LoggerFlags } from '#enums/config/logger_flags'

export default class AuthController extends BaseController {
  async register(ctx: HttpContext) {
    try {
      const { request } = ctx
      const data = await request.validateUsing(registerValidator)
      const user = await User.create(data)
      this.logger.info(ctx, 'user register', LoggerFlags.BUSINESS_EVENT)

      return this.response.success(ctx, User.accessTokens.create(user), 'Registered')
    } catch (error) {
      this.logger.error(ctx, 'Register failled')

      return this.response.error(ctx, error)
    }
  }

  async login(ctx: HttpContext) {
    try {
      const { request } = ctx
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      this.logger.info(ctx, `${user.email} user log in`)

      return this.response.success(ctx, User.accessTokens.create(user), 'Connected')
    } catch (error) {
      this.logger.error(ctx, 'Login failled')

      return this.response.error(ctx, error)
    }
  }

  async logout(ctx: HttpContext) {
    try {
      const { auth } = ctx
      const user = auth.user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      return this.response.success(ctx, null, 'Logged out')
    } catch (error) {
      this.logger.error(ctx, 'Logout failled')
      return this.response.error(ctx, error)
    }
  }

  async me(ctx: HttpContext) {
    try {
      const { auth } = ctx
      await auth.check()

      return this.response.success(ctx, { user: auth.user }, 'Logged out')
    } catch (error) {
      this.logger.error(ctx, 'User detail failled')

      return this.response.error(ctx, error)
    }
  }
}
