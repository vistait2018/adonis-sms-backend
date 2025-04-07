import RoleResponse from './role_response.js'
import SchoolResponse from './school_response.js'
import UserResponse from './user_response.js'

export default class AdminCreateSchoolResponse {
  id: number
  school_name: string
  address: string
  phone_no: string
  schoolEmail: string
  motto: string
  vision: string
  mission: string
  latitude: string
  longitude: string
  year_established: string
  createdAt: string
  updatedAt: String
  userInfo: UserResponse
  roleInfo: RoleResponse

  constructor(schoolInfo: SchoolResponse, userInfo: UserResponse, roleInfo: RoleResponse) {
    this.id = schoolInfo.id
    this.createdAt = schoolInfo.createdAt
    this.updatedAt = schoolInfo.updatedAt
    this.address = schoolInfo.address
    this.latitude = schoolInfo.latitude
    this.longitude = schoolInfo.longitude
    this.mission = schoolInfo.mission
    this.vision = schoolInfo.vision
    this.phone_no = schoolInfo.phone_no
    this.school_name = schoolInfo.school_name
    this.schoolEmail = schoolInfo.schoolEmail
    this.year_established = schoolInfo.year_established
    this.motto = schoolInfo.motto
    this.userInfo = userInfo
    this.roleInfo = roleInfo
  }

  public static transform(school: any, user: any, role: any) {
    const userInfo = new UserResponse(user) // Assuming UserResponse takes a user object
    const roleInfo = new RoleResponse(role) // Assuming RoleResponse takes a role object
    const schoolInfo = new SchoolResponse(school)
    return new AdminCreateSchoolResponse(schoolInfo, userInfo, roleInfo)
  }
}
