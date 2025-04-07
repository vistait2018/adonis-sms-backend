import { BaseSchema } from '@adonisjs/lucid/schema'
import CategoryType from '../../app/enums/category_enums.js'


export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.bigInteger('school_id').unsigned().references('schools.id').nullable()
      table.enum('category_name', [CategoryType.PRIMARY, CategoryType.SECONDARY]).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
