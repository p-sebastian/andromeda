import React from 'react'
import styled from 'styled-components/native'
import { IRawSeries } from '@src/interfaces/common.interface'
import { BORDER_RADIUS, BOX_SHADOW } from '@src/utils/position.util'
import { extractProp } from '@src/utils/recipes.util'
import { LinearGradient } from 'expo-linear-gradient'
import { SCREEN_WIDTH } from '@src/utils/dimensions.util'
import { GradientEnum } from '@src/utils/enums.util'
import { GRADIENTS } from '@src/utils/constants.util'

const WIDTH = SCREEN_WIDTH * 0.25

type Props = { item: IRawSeries<{ coverType: string; url: string }> }
const SearchItem: React.FC<Props> = ({ item }) => {
  const { images, title } = item
  const gradient = GRADIENTS[GradientEnum.PURPLE]
  const posterReq = images
    .filter(i => i.coverType === 'poster')
    .map(i => ({ uri: i.url }))[0]
  const fanartReq = images
    .filter(i => i.coverType === 'fanart')
    .map(i => ({ uri: i.url }))[0]

  return (
    <Container>
      <Touchable>
        <PosterContainer>
          <Poster source={posterReq} />
        </PosterContainer>
        <ContentContainer>
          <Gradient {...gradient}>
            <GradientText gradientTextColor="white">{title}</GradientText>
          </Gradient>
          <InfoView>
            <Fanart source={fanartReq} />
            <Padding></Padding>
          </InfoView>
        </ContentContainer>
      </Touchable>
    </Container>
  )
}

const Container = styled.View`
  height: ${WIDTH / 0.69};
  margin-bottom: 15;
  margin-left: 10;
  margin-right: 10;
`
const Touchable = styled.TouchableOpacity`
  flex-direction: row;
`
const Gradient = styled(LinearGradient)`
  border-radius: ${BORDER_RADIUS};
  margin-bottom: 5;
  width: 100%;
  min-height: 40;
  justify-content: center;
  align-items: center;
  box-shadow: none;
`
const GradientText = styled.Text`
  color: ${extractProp<{ gradientTextColor: string }>('gradientTextColor')};
  text-align: center;
  font-family: oswald-semibold;
  font-size: 14;
`
const PosterContainer = styled.View`
  width: ${WIDTH};
  height: ${WIDTH / 0.69};
  box-shadow: ${BOX_SHADOW};
`
const ContentContainer = styled.View`
  flex: 1;
  position: relative;
  padding-left: 5;
  box-shadow: ${BOX_SHADOW};
`
const Fanart = styled.Image`
  position: absolute;
  border-radius: ${BORDER_RADIUS};
  opacity: 0.2;
  width: 100%;
  height: 100%;
`
const Poster = styled.Image`
  border-radius: ${BORDER_RADIUS};
  flex: 1;
`
const InfoView = styled.View`
  flex: 1;
  position: relative;
  background: hsla(225, 4%, 20%, 1);
  border-radius: ${BORDER_RADIUS};
`
const Padding = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 5px;
  flex: 1;
  border-radius: ${BORDER_RADIUS};
`
export default React.memo(SearchItem)
