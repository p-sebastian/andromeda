import { ThemeEnum, ServerEnum, ColorEnum, GradientEnum } from './enums.util'
import { TAvailableServers, TGradientConstants } from './types.util'

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
  [ColorEnum.MAIN]: 'hsla(225, 6%, 13%, 1)',
  [ColorEnum.SONARR]: 'hsla(195, 93%, 39%, 1)',
  [ColorEnum.RADARR]: 'hsla(42, 99%, 53%, 1)',
  [ColorEnum.LIDARR]: 'hsl(154, 100%, 29%)',
  [ColorEnum.SABNZBD]: 'hsl(45, 94%, 49%)',
  [ColorEnum.TORRENT]: 'hsl(0, 100%, 29%)',
  [ColorEnum.GRAY]: 'hsla(228, 11%, 28%, 1)',
  [ColorEnum.PLACEHOLDER]: 'hsla(0, 0%, 52%, 1)',
  [ColorEnum.DANGER]: '#F44336',
  [ColorEnum.SUCCESS]: '#1DE9B6',
  [ColorEnum.INFO]: '#00B0FF'
})
export const SERVER_GRADIENTS = Object.freeze({
  [ServerEnum.SONARR]: 'hsla(195, 93%, 39%, 1)',
  [ServerEnum.RADARR]: 'hsla(42, 99%, 53%, 1)',
  [ServerEnum.LIDARR]: 'hsl(154, 100%, 29%)',
  [ServerEnum.SABNZBD]: 'hsl(45, 94%, 49%)',
  [ServerEnum.TORRENT]: 'hsl(0, 100%, 29%)'
})
export const GRADIENTS: TGradientConstants = Object.freeze({
  [GradientEnum.ORANGE]: {
    colors: ['#C6FFDD', '#FBD786', '#f7797d'],
    start: [0, 0.5] as [number, number],
    end: [1.3, 0.5] as [number, number]
  },
  [GradientEnum.GREEN]: {
    colors: ['#34e89e', '#218b6f', '#144f50', '#0f3443'],
    start: [0.2, 0] as [number, number],
    end: [0.9, 1] as [number, number]
  },
  [GradientEnum.BLUE]: {
    colors: ['#12c2e9', '#c471ed', '#f7797d'],
    start: [0, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  },
  [GradientEnum.PURPLE]: {
    colors: ['#1096e1', '#6651e5', '#b214e8'],
    start: [0.3, 0] as [number, number],
    end: [0.6, 1] as [number, number]
  },
  [GradientEnum.RED]: {
    colors: ['#ee0979', '#ff6a00'],
    start: [0, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  },
  [GradientEnum.BUTTONS]: {
    colors: ['#B2FEFA', '#0ed2f7'],
    start: [0, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  }
})
