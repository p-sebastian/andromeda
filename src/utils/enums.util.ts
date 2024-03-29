export enum ThemeEnum {
  MAIN = 1,
  SONARR,
  RADARR,
  LIDARR,
  SABNZBD,
  TORRENT
}

export enum ColorEnum {
  MAIN = 1,
  SONARR,
  RADARR,
  LIDARR,
  SABNZBD,
  TORRENT,
  GRAY = 500,
  PLACEHOLDER,
  DANGER,
  SUCCESS,
  INFO,
  INFO2,
  WARNING
}
export enum GradientEnum {
  BLUE = 1,
  GREEN,
  ORANGE,
  PURPLE,
  RED,
  BUTTONS,
  SEASONS,
  GRAY
}

export enum ServerEnum {
  SONARR = 'sonarr',
  RADARR = 'radarr',
  LIDARR = 'lidarr',
  SABNZBD = 'sabnzbd',
  TORRENT = 'torrent'
}

export enum CommandEnum {
  RESCAN_SERIES = 'RescanSeries',
  REFRESH_SERIES = 'RefreshSeries',
  EPISODE_SEARCH = 'EpisodeSearch',
  SEASON_SEARCH = 'SeasonSearch',
  SERIES_SEARCH = 'SeriesSearch',
  RSS_SYNC = 'RssSync',
  BACKUP = 'Backup',
  MISSING_EPISODE_SEARCH = 'missingEpisodeSearch' // not a typo
}
