import TermEnum from '../../enums/term_enums.js'
import TermMonitor from '../../enums/term_monitor_enum.js'

export default class YearResponse {
  id: number
  yearStarts: number
  yearEnds: number
  term: string
  termMonitor: string
  status: boolean
  yearName: string

  constructor(year: any) {
    ;(this.id = year.id),
      (this.yearStarts = year.yearStarts),
      (this.yearEnds = year.yearEnds),
      (this.term = year.term),
      (this.termMonitor = year.termMonitor),
      (this.status = year.status),
      (this.yearName = `${year.yearStarts}/${year.yearEnds}`)
  }

  public static transform(year: any) {
    return new YearResponse(year)
  }
}
