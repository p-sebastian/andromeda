import { ISeriesValue } from './common.interface'

export interface ISeries {
  entities: Entities
  result: number[]
}

interface Entities {
  series: { [key: number]: ISeriesValue }
}
