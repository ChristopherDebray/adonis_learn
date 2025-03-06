import factory from '@adonisjs/lucid/factories'
import User from '#models/user/user'
import { UserRoles } from '#enums/users/user_roles'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: UserRoles.OPERATOR,
    }
  })
  .state('superadmin', (user) => (user.role = UserRoles.SUPERADMIN))
  .state('admin', (user) => (user.role = UserRoles.ADMIN))
  .state('supervisor', (user) => (user.role = UserRoles.SUPERVISOR))
  .state('operator', (user) => (user.role = UserRoles.OPERATOR))
  .build()
