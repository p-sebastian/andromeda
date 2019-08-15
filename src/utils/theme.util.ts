import { ThemeEnum } from './enums.util'

const main = 'hsla(225, 6%, 13%, 1)'
const sonarrMain = 'hsla(195, 93%, 39%, 1)'
const radarrMain = 'hsla(42, 99%, 53%, 1)'
const lidarrMain = 'hsl(154, 100%, 29%)'
const sabnzbdMain = 'hsl(45, 94%, 49%)'
const transmissionMain = 'hsl(0, 100%, 29%)'

export const BASE = Object.freeze({
  fontRegular: 'dank-mono',
  fontItalic: 'dank-mono-italic',
  fontBold: 'fira-code-bold',
  fontColor: main,
  primary: main,
  primaryDark: 'hsla(232, 14%, 10%, 1)',
  lighterDark: 'hsla(225, 9%, 16%, 1)',
  dark: main,
  success: 'hsla(133.6, 97%, 77.5%, 1)',
  danger: 'hsla(12.2, 81.9%, 54.8%, 1)',
  title: 'Home'
})

const SONARR = Object.freeze({
  ...BASE,
  fontColor: 'white',
  primary: sonarrMain,
  primaryDark: 'hsla(201, 98%, 24%, 1)',
  title: 'sonarr'
})

const RADARR = Object.freeze({
  ...BASE,
  fontColor: main,
  primary: radarrMain,
  primaryDark: 'hsla(42, 100%, 42%, 1)',
  title: 'radarr'
})

const LIDARR = Object.freeze({
  ...BASE,
  fontColor: main,
  primary: lidarrMain,
  primaryDark: 'hsla(42, 100%, 42%, 1)',
  title: 'lidarr'
})
const SABNZBD = Object.freeze({
  ...BASE,
  fontColor: main,
  primary: sabnzbdMain,
  primaryDark: 'hsla(42, 100%, 42%, 1)',
  title: 'sabnzbd'
})
const TRANSMISSION = Object.freeze({
  ...BASE,
  fontColor: main,
  primary: transmissionMain,
  primaryDark: 'hsla(42, 100%, 42%, 1)',
  title: 'transmission'
})

export const THEME = Object.freeze({
  [ThemeEnum.SONARR]: SONARR,
  [ThemeEnum.RADARR]: RADARR,
  [ThemeEnum.LIDARR]: LIDARR,
  [ThemeEnum.SABNZBD]: SABNZBD,
  [ThemeEnum.TRANSMISSION]: TRANSMISSION
})
