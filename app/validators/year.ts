import vine from '@vinejs/vine'
import TermEnum from '../enums/term_enums.js'
import TermMonitor from '../enums/term_monitor_enum.js'

export const CreateYearValidator = vine.compile(
  vine.object({
    yearStarts: vine
      .number()
      .min(new Date().getFullYear()) // Must be at least the current year
      .max(new Date().getFullYear()), // Must not exceed the current year

    yearEnds: vine
      .number()
      .min(new Date().getFullYear() + 1) // Must be exactly one year after yearStarts
      .max(new Date().getFullYear() + 1),
    term: vine.enum(Object.values(TermEnum)),
    termMonitor: vine.enum(Object.values(TermMonitor)),
    status: vine.boolean(),
  })
)
