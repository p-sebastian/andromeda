export interface IProfile {
  name: string
  cutoff: ICutoff
  items: {
    quality: ICutoff
    allowed: boolean
  }[]
  language: string
  id: number
}

export interface ICutoff {
  id: number
  name: string
  source: string
  resolution: number
}
