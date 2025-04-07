import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import School from './school.js'
import Klass from './klass.js'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare schoolId: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare middleName: string

  @column()
  declare dob: string | null

  @column()
  declare gender: string

  @column()
  declare address: string | null

  @column()
  declare phone_no: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => School)
  public school!: relations.BelongsTo<typeof School>

  @hasOne(() => Klass)
  public klass!: relations.HasOne<typeof Klass>
}
