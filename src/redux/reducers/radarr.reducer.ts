import { createReducer } from 'typesafe-actions'
import { TActions } from '@utils/types.util'
import { API_RADARR_GET_MOVIES_SUCCESS } from '@actions/types'
import { TImage } from '@interfaces/common.interface'
import { TMovie } from '@interfaces/movie.interface'

type State = {
  entities: {
    movies: TMovie
    images: TImage
  }
  result: {
    movies: number[]
  }
}
const DEFAULT_STATE: State = {
  entities: {
    movies: {},
    images: {}
  },
  result: {
    movies: []
  }
}

export const radarrReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
).handleAction(API_RADARR_GET_MOVIES_SUCCESS, (state, action) => {
  const { result, entities } = action.payload
  return {
    entities: {
      ...state.entities,
      movies: { ...entities['movies'] },
      images: { ...entities['images'] }
    },
    result: { ...state.result, movies: [...result] }
  }
})
