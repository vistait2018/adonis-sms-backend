import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Student from './student.js'
import Guardian from './guardian.js'
import Teacher from './teacher.js'
import Klass from './klass.js'
import Category from './category.js'

export default class School extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare schoolName: string

  @column()
  declare address: string

  @column()
  declare phoneNo: string | null

  @column()
  declare email: string | null

  @column()
  declare motto: string | null

  @column()
  declare vision: string | null

  @column()
  declare longitude: string | null

  @column()
  declare latitude: string | null

  @column()
  declare mission: string | null

  @column()
  declare yearEstablished: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => User)
  public users!: relations.HasMany<typeof User>

  @hasMany(() => Student)
  public students!: relations.HasMany<typeof Student>

  @hasMany(() => Guardian)
  public guardians!: relations.HasMany<typeof Guardian>

  @hasMany(() => Teacher)
  public teachers!: relations.HasMany<typeof Teacher>

  @hasMany(() => Klass)
  public klasses!: relations.HasMany<typeof Klass>

  @hasMany(() => Category)
  public categories!: relations.HasMany<typeof Category>
}
