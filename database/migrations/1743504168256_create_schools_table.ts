import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'schools'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('school_name', 150).notNullable()
      table.string('address').notNullable()
      table.string('phone_no')
      table.string('email', 150).unique()
      table.string('motto').notNullable()
      table.text('vision')
      table.text('mission')
      table.string('latitude')
      table.string('longitude')
      table.string('year_established', 11)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
