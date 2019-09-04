import { normalize, schema } from 'normalizr'
import {
  API_SONARR_GET_CALENDAR,
  API_SONARR_GET_SERIES,
  API_SONARR_GET_EPISODES
} from '@actions/types'
import { omit, groupBy } from 'lodash'
import { logger } from './logger.util'

// constant => AjaxResponse => normalizedRes
type Nrmlzr = (CONSTANT: string, json: any) => any
export const nrmlz: Nrmlzr = (CONSTANT, json) => {
  switch (CONSTANT) {
    case API_SONARR_GET_SERIES:
      return sonarrGetSeries(json)
    case API_SONARR_GET_CALENDAR:
      return sonarrGetCalendar(json)
    case API_SONARR_GET_EPISODES:
      return sonarrGetEpisodes(json)
    default:
      return json
  }
}

const sonarrGetSeries = (json: any) => {
  const series = new schema.Entity('series')
  const images = new schema.Entity(
    'images',
    {},
    {
      idAttribute: (entity, parent) => `${parent.id}-${entity.coverType}`
    }
  )
  series.define({
    images: [images]
  })
  const normal = normalize(json, [series])
  return normal
}

const sonarrGetCalendar = (json: any) => {
  const calendar = new schema.Entity(
    'calendar',
    {},
    {
      processStrategy: entity => omit(entity, 'series')
    }
  )
  return normalize(json, [calendar])
}

const sonarrGetEpisodes = (json: any) => {
  return groupBy(json, v => v.seasonNumber)
}
