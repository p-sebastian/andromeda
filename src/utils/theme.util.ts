import { ThemeEnum } from './enums.util'
import { COLORS } from './constants.util'

export const BASE = Object.freeze({
  fontColor: COLORS[ThemeEnum.MAIN],
  primary: COLORS[ThemeEnum.MAIN],
  primaryDark: 'hsla(232, 14%, 10%, 1)',
  lighterDark: 'hsla(225, 9%, 16%, 1)',
  dark: COLORS[ThemeEnum.MAIN],
  success: 'hsla(133.6, 97%, 77.5%, 1)',
  danger: 'hsla(12.2, 81.9%, 54.8%, 1)',
  title: 'Home'
})

const SONARR = Object.freeze({
  ...BASE,
  fontColor: 'white',
  primary: COLORS[ThemeEnum.SONARR],
  primaryDark: 'hsla(201, 98%, 24%, 1)',
  title: 'sonarr'
})

const RADARR = Object.freeze({
  ...BASE,
  fontColor: COLORS[ThemeEnum.MAIN],
  primary: COLORS[ThemeEnum.RADARR],
  primaryDark: 'hsla(42, 100%, 42%, 1)',
  title: 'radarr'
})

const LIDARR = Object.freeze({
  ...BASE,
  fontColor: COLORS[ThemeEnum.MAIN],
  primary: COLORS[ThemeEnum.LIDARR],
  primaryDark: 'hsla(42, 100%, 42%, 1)',
  title: 'lidarr'
})
const SABNZBD = Object.freeze({
  ...BASE,
  fontColor: COLORS[ThemeEnum.MAIN],
  primary: COLORS[ThemeEnum.SABNZBD],
  primaryDark: 'hsla(42, 100%, 42%, 1)',
  title: 'sabnzbd'
})
const TORRENT = Object.freeze({
  ...BASE,
  fontColor: 'white',
  primary: COLORS[ThemeEnum.TORRENT],
  primaryDark: 'hsla(42, 100%, 42%, 1)',
  title: 'transmission'
})

export const THEME = Object.freeze({
  [ThemeEnum.MAIN]: BASE,
  [ThemeEnum.SONARR]: SONARR,
  [ThemeEnum.RADARR]: RADARR,
  [ThemeEnum.LIDARR]: LIDARR,
  [ThemeEnum.SABNZBD]: SABNZBD,
  [ThemeEnum.TORRENT]: TORRENT
})
