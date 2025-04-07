import Role from '#models/role'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RoleEnum from '../../app/enums/role_enum.js'

export default class extends BaseSeeder {
  async run() {
    const user = await User.create({
      email: 'super@test.com',
      password: process.env.SUPER_ADMIN_PASSWORD || 'password',
      isLocked: false,
    })

    // Use for...of instead of forEach()
    for (const [value] of Object.entries(RoleEnum)) {
      await Role.create({
        roleName: value, // Stores "1 to 10"
      })

      if (value === '10') {
        console.log('WOrking on the last Role')
        break
      }
      console.log(`Role : ${value}`)
    }

    // Assign role AFTER ensuring roles are created
    const superAdmin = await Role.findBy('roleName', '1')
    if (superAdmin) {
      user.roleId = superAdmin.id
      await user.save()
      console.log('Super admin user created successfully!')
    } else {
      console.error('Role SUPER_ADMIN not found!')
    }

    console.log('Super admin user created successfully!')
  }
}
