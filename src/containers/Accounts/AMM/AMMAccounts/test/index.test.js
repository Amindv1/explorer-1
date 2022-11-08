import React from 'react'
import { mount } from 'enzyme'
import { I18nextProvider } from 'react-i18next'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router'
import { AccountTransactionTable } from 'containers/Accounts/AccountTransactionTable/AccountTransactionTable'
import { initialState } from 'rootReducer'
import i18n from 'i18nTestConfig'
import AMMAccountHeader from 'containers/Accounts/AMM/AMMAccounts/AMMAccountHeader/AMMAccountHeader'
import Account from '../index'
import mockAccountState from './NonAMMAccount.json'

describe('Account container', () => {
  const TEST_ACCOUNT_ID = 'rTEST_ACCOUNT'

  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  const creatWrapper = (state = {}) => {
    const store = mockStore({ ...initialState, ...state })
    return mount(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <MemoryRouter initialEntries={[`accounts/${TEST_ACCOUNT_ID}`]}>
            <Route path="accounts/:id" component={Account} />
          </MemoryRouter>
        </Provider>
      </I18nextProvider>,
    )
  }

  it('renders without crashing', () => {
    const wrapper = creatWrapper()
    wrapper.unmount()
  })

  it('renders static parts', () => {
    const state = {
      ...initialState,
      accountHeader: {
        loading: false,
        error: null,
        data: mockAccountState,
      },
    }

    const wrapper = creatWrapper(state)
    expect(wrapper.find(AMMAccountHeader).length).toBe(1)
    expect(wrapper.find(AccountTransactionTable).length).toBe(1)
    wrapper.find('.balance-selector-button').simulate('click')
    wrapper.unmount()
  })
})
