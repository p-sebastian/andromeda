import PosterItem from '@common/Poster-Item.component'
import { IMovie } from '@interfaces/movie.interface'
import { FONT, GRADIENTS } from '@utils/constants.util'
import { GradientEnum, ServerEnum } from '@utils/enums.util'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components/native'

type Props = { movie: IMovie }
const MovieItem: React.FC<Props> = ({ movie }) => {
  const { tmdbId, id, title } = movie
  const gradient = color(movie)

  return (
    <PosterItem
      id={id}
      tdbid={tmdbId}
      title={title}
      gradient={gradient}
      serverKey={ServerEnum.RADARR}
    >
      <Container>
        <Title>{release(movie)}</Title>
      </Container>
    </PosterItem>
  )
}

const release = ({ physicalRelease }: IMovie) => {
  const date = moment(physicalRelease).format('MMM Do, YYYY')
  return `Release: ${date}`
}

const color = ({ hasFile, monitored, isAvailable }: IMovie) => {
  if (hasFile && monitored) {
    // downloaded & monitored
    GRADIENTS[GradientEnum.GREEN]
  }
  if (hasFile && !monitored) {
    // downloaded not monitored
    return GRADIENTS[GradientEnum.GRAY]
  }
  if (!hasFile && !monitored) {
    // missing not monitored
    return GRADIENTS[GradientEnum.ORANGE]
  }
  if (!hasFile && monitored && isAvailable) {
    // missing & monitored & available
    return GRADIENTS[GradientEnum.RED]
  }
  // missing - monitored - not available
  return GRADIENTS[GradientEnum.BLUE]
}

const Container = styled.View`
  flex: 1;
`
const Title = styled.Text`
  color: white;
  font-family: ${FONT.italic};
`

export default React.memo(MovieItem)
