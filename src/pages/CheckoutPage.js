import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import styled from 'styled-components'
import { PageHero, Loading } from '../components'
const CheckoutPage = () => {
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        <h1>checkout here</h1>
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div``
export default withAuthenticationRequired(CheckoutPage, {
  onRedirecting: Loading,
})
