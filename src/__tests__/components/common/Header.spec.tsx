import { BASE } from '@utils/theme.util'
import React from 'react'
import AHeader from '@common/Header.component'
import 'jest-styled-components/native'
import { withRedux } from '../../testing.utils'

describe('<AHeader/>', () => {
  it('renders', async () => {
    const { toJSON, getByA11yLabel } = withRedux(<AHeader />)
    expect(toJSON()).toMatchSnapshot()
    expect(getByA11yLabel(/header/)).toHaveStyleRule(
      'backgroundColor',
      BASE.primary
    )
  })
})
