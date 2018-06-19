import { shallow, createLocalVue } from 'vue-test-utils'
import View from '@/views/Login'

describe('Login.vue', () => {
  let localVue = createLocalVue()
  const cmp = shallow(View, {
    localVue
  })
  it('Template is correct', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
