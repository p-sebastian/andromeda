import React from 'react'
import styled from 'styled-components/native'
import { IEpisode, IEpisodeFile } from '@interfaces/episode.interface'
import { MARGIN } from '@utils/position.util'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { logger } from '@utils/logger.util'
import { byteToGB } from '@utils/helpers.util'
import AText from '@common/Text.component'
import { Ionicons } from '@expo/vector-icons'
import { SwipeRow } from 'react-native-swipe-list-view'
import { extractCondition } from '@utils/recipes.util'

type Props = { episode: IEpisode }
const EpisodeItem: React.FC<Props> = ({ episode }) => {
  const { title, episodeNumber, episodeFile } = episode

  return (
    <ItemRow disableRightSwipe rightOpenValue={-100} stopRightSwipe={-125}>
      <ItemBack>
        <ItemButton isFirst>
          <Ionicons color="white" name="ios-person" size={28} />
        </ItemButton>
        <ItemButton>
          <Ionicons color="white" name="ios-search" size={28} />
        </ItemButton>
      </ItemBack>
      <Container>
        <Centered>{episodeNumber}</Centered>
        <Center>
          <Text>{title}</Text>
          <Text>{downloaded(episodeFile)}</Text>
        </Center>
        <Ionicons name="ios-arrow-back" size={28} />
      </Container>
    </ItemRow>
  )
}

const downloaded = (file?: IEpisodeFile) => {
  if (!file) {
    return `Missing`
  }
  return `${file.quality.quality.name}-${byteToGB(file.size)}GB`
}

const Container = styled.View`
  min-height: 60;
  width: 100%;
  flex-direction: row;
  padding-left: ${MARGIN};
  padding-right: ${MARGIN};
  padding-top: 5;
  padding-bottom: 5;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS[ColorEnum.GRAY]};
  align-items: center;
  background: #eeeef8;
`
const Center = styled.View`
  flex: 1;
  padding-left: 10;
`
const Centered = styled(AText)`
  width: 10%;
  text-align: center;
  font-family: oswald-semibold;
`
const Text = styled(AText)``

const ItemRow = styled(SwipeRow)`
  border-bottom-width: 1;
  border-bottom-color: white;
`
const ItemBack = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-left: 20;
  background: ${COLORS[ColorEnum.GRAY]};
`
const ItemButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  right: ${extractCondition<{ isFirst?: boolean }, any>('isFirst', 50, 0)};
  width: 50;
  bottom: 0;
  top: 0;
`
export default React.memo(
  EpisodeItem,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
)
