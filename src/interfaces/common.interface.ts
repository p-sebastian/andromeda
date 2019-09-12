type Keys = number | string
export type IEntity<T> = { [k in Keys]: T }
export type TImage = IEntity<IImageValue>
export type TNrmlzResponse<Name extends string> = {
  entities: { [key in Name]: any }
  result: []
}

export interface IImageValue {
  coverType: CoverTypeEnum
  url: string
}

export interface IRatings {
  votes: number
  value: number
}

export interface ISeason {
  seasonNumber: number
  monitored: boolean
  statistics?: Statistics
}
interface Statistics {
  episodeFileCount: number
  episodeCount: number
  totalEpisodeCount: number
  sizeOnDisk: number
  percentOfEpisodes: number
  nextAiring?: Date
  previousAiring?: Date
}
export enum SeriesTypeEnum {
  Anime = 'anime',
  Standard = 'standard',
  Daily = 'daily'
}
enum CoverTypeEnum {
  Banner = 'banner',
  Fanart = 'fanart',
  Poster = 'poster'
}

interface AlternateTitle {
  title: string
  sceneSeasonNumber: number
}
enum Status {
  Continuing = 'continuing',
  Ended = 'ended'
}
export interface ISeriesValue {
  title: string
  alternateTitles?: AlternateTitle[]
  sortTitle: string
  seasonCount: number
  totalEpisodeCount?: number
  episodeCount?: number
  episodeFileCount?: number
  sizeOnDisk?: number
  status: Status
  overview: string
  nextAiring?: Date
  previousAiring?: Date
  network: string
  airTime?: string
  images: TImage[]
  seasons: ISeason[]
  year: number
  path: string
  profileId: number
  seasonFolder: boolean
  monitored: boolean
  useSceneNumbering: boolean
  runtime: number
  tvdbId: number
  tvRageId: number
  tvMazeId: number
  firstAired: Date
  lastInfoSync: Date
  seriesType: string
  cleanTitle: string
  imdbId: string
  titleSlug: string
  genres: string[]
  tags: number[]
  added: Date
  ratings: IRatings
  qualityProfileId: number
  id: number
}
export interface IQuality {
  quality: {
    id: number
    name: string
    source: string
    resolution: number
  }
  revision: {
    version: number
    real: number
  }
}
