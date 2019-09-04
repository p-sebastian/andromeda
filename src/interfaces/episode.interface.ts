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
}
