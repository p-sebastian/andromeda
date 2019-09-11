import React from 'react'
import styled from 'styled-components/native'
import { IHistory } from '@interfaces/history.interface'
import AText from '@common/Text.component'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { BORDER_RADIUS } from '@utils/position.util'

type Props = { history: IHistory }
const HistoryItem: React.FC<Props> = ({ history }) => {
  const {
    episode: { episodeNumber, seasonNumber },
    quality: { quality },
    series: { title }
  } = history
  return (
    <Padding>
      <Container>
        <Left>
          <Text>
            {seasonNumber}/{episodeNumber}
          </Text>
        </Left>
        <Center>
          <Title>{title}</Title>
          <Text>{quality.name}</Text>
        </Center>
      </Container>
    </Padding>
  )
}

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background: ${COLORS[ColorEnum.GRAY]};
  border-radius: ${BORDER_RADIUS};
  padding: 5px;
`
const Padding = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
  min-height: 60;
  width: 100%;
`
const Left = styled.View`
  justify-content: center;
  align-items: center;
  width: 15%;
`
const Center = styled.View`
  flex-shrink: 1;
  flex-wrap: wrap;
  justify-content: center;
`
const Text = styled(AText)`
  color: white;
`
const Title = styled.Text`
  font-family: oswald-semibold;
  flex-wrap: wrap;
`

export default HistoryItem
