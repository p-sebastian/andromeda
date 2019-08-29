export interface ISeries {
  entities: Entities | null
  result: number[]
}

interface Entities {
  series: { [key: string]: SeriesValue }
}

interface SeriesValue {
  title: string
  alternateTitles: AlternateTitle[]
  sortTitle: string
  seasonCount: number
  totalEpisodeCount: number
  episodeCount: number
  episodeFileCount: number
  sizeOnDisk: number
  status: string
  overview: string
  nextAiring?: Date
  previousAiring: Date
  network: string
  airTime?: string
  images: Image[]
  seasons: Season[]
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
  ratings: Ratings
  qualityProfileId: number
  id: number
  certification?: string
}

interface AlternateTitle {
  title: string
  sceneSeasonNumber: number
}

interface Image {
  coverType: CoverTypeEnum
  url: string
}

enum CoverTypeEnum {
  Banner = 'banner',
  Fanart = 'fanart',
  Poster = 'poster'
}

interface Ratings {
  votes: number
  value: number
}

interface Season {
  seasonNumber: number
  monitored: boolean
  statistics: Statistics
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
