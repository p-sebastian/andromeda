import { ThemeEnum, ServerEnum } from './enums.util'
import { TAvailableServers } from './types.util'

export const AVAILABLE_SERVERS: TAvailableServers = Object.freeze({
  [ServerEnum.SONARR]: {
    key: ServerEnum.SONARR,
    title: 'sonarr',
    themeKey: ThemeEnum.SONARR,
    tabs: ['upcoming', 'shows']
  },
  [ServerEnum.RADARR]: {
    key: ServerEnum.RADARR,
    title: 'radarr',
    themeKey: ThemeEnum.RADARR,
    tabs: []
  },
  [ServerEnum.LIDARR]: {
    key: ServerEnum.LIDARR,
    title: 'lidarr',
    themeKey: ThemeEnum.LIDARR,
    tabs: []
  },
  [ServerEnum.SABNZBD]: {
    key: ServerEnum.SABNZBD,
    title: 'sabnzbd',
    themeKey: ThemeEnum.SABNZBD,
    tabs: []
  },
  [ServerEnum.TORRENT]: {
    key: ServerEnum.TORRENT,
    title: 'torrent',
    themeKey: ThemeEnum.TORRENT,
    tabs: []
  }
})
export const COLORS = Object.freeze({
  [ThemeEnum.MAIN]: 'hsla(225, 6%, 13%, 1)',
  [ThemeEnum.SONARR]: 'hsla(195, 93%, 39%, 1)',
  [ThemeEnum.RADARR]: 'hsla(42, 99%, 53%, 1)',
  [ThemeEnum.LIDARR]: 'hsl(154, 100%, 29%)',
  [ThemeEnum.SABNZBD]: 'hsl(45, 94%, 49%)',
  [ThemeEnum.TORRENT]: 'hsl(0, 100%, 29%)'
})
