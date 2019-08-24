import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ScreenFComponent, TServer } from '@utils/types.util'
import { THEME } from '@utils/theme.util'
import { ThemeEnum, ColorEnum } from '@utils/enums.util'
import ACard from '@common/Card.component'
import { COLORS } from '@utils/constants.util'
import AText from '@common/Text.component'
import AInput from '@common/Input.component'
import { logger } from '@utils/logger.util'
import { MARGIN, BORDER_RADIUS, BOX_SHADOW } from '@utils/position.util'
import AInfo from '@common/Info-Text.component'
import { extractProp, useADispatch } from '@utils/recipes.util'
import AForm, { TInputs } from '@common/Form.component'
import { withSubmit } from '@components/hoc/withSubmit.hoc'
import { do_server_modify } from '@actions/server.actions'

const ServerConfigScreen: ScreenFComponent = props => {
  const dispatch = useADispatch()
  const [authEnabled, setAuthEnabled] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const { title, themeKey, key } = props.navigation.state.params as TServer
  const shared = {
    selectedColor: THEME[themeKey].primary,
    autoCapitalize: 'none' as any,
    autoCompleteType: 'off' as any
  }
  return (
    <Avoid behavior="padding" keyboardVerticalOffset={40}>
      <Container>
        <AForm isValid={setFormValid}>
          <ACard color={COLORS[ColorEnum.GRAY]}>
            <Header>{title}</Header>
            <DescriptionContainer>
              <AInfo>
                Will default to LAN in Wifi, if it fails will search on Remote
              </AInfo>
            </DescriptionContainer>
          </ACard>
          <ACard color={COLORS[ColorEnum.GRAY]}>
            <STitle>LAN</STitle>
            <AInput
              {...shared}
              labelText="URL"
              placeholder="10.0.1.10"
              keyboardType="decimal-pad"
              validate={['required']}
              accessibilityLabel="lanUrl"
            />
            <AInput
              {...shared}
              labelText="PORT"
              keyboardType="decimal-pad"
              placeholder="8080"
              validate={['required']}
              accessibilityLabel="lanPort"
            />
            <Space />
            <STitle>Remote</STitle>
            <AInput
              {...shared}
              labelText="URL"
              placeholder="example.domain.com"
              keyboardType="url"
              accessibilityLabel="remoteUrl"
            />
            <AInput
              {...shared}
              labelText="PORT"
              keyboardType="decimal-pad"
              placeholder="34512"
              accessibilityLabel="remotePort"
            />
            <Space />
            <STitle>Additional</STitle>
            <AInput
              {...shared}
              labelText="API Key"
              placeholder="3UYjciAJWGV9kcdLpJeXQHjf"
              validate={['required']}
              accessibilityLabel="apiKey"
            />
          </ACard>
          <ACard color={COLORS[ColorEnum.GRAY]}>
            <SwitchContainer>
              <AuthTitle>Authentication</AuthTitle>
              <Switch
                onValueChange={v => setAuthEnabled(v)}
                value={authEnabled}
              />
            </SwitchContainer>
          </ACard>
          <ButtonContainer>
            <Button background={COLORS[ColorEnum.INFO]}>
              <ButtonText>Test</ButtonText>
            </Button>
            <Submit
              disabled={!formValid}
              background={COLORS[ColorEnum.SUCCESS]}
              onPress={inputs => dispatch(do_server_modify(inputs, key))}
            >
              <ButtonText>Save</ButtonText>
            </Submit>
          </ButtonContainer>
        </AForm>
      </Container>
    </Avoid>
  )
}

const Container = styled.ScrollView`
  flex: 1;
  background: ${THEME[ThemeEnum.MAIN].lighterDark};
`
const Avoid = styled.KeyboardAvoidingView`
  flex: 1;
`
const Space = styled.View`
  height: ${MARGIN};
`
const STitle = styled(AText)`
  align-self: flex-end;
  color: white;
  font-size: 18;
`
const Header = styled(AText)`
  font-family: ${THEME[ThemeEnum.MAIN].fontItalic};
  text-align: center;
  color: white;
  font-size: 22;
  text-transform: capitalize;
  margin-bottom: 5;
`
const DescriptionContainer = styled.View`
  margin-top: 5;
`
const AuthTitle = styled(STitle)`
  flex: 1;
  align-self: center;
`
const SwitchContainer = styled.View`
  display: flex;
  flex-direction: row;
`
const Switch = styled.Switch``
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: ${MARGIN};
  margin-left: ${MARGIN};
  margin-right: ${MARGIN};
`
const Button = styled.TouchableOpacity`
  flex-basis: 48%;
  height: 40;
  align-content: center;
  justify-content: center;
  background: ${extractProp<{ background: string }>('background')};
  border-radius: ${BORDER_RADIUS};
  box-shadow: ${BOX_SHADOW};
`
const ButtonText = styled(AText)`
  font-family: ${THEME[ThemeEnum.MAIN].fontBold};
  text-align: center;
  font-size: 14;
  text-transform: uppercase;
`
const Submit = withSubmit(Button)

export default ServerConfigScreen
