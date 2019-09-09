import { withinScreen } from '@utils/helpers.util'
import { AVAILABLE_SERVERS } from '@utils/constants.util'

describe('helpers.util', () => {
  it('`withinScreen` expects call with each server in `AVAILABLE_SERVERS` to return true if name in tabs', () => {
    Object.values(AVAILABLE_SERVERS).forEach(v => {
      if (v.tabs.length) {
        expect(withinScreen(v.key, v.tabs[0])).toBe(true)
      } else {
        expect(withinScreen(v.key, v.title)).toBe(true)
      }
    })
  })
})
