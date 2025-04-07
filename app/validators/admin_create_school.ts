import vine from '@vinejs/vine'
import RoleEnum from '../enums/role_enum.js'

export const AdminCreateSchool = vine.compile(
  vine.object({
    schoolName: vine.string().minLength(5),
    address: vine.string().minLength(10),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const user = await db.from('users').select('id').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
    roleName: vine.enum(Object.values(RoleEnum)),
  })
)
