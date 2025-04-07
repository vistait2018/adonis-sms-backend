import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'department_subjects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('department_id').unsigned().references('departments.id').notNullable()
      table.bigInteger('subject_id').unsigned().references('subjects.id').notNullable()
      table.unique(['department_id', 'subject_id'])
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
