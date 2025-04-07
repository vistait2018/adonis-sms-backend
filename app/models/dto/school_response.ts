export default class SchoolResponse {
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

  constructor(school: any) {
    this.id = school.id
    this.school_name = school.schoolName
    this.schoolEmail = school.email
    this.address = school.address
    this.latitude = school.latitude
    this.longitude = school.longitude
    this.mission = school.mission
    this.vision = school.vision
    this.phone_no = school.phone_no
    this.year_established = school.year_established
    this.motto = school.motto
    this.createdAt = school.createdAt
    this.updatedAt = school.updatedAt
  }
}
