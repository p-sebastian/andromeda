import { createContext } from 'react'

export const ExpansionContext = createContext({
  dimensions: {
    offsetX: 0,
    offsetY: 0,
    elmHeight: 0,
    elmWidth: 0,
    selected: false,
    seriesId: 0,
    posterUri: '',
    fanartUri: ''
  },
  setDimensions: (dimensions: {
    offsetX: number
    offsetY: number
    elmHeight: number
    elmWidth: number
    selected: boolean
    seriesId: number
    posterUri: string
    fanartUri: string
  }) => {}
})
