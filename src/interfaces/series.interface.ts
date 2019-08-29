import { ISeriesValue } from './common.interface'

export interface ISeries {
  entities: Entities | undefined
  result: number[]
}

interface Entities {
  series: { [key: number]: ISeriesValue }
}
