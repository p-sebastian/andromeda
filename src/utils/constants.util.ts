import { ThemeEnum } from './enums.util'
import { TMenuItem } from './types.util'

export const AVAILABLE_SERVERS: TMenuItem[] = [
  { key: ThemeEnum.SONARR, title: 'sonarr', isOnline: false },
  { key: ThemeEnum.RADARR, title: 'radarr', isOnline: true },
  { key: ThemeEnum.LIDARR, title: 'lidarr', isOnline: false },
  { key: ThemeEnum.SABNZBD, title: 'sabnzbd', isOnline: true },
  { key: ThemeEnum.TRANSMISSION, title: 'transmission', isOnline: false }
]
export const COLORS = Object.freeze({
  [ThemeEnum.MAIN]: 'hsla(225, 6%, 13%, 1)',
  [ThemeEnum.SONARR]: 'hsla(195, 93%, 39%, 1)',
  [ThemeEnum.RADARR]: 'hsla(42, 99%, 53%, 1)',
  [ThemeEnum.LIDARR]: 'hsl(154, 100%, 29%)',
  [ThemeEnum.SABNZBD]: 'hsl(45, 94%, 49%)',
  [ThemeEnum.TRANSMISSION]: 'hsl(0, 100%, 29%)'
})
