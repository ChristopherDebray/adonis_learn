import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRoles } from '#enums/users/user_roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('first_name')
      table.string('last_name')
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.enum('role', Object.values(UserRoles)).defaultTo(UserRoles.OPERATOR).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
