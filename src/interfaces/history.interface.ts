import { IQuality, ISeriesValue, IEntity } from './common.interface'
import { IEpisode } from './episode.interface'
export type THistory = IEntity<IHistory>
export interface IHistory {
  episodeId: number
  seriesId: number
  sourceTitle: string
  quality: IQuality
  qualityCutoffNotMet: boolean
  date: Date
  downloadId?: string
  eventType: HistoryEventTypeEnum
  data: IHGrabbedD | IHDFImportedD | IHDFailedD | IHEFDeleted
  episode: IEpisode
  series: ISeriesValue
  id: number
}
export enum HistoryEventTypeEnum {
  DownloadFailed = 'downloadFailed', // 4
  DownloadFolderImported = 'downloadFolderImported', // 3
  EpisodeFileDeleted = 'episodeFileDeleted', // 5
  Grabbed = 'grabbed' // 1
}

export interface IHGrabbedD {
  indexer: string
  publishedDate: Date
  releaseGroup?: string
  downloadClient: string
  size: string
}
export interface IHDFImportedD {
  droppedPath: string
  importedPath: string
  downloadClient: string
}
export interface IHDFailedD {
  downloadClient: string
  message: string
}
export interface IHEFDeleted {
  reason: string
}
