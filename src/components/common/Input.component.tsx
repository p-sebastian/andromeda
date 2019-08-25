import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components/native'
import { TextInputProps } from 'react-native'
import { extractProp, extractCondition } from '@utils/recipes.util'
import AText from './Text.component'
import { THEME } from '@utils/theme.util'
import { ThemeEnum, ColorEnum } from '@utils/enums.util'
import { COLORS } from '@utils/constants.util'
import { validator } from '@utils/validators.util'
import { FormContext } from '../../context/Form.context'
import { logger } from '@utils/logger.util'

type Extra = {
  textColor?: string
  selectedColor?: string
  backgroundColor?: string
  labelText?: string
  validate?: string[]
  focused?: boolean
}
type Fns = {
  readonly isInputValid?: (isValid: boolean) => void
  readonly onChangeText?: (text: string, isValid?: boolean) => void
}
type Props = TextInputProps & Extra & Fns & { accessibilityLabel: string }
const AInput: React.FC<Props> = props => {
  const [focused, setFocused] = useState(false)
  // @todo dont pass all the props to useValidate
  const [pristine, errors, onChange] = useValidate(props)
  const {
    textColor = 'white',
    backgroundColor = 'transparent',
    selectedColor = COLORS[ColorEnum.INFO],
    labelText = '',
    placeholderTextColor = COLORS[ColorEnum.PLACEHOLDER],
    ...inputProps
  } = props
  const color = focused ? selectedColor : textColor

  return (
    <Container>
      <Label textColor={color}>{labelText}</Label>
      <TextInput
        {...inputProps}
        textColor={textColor}
        selectedColor={color}
        backgroundColor={backgroundColor}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        focused={focused}
      />
      {!pristine && errors.length ? <ErrorLabel>{errors[0]}</ErrorLabel> : null}
    </Container>
  )
}

const useValidate = ({
  onChangeText,
  validate,
  accessibilityLabel,
  defaultValue
}: Props) => {
  const { setValidity } = useContext(FormContext)
  const [pristine, setPristine] = useState(true)
  const [errors, setErrors] = useState([] as string[])
  const _onChange = (value: string) => {
    const _errors = validator(value, validate)
    setPristine(false)
    setErrors(_errors.length ? _errors.map(e => e.error) : [])
    setValidity(accessibilityLabel, {
      value,
      errors: [..._errors],
      isValid: _errors.length === 0
    })
    if (onChangeText) {
      onChangeText(value, _errors.length === 0)
    }
  }
  /**
   * if it has an initial value it will trigger all events as if typed
   */
  useEffect(() => {
    if (defaultValue) {
      _onChange(defaultValue)
    }
  }, [defaultValue])
  return [pristine, errors, _onChange] as [boolean, string[], typeof _onChange]
}

const Container = styled.View`
  position: relative;
  margin-bottom: 5px;
  height: 56;
`
const Label = styled(AText)`
  padding: 0 12px;
  position: absolute;
  text-transform: capitalize;
  color: ${extractProp<Extra>('textColor')};
  letter-spacing: 2;
  font-size: 12;
  top: 0;
  height: 20;
  line-height: 25;
`
const TextInput = styled.TextInput<Props>`
  border-bottom-width: ${extractCondition<Extra, any>('focused', 2, 1)};
  border-bottom-color: ${extractCondition<Extra, {}, any>(
    'focused',
    'selectedColor',
    'white'
  )};
  font-size: 16;
  padding: 0 12px;
  padding-top: 20;
  height: 56;
  color: ${extractProp<Extra>('textColor')};
  background: ${extractProp<Extra>('backgroundColor')};
  font-family: ${THEME[ThemeEnum.MAIN].fontRegular};
`
const ErrorLabel = styled(AText)`
  padding: 0 12px;
  font-family: ${THEME[ThemeEnum.MAIN].fontItalic};
  font-size: 10;
  color: ${COLORS[ColorEnum.DANGER]};
  height: 16;
  align-self: flex-end;
`

export default AInput
