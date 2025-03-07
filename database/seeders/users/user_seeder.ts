import { UserFactory } from '#database/factories/users/user_factory'
import { UserRoles } from '#enums/users/user_roles'
import User from '#models/user/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public defaultPassword = 'password'

  async run() {
    await User.createMany([
      {
        email: 'superadmin@gmail.com',
        firstName: 'superadmin',
        lastName: 'superadmin',
        password: this.defaultPassword,
        role: UserRoles.SUPERADMIN,
      },
      {
        email: 'admin@gmail.com',
        firstName: 'admin',
        lastName: 'admin',
        password: this.defaultPassword,
        role: UserRoles.ADMIN,
      },
      {
        email: 'supervisor@gmail.com',
        firstName: 'supervisor',
        lastName: 'supervisor',
        password: this.defaultPassword,
        role: UserRoles.SUPERVISOR,
      },
      {
        email: 'operator@gmail.com',
        firstName: 'operator',
        lastName: 'operator',
        password: this.defaultPassword,
        role: UserRoles.OPERATOR,
      },
    ])

    await UserFactory.createMany(5)
  }
}
