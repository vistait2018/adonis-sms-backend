import { BaseSchema } from '@adonisjs/lucid/schema'
import Role from '../../app/enums/role_enum.js'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table
        .enum('role_name', [
          Role.SUPER_ADMIN,
          Role.ADMIN,
          Role.HEAD_TEACHER,
          Role.CLASS_TEACHER,
          Role.SUBJECT_TEACHER,
          Role.ACCOUNT_ADMIN,
          Role.BURSAR,
          Role.GUARDIAN,
          Role.STUDENT,
          Role.USER,
        ])
        .notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
