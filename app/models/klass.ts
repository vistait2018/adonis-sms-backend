import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import School from './school.js'
import Department from './department.js'

export default class Klass extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare schoolId: number

  @column()
  declare klassName: string

  @column()
  declare departmentId: number

  @column()
  declare teacherId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => School)
  public school!: relations.BelongsTo<typeof School>

  @hasOne(() => Department)
  public department!: relations.HasOne<typeof Department>

  @belongsTo(() => Klass)
  public klass!: relations.BelongsTo<typeof Klass>
}
