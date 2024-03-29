import { ServerEnum } from '@utils/enums.util'
import { createContext } from 'react'

export const ExpansionContext = createContext({
  dimensions: {
    offsetX: 0,
    offsetY: 0,
    elmHeight: 0,
    elmWidth: 0,
    selected: false,
    id: 0,
    tdbid: 0,
    posterReq: { uri: '', headers: {} },
    fanartReq: { uri: '', headers: {} },
    serverKey: ServerEnum.SONARR
  },
  setDimensions: (dimensions: {
    offsetX: number
    offsetY: number
    elmHeight: number
    elmWidth: number
    selected: boolean
    id: number
    tdbid: number
    posterReq: { uri: string; headers: { [key: string]: string } }
    fanartReq: { uri: string; headers: { [key: string]: string } }
    serverKey: ServerEnum
  }) => {}
})
