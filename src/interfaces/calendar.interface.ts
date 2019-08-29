import { ISeriesValue } from './common.interface'

export interface ICalendar {
  entities: Entities | null
  result: number[]
}

interface Entities {
  calendar: { [key: string]: CalendarValue }
}

interface CalendarValue {
  seriesId: number
  episodeFileId: number
  seasonNumber: number
  episodeNumber: number
  title: string
  airDate: Date
  airDateUtc: Date
  hasFile: boolean
  monitored: boolean
  absoluteEpisodeNumber?: number
  sceneAbsoluteEpisodeNumber?: number
  sceneEpisodeNumber?: number
  sceneSeasonNumber?: number
  unverifiedSceneNumbering: boolean
  series: ISeriesValue
  id: number
  overview?: string
  episodeFile?: EpisodeFile
  lastSearchTime?: Date
}

interface EpisodeFile {
  seriesId: number
  seasonNumber: number
  relativePath: string
  path: string
  size: number
  dateAdded: Date
  sceneName: string
  quality: EpisodeFileQuality
  mediaInfo: MediaInfo
  originalFilePath: string
  qualityCutoffNotMet: boolean
  id: number
}

interface MediaInfo {
  audioChannels: number
  audioCodec: string
  videoCodec: string
}

interface EpisodeFileQuality {
  quality: Quality
  revision: Revision
}

interface Quality {
  id: number
  name: string
  source: string
  resolution: number
}

interface Revision {
  version: number
  real: number
}
