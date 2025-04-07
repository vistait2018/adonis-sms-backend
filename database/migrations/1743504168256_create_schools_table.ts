import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'schools'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').notNullable()
      table.string('school_name', 150).notNullable()
      table.string('address').notNullable()
      table.string('phone_no').nullable()
      table.string('email', 150).unique()
      table.string('motto').nullable()
      table.text('vision').nullable()
      table.text('mission').nullable()
      table.string('latitude').nullable()
      table.string('longitude').nullable()
      table.string('year_established', 11).nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
