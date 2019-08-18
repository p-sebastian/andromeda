import React from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BETWEEN_WIDTH } from '@utils/dimensions.util'
import { StyledThemeP } from '@utils/types.util'
import {
  extractStyleTheme,
  useASelector,
  useADispatchC
} from '@utils/recipes.util'
import { do_navigate } from '@actions/navigation.actions'

const { height } = Dimensions.get('window')
const ATopMenu: React.FC = () => {
  const toSettings = useADispatchC(do_navigate('settings'))
  const fontRegular = useASelector(state => state.theme.fontRegular)
  return (
    <Container>
      <SSettingsButton onPress={toSettings}>
        <BtnText theme={{ fontRegular }}>Settings</BtnText>
        <BtnIcon name="ios-settings" color="white" size={32} />
      </SSettingsButton>
    </Container>
  )
}

const Container = styled.View`
  min-height: ${height * 0.5};
  width: ${BETWEEN_WIDTH};
`
const SSettingsButton = styled.TouchableOpacity`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5;
  position: relative;
`
const BtnText = styled.Text<StyledThemeP>`
  position: absolute;
  flex: 1;
  color: white;
  text-transform: capitalize;
  font-family: ${extractStyleTheme('fontRegular')};
  font-size: 20px;
  text-align: center;
`
const BtnIcon = styled(Ionicons)`
  align-self: flex-end;
`

export default ATopMenu
