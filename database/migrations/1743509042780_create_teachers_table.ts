import { BaseSchema } from '@adonisjs/lucid/schema'
import convertToString from '../../app/enums/enum_converter.js'
import Gender from '../../app/enums/gender_enums.js'

export default class extends BaseSchema {
  protected tableName = 'teachers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('school_id').unsigned().references('schools.id').nullable()
      table.string('first_name', 100).notNullable()
      table.string('last_name', 100).notNullable()
      table.string('middle_name', 100).nullable()
      table.string('dob', 11).nullable()
      table.enum('gender', [Gender.MALE, Gender.FEMALE]).notNullable()
      table.string('address').nullable()
      table.string('phone_no').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
