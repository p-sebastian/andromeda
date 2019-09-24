import React from 'react'
import styled from 'styled-components/native'
import { GradientEnum, ServerEnum, ColorEnum } from '@utils/enums.util'
import { GRADIENTS, COLORS, FONT } from '@utils/constants.util'
import PosterItem from '@common/Poster-Item.component'
import { IMovie } from '@interfaces/movie.interface'
import moment from 'moment'

type Props = { movie: IMovie }
const MovieItem: React.FC<Props> = ({ movie }) => {
  const { tmdbId, id, title } = movie
  const { gradient, text } = color(movie)

  return (
    <PosterItem
      id={id}
      tdbid={tmdbId}
      title={title}
      gradient={gradient}
      gradientTextColor={text}
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
    return {
      gradient: GRADIENTS[GradientEnum.GREEN],
      text: 'white'
    }
  }
  if (hasFile && !monitored) {
    // downloaded not monitored
    return { gradient: GRADIENTS[GradientEnum.GRAY], text: 'white' }
  }
  if (!hasFile && !monitored) {
    // missing not monitored
    return {
      gradient: GRADIENTS[GradientEnum.ORANGE],
      text: COLORS[ColorEnum.MAIN]
    }
  }
  if (!hasFile && monitored && isAvailable) {
    // missing & monitored & available
    return { gradient: GRADIENTS[GradientEnum.RED], text: 'white' }
  }
  // missing - monitored - not available
  return { gradient: GRADIENTS[GradientEnum.PURPLE], text: 'white' }
}

const Container = styled.View`
  flex: 1;
`
const Title = styled.Text`
  color: white;
  font-family: ${FONT.italic};
`

export default React.memo(MovieItem)
