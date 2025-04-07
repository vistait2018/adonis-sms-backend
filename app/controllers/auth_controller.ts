import User from '#models/user'
import { AdminCreateSchool } from '#validators/admin_create_school'
import { LoginValidator, RegisterValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'
import RoleEnum from '../enums/role_enum.js'
import School from '#models/school'

import Role from '#models/role'
import AdminCreateSchoolResponse from '#models/dto/admin_create_school_response'
import UserResponse from '#models/dto/user_response'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(RegisterValidator)
    try {
      const user = await User.create(data)
      return response.status(201).json({
        message: 'User Registerd',
        data: user,
        statusCode: 201,
        status: false,
      })
    } catch (error) {
      return response.status(401).json({
        message: 'Bad Request',
        statusCode: 401,
        status: false,
      })
    }
  }
  async login({ request, response, logger }: HttpContext) {
    try {
      logger.info('Validating credentials')
      const { email, password } = await request.validateUsing(LoginValidator)
      logger.info('Credentials validated')
      const userExists = await User.findBy('email', email)

      if (!userExists) {
        return response.status(401).json({
          message: 'Invalid email or password',
          data: null,
          statusCode: 401,
          status: false,
        })
      }
      // Verify user credentials
      const user = await User.verifyCredentials(email, password)
      // Generate authentication token
      const token = await User.accessTokens.create(user, ['*'], {
        expiresIn: '30 days',
      })

      logger.info(`Token generated: ${token}`)

      return response.status(200).json({
        message: 'Login successful',
        token: token,
        statusCode: 200,
        status: true,
      })
    } catch (error) {
      logger.error(error.message)
      return response.status(401).json({
        message: 'Bad Request',
        statusCode: 401,
        status: false,
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.user!

      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return response.status(200).json({
        message: 'Logout successful',
        data: null,
        statusCode: 200,
        status: true,
      })
    } catch (error) {
      return response.status(500).json({
        message: `Error during logout ${error}`,
        statusCode: 500,
        status: false,
      })
    }
  }

  async me({ auth, response }: HttpContext) {
    try {
      // Check if the user is authenticated
      if (await auth.check()) {
        return response.status(200).json({
          message: 'Your info retrieved successfully',
          data: auth.user,
          statusCode: 200,
          status: true,
        })
      }

      return response.status(401).json({
        message: 'You are not logged in',
        data: null,
        statusCode: 401,
        status: false,
      })
    } catch (ex) {
      return response.status(500).json({
        message: 'Internal server error',
        error: ex.message,
        statusCode: 500,
        status: false,
      })
    }
  }

  async createSchool({ request, response }: HttpContext) {
    try {
      const validatedData = await request.validateUsing(AdminCreateSchool)
      const data = { ...validatedData }

      const school = await School.create({
        schoolName: data.schoolName,
        address: data.address,
      })
      let user = null
      if (school) {
        user = await User.create({
          email: data.email,
          password: data.password,
          isLocked: true,
          schoolId: school.id,
          roleId: RoleEnum.ADMIN,
        })
      }

      if (!user && school) {
        const newSchool = await School.find(school.id)
        await newSchool?.delete()
      }

      const role = await Role.find(user?.roleId)

      const responseData = AdminCreateSchoolResponse.transform(school, user, role)
      return response.status(200).json({
        message: 'School Created successfully user created successfully',
        data: responseData,
        statusCode: 200,
        status: true,
      })
    } catch (error) {
      if (error?.status === 422) {
        return response.status(422).json({
          message: 'Validation failed',
          data: error.messages,
          statusCode: 422,
          status: false,
        })
      }
      return response.status(500).json({
        message: 'Internal Server error',
        data: null,
        statusCode: 500,
        status: false,
      })
    }
  }

  async lockUser({ auth, response, params }: HttpContext) {
    try {
      const loggedInUser = auth.user?.roleId

      if (!(loggedInUser === RoleEnum.SUPER_ADMIN || loggedInUser === RoleEnum.ADMIN)) {
        return response.status(401).json({
          message: 'You are not authorized to carry out such action',
          data: null,
          statusCode: 401,
          status: false,
        })
      }
      const userToDisable = await User.find(params.id)
      if (userToDisable?.roleId === 1) {
        return response.status(401).json({
          message: 'You are not authorized to carry out such action',
          data: null,
          statusCode: 401,
          status: false,
        })
      }
      if (!userToDisable) {
        return response.status(404).json({
          message: `user with id ${params.id} not found`,
          data: null,
          statusCode: 404,
          status: false,
        })
      }

      if (userToDisable.isLocked) {
        return response.status(404).json({
          message: `user with id ${params.id} is locked already`,
          data: null,
          statusCode: 404,
          status: false,
        })
      }
      userToDisable.isLocked = true
      const savedUser = await userToDisable.save()
      const userResponse = new UserResponse(savedUser)

      return response.status(200).json({
        message: 'User locked successfully',
        data: userResponse,
        statusCode: 200,
        status: true,
      })
    } catch (error) {
      if (error?.status === 404) {
        return response.status(404).json({
          message: `user with id ${params.id} not found`,
          data: error.messages,
          statusCode: 404,
          status: false,
        })
      }
      return response.status(500).json({
        message: 'Internal Server error',
        data: null,
        statusCode: 500,
        status: false,
      })
    }
  }

  async unlockUser({ auth, response, params }: HttpContext) {
    try {
      const loggedInUser = auth.user?.roleId

      if (!(loggedInUser === RoleEnum.SUPER_ADMIN || loggedInUser === RoleEnum.ADMIN)) {
        return response.status(401).json({
          message: 'You are not authorized to carry out such action',
          data: null,
          statusCode: 401,
          status: false,
        })
      }
      const userToDisable = await User.find(params.id)
      if (userToDisable?.roleId === 1) {
        return response.status(401).json({
          message: 'You are not authorized to carry out such action',
          data: null,
          statusCode: 401,
          status: false,
        })
      }
      if (!userToDisable) {
        return response.status(404).json({
          message: `user with id ${params.id} not found`,
          data: null,
          statusCode: 404,
          status: false,
        })
      }

      if (!userToDisable.isLocked) {
        return response.status(404).json({
          message: `user with id ${params.id} is unlocked already`,
          data: null,
          statusCode: 404,
          status: false,
        })
      }
      userToDisable.isLocked = false
      const savedUser = await userToDisable.save()
      const userResponse = new UserResponse(savedUser)

      return response.status(200).json({
        message: 'User unlocked successfully',
        data: userResponse,
        statusCode: 200,
        status: true,
      })
    } catch (error) {
      if (error?.status === 404) {
        return response.status(404).json({
          message: `user with id ${params.id} not found`,
          data: error.messages,
          statusCode: 404,
          status: false,
        })
      }
      return response.status(500).json({
        message: 'Internal Server error',
        data: null,
        statusCode: 500,
        status: false,
      })
    }
  }
}
