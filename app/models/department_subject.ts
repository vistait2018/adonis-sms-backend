import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class DepartmentSubject extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare deparmentId: number

  @column()
  declare subjectId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
