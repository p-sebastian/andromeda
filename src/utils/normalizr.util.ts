import { normalize, schema } from 'normalizr'
import { API_SONARR_GET_CALENDAR, API_SONARR_GET_SERIES } from '@actions/types'
import { logger } from './logger.util'

// constant => AjaxResponse => normalizedRes
type Nrmlzr = (CONSTANT: string, json: any) => any
export const nrmlz: Nrmlzr = (CONSTANT, json) => {
  switch (CONSTANT) {
    case API_SONARR_GET_SERIES:
      return sonarrGetSeries(json)
    case API_SONARR_GET_CALENDAR:
      return sonarrGetCalendar(json)
    default:
      return json
  }
}

const sonarrGetSeries = (json: any) => {
  const series = new schema.Entity('series')
  const normal = normalize(json, [series])
  return normal
}

const sonarrGetCalendar = (json: any) => {
  const calendar = new schema.Entity('calendar')
  return normalize(json, [calendar])
}
