import type { HttpContext } from '@adonisjs/core/http'

import YearResponse from '#models/dto/year_response'
import Year from '#models/year'
import { CreateYearValidator } from '#validators/year'
import RoleEnum from '../enums/role_enum.js'
import TermEnum from '../enums/term_enums.js'
import TermMonitor from '../enums/term_monitor_enum.js'

export default class YearsController {
  async startNewYear({ response, request, auth }: HttpContext) {
    try {
      const validatedData = await request.validateUsing(CreateYearValidator)
      const data = { ...validatedData }
      if (auth.user?.roleId !== RoleEnum.SUPER_ADMIN) {
        return response.status(401).json({
          message: 'Unauthorised',
          data: null,
          statusCode: 401,
          status: false,
        })
      }
      data.status = true
      const checkIfYearExistATAll = await Year.all()
      if (checkIfYearExistATAll.length < 1) {
        const createdYear = await Year.create(data)
      
        return response.status(200).json({
          message: 'New Session created',
          data: YearResponse.transform(createdYear),
          statusCode: 200,
          status: true,
        })
      }
      const year = await Year.query()
        .whereNot('term', TermEnum.THIRD) // term is NOT 3
        .where('status', true) // status is TRUE
        .where('termMonitor', TermMonitor.THIRD_TERM_ENDED) // termMonitor is 1, 3, or 5
        .first()
      // console.log(year)
      if (year !== null) {
        const createdYear = await Year.create(data)
        return response.status(200).json({
          message: 'New Session created',
          data: YearResponse.transform(createdYear),
          statusCode: 200,
          status: true,
        })
      }

      return response.status(400).json({
        message:
          'New Session could not be created. You need to end the third term to start a new session',
        data: null,
        statusCode: 400,
        status: false,
      })
    } catch (error) {
      if (error?.status === 422) {
        return response.status(422).json({
          message: `Validation Error`,
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
