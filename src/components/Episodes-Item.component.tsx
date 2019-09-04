import React from 'react'
import styled from 'styled-components/native'
import { IEpisode } from '@interfaces/episode.interface'

type Props = { episode: IEpisode }
const EpisodeItem: React.FC<Props> = ({ episode }) => {
  const { title } = episode

  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  )
}

const Container = styled.View`
  height: 40;
  width: 100%;
`
const Text = styled.Text``

export default React.memo(EpisodeItem)
