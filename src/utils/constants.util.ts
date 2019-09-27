import { ColorEnum, GradientEnum, ServerEnum, ThemeEnum } from './enums.util'
import { TAvailableServers, TGradientConstants } from './types.util'

export const AVAILABLE_SERVERS: TAvailableServers = Object.freeze({
  [ServerEnum.SONARR]: {
    key: ServerEnum.SONARR,
    title: 'sonarr',
    themeKey: ThemeEnum.SONARR,
    tabs: ['upcoming', 'shows', 'history', 'add']
  },
  [ServerEnum.RADARR]: {
    key: ServerEnum.RADARR,
    title: 'radarr',
    themeKey: ThemeEnum.RADARR,
    tabs: ['movies']
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
    tabs: ['all']
  }
})
export const FONT = Object.freeze({
  regular: 'dank-mono',
  medium: 'roboto-medium',
  bold: 'roboto-bold',
  boldItalic: 'roboto-bold-italic',
  black: 'roboto-black',
  blackItalic: 'roboto-black-italic',
  italic: 'dank-mono-italic'
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
  [ColorEnum.INFO]: '#00B0FF',
  [ColorEnum.INFO2]: '#1976d2',
  [ColorEnum.WARNING]: '#ffa000'
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
    colors: [COLORS[ColorEnum.MAIN], '#FBD786', '#C6FFDD'],
    start: [0.85, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  },
  [GradientEnum.GREEN]: {
    colors: [COLORS[ColorEnum.MAIN], '#11998e', '#38ef7d'],
    start: [0.85, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  },
  [GradientEnum.BLUE]: {
    colors: [COLORS[ColorEnum.MAIN], '#3b8d99', '#12c2e9'],
    start: [0.85, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  },
  [GradientEnum.PURPLE]: {
    colors: [COLORS[ColorEnum.MAIN], '#b214e8'],
    start: [0.85, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  },
  [GradientEnum.RED]: {
    colors: [COLORS[ColorEnum.MAIN], '#ff6a00'],
    start: [0.85, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  },
  [GradientEnum.BUTTONS]: {
    colors: ['#B2FEFA', '#0ed2f7'],
    start: [0, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  },
  [GradientEnum.SEASONS]: {
    colors: ['#ffffff', '#ece9e6'],
    start: [0, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  },
  [GradientEnum.GRAY]: {
    colors: [COLORS[ColorEnum.MAIN], '#283048', '#859398'],
    start: [0.85, 0.5] as [number, number],
    end: [1, 0.5] as [number, number]
  }
})
