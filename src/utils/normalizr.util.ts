import {
  API_RADARR_GET_MOVIES,
  API_SONARR_GET_CALENDAR,
  API_SONARR_GET_EPISODES,
  API_SONARR_GET_HISTORY,
  API_SONARR_GET_SERIES
} from '@actions/types'
import { groupBy, omit } from 'lodash'
import { normalize, schema } from 'normalizr'

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
  const series = new schema.Entity(
    'series',
    {},
    { idAttribute: entity => entity.tvdbId }
  )
  const images = new schema.Entity(
    'images',
    {},
    {
      idAttribute: (entity, parent) => `${parent.tvdbId}-${entity.coverType}`
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
      processStrategy: entity => {
        entity.tvdbId = entity.series.tvdbId
        return omit(entity, 'series')
      }
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
  const movies = new schema.Entity(
    'movies',
    {},
    { idAttribute: entity => entity.tmdbId }
  )
  const images = new schema.Entity(
    'images',
    {},
    {
      idAttribute: (entity, parent) => `${parent.tmdbId}-${entity.coverType}`
    }
  )
  movies.define({
    images: [images]
  })
  return normalize(json, [movies])
}
