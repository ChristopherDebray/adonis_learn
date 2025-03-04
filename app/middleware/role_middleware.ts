import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn, allowedRoles: string[]) {
    await auth.authenticate()

    const user = auth.user

    if (!user || !allowedRoles.includes(user.role)) {
      return response.unauthorized({ message: 'You do not have access to this resource' })
    }

    await next()
  }
}
