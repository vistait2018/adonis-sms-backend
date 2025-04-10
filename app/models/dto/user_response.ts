export default class UserResponse {
  id: number
  email: string
  createdAt: string
  updatedAt: String
  isLocked: boolean
  schoolId: number
  roleId: number
  constructor(user: any) {
    this.id = user.id
    this.email = user.email
    this.createdAt = user.createdAt
    this.schoolId = user.schoolId
    this.isLocked = user.isLocked
    this.updatedAt = user.updatedAt
    this.roleId = user.roleId
  }
}
