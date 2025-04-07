import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import * as relations from '@adonisjs/lucid/types/relations'
import Subject from './subject.js'

export default class Department extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare departmentName: string

  @column()
  declare categoryId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Category)
  public category!: relations.BelongsTo<typeof Category>

  @manyToMany(() => Subject, {
    pivotTable: 'department_subjects',
    pivotTimestamps: true,
  })
  public subjects!: relations.ManyToMany<typeof Subject>
}
