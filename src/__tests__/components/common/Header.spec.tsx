import { BASE } from '@utils/theme.util'
import React from 'react'
import AHeader from '@common/Header.component'
import 'jest-styled-components/native'
import { withRedux } from '../../testing.utils'

describe('<AHeader/>', () => {
  it('renders', async () => {
    const { getByLabelText, asJSON } = withRedux(<AHeader />)
    expect(asJSON()).toMatchSnapshot()
    expect(getByLabelText(/header/)).toHaveStyleRule(
      'backgroundColor',
      BASE.primary
    )
  })
})
