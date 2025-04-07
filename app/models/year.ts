import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import TermMonitor from '../enums/term_monitor_enum.js'
import TermEnum from '../enums/term_enums.js'

export default class Year extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare termMonitor: string | TermMonitor

  @column()
  declare yearStarts: number

  @column()
  declare yearEnds: number

  @column()
  declare term: string | TermEnum

  @column()
  declare status: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
