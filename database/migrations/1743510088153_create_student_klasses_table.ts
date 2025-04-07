import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'student_klasses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('year_id').unsigned().references('years.id').notNullable()
      table.bigInteger('student_id').unsigned().references('students.id').notNullable()
      table.bigInteger('klass_id').unsigned().references('klasses.id').notNullable()
      table.unique(['year_id', 'student_id'])
      table.boolean('status').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
