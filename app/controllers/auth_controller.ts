import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import BaseController from './base_controller.js'

export default class AuthController extends BaseController {
  async register(ctx: HttpContext) {
    const { request } = ctx
    try {
      const data = await request.validateUsing(registerValidator)
      const user = await User.create(data)

      return this.response.success(ctx, User.accessTokens.create(user), 'Registered')
    } catch (error) {
      return this.response.error(ctx, error)
    }
  }

  async login(ctx: HttpContext) {
    const { request } = ctx
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)

      return this.response.success(ctx, User.accessTokens.create(user), 'Connected')
    } catch (error) {
      return this.response.error(ctx, error)
    }
  }

  async logout(ctx: HttpContext) {
    const { auth } = ctx
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return this.response.success(ctx, null, 'Logged out')
  }

  async me(ctx: HttpContext) {
    const { auth } = ctx
    await auth.check()

    return this.response.success(ctx, { user: auth.user }, 'Logged out')
  }
}
