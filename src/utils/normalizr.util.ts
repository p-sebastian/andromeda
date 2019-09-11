import { normalize, schema } from 'normalizr'
import {
  API_SONARR_GET_CALENDAR,
  API_SONARR_GET_SERIES,
  API_SONARR_GET_EPISODES,
  API_SONARR_GET_HISTORY,
  API_RADARR_GET_MOVIES
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
    case API_SONARR_GET_HISTORY:
      return sonarrGetHistory(json)
    case API_RADARR_GET_MOVIES:
      return radarrGetMovies(json)
    default:
      return json
  }
}

/* SONARR */
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
const sonarrGetHistory = (json: { records: any[] }) => {
  const history = new schema.Entity('history')
  return normalize(json.records, [history])
}

/* RADARR */
const radarrGetMovies = (json: any) => {
  const movies = new schema.Entity('movies')
  const images = new schema.Entity(
    'images',
    {},
    {
      idAttribute: (entity, parent) => `${parent.id}-${entity.coverType}`
    }
  )
  movies.define({
    images: [images]
  })
  return normalize(json, [movies])
}
