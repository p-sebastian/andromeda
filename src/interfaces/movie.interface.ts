import { IQuality, IImageValue, IEntity } from './common.interface'

export type TMovie = IEntity<IMovie>

export interface IMovie {
  title: string
  alternativeTitles: string[]
  secondaryYearSourceId: number
  sortTitle: string
  sizeOnDisk: number
  status: string
  overview: string
  inCinemas: Date
  physicalRelease?: Date
  images: IImageValue[]
  website?: string
  downloaded: boolean
  year: number
  hasFile: boolean
  youTubeTrailerId?: string
  studio?: string
  path: string
  profileId: number
  pathState: string
  monitored: boolean
  minimumAvailability: MinimumAvailabilityEnum
  isAvailable: boolean
  folderName: string
  runtime: number
  lastInfoSync: Date
  cleanTitle: string
  imdbId: string
  tmdbId: number
  titleSlug: string
  genres: any[]
  tags: any[]
  added: Date
  ratings: Ratings
  movieFile?: IMovieFile
  qualityProfileId: number
  id: number
  physicalReleaseNote?: string
}

export enum MinimumAvailabilityEnum {
  Announced = 'announced',
  Released = 'released',
  Tba = 'tba'
}

export interface IMovieFile {
  movieId: number
  relativePath: string
  size: number
  dateAdded: Date
  releaseGroup?: string
  quality: IQuality
  edition: string
  mediaInfo: MediaInfo
  id: number
  sceneName?: string
}

export interface MediaInfo {
  containerFormat: string
  videoFormat: string
  videoCodecID: string
  videoProfile: string
  videoCodecLibrary: string
  videoBitrate: number
  videoBitDepth: number
  videoMultiViewCount: number
  videoColourPrimaries: string
  videoTransferCharacteristics: string
  width: number
  height: number
  audioFormat: string
  audioCodecID: string
  audioCodecLibrary: string
  audioAdditionalFeatures: string
  audioBitrate: number
  runTime: string
  audioStreamCount: number
  audioChannels: number
  audioChannelPositions: string
  audioChannelPositionsText: string
  audioProfile: string
  videoFps: number
  audioLanguages: string
  subtitles: string
  scanType: string
  schemaRevision: number
}

export interface Revision {
  version: number
  real: number
}

export interface Ratings {
  votes: number
  value: number
}
