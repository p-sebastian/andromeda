import { IQuality } from './common.interface'
export interface IEpisode {
  seriesId: number
  episodeFileId: number
  seasonNumber: number
  episodeNumber: number
  title: string
  airDate: Date
  airDateUtc: Date
  overview: string
  hasFile: boolean
  monitored: boolean
  absoluteEpisodeNumber: number
  unverifiedSceneNumbering: boolean
  id: number
  episodeFile?: IEpisodeFile
}

export interface IEpisodeFile {
  id: number
  seriesId: number
  seasonNumber: number
  relativePath: string
  path: string
  size: number
  dateAdded: Date
  quality: IQuality
  mediaInfo: {
    audioChannels: number
    audioCodec: string
    videoCodec: string
  }
  qualityCutoffNotMet: boolean
}
