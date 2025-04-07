import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'klasses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('school_id').unsigned().references('schools.id').nullable()
      table.string('klass_name', 100).notNullable()
      table.bigInteger('teacher_id').unsigned().references('teachers.id').nullable()
      table.bigInteger('department_id').unsigned().references('departments.id').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
