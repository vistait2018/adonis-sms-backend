import { BaseSchema } from '@adonisjs/lucid/schema'
import Term from '../../app/enums/term_enums.js'
import TermMonitor from '../../app/enums/term_monitor_enum.js'
import TermEnum from '../../app/enums/term_enums.js'

export default class extends BaseSchema {
  protected tableName = 'years'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('year_starts', 4).notNullable().unique()
      table.string('year_ends', 4).notNullable().unique()
      table.enum('term', [TermEnum.FIRST, TermEnum.SECOND, TermEnum.THIRD]).notNullable()
      table
        .enum('term_monitor', [
          TermMonitor.FIRST_TERM_STARTED,
          TermMonitor.FIRST_TERM_ENDED,
          TermMonitor.SECOND_TERM_STARTED,
          TermMonitor.SECOND_TERM_ENDED,
          TermMonitor.THIRD_TERM_STARTED,
          TermMonitor.THIRD_TERM_ENDED,
        ])
        .notNullable()
      table.boolean('status').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
