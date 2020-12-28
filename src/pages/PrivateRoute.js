import React from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Loading } from '../components'

const PrivateRoute = ({ component, children, ...args }) => {
  return (
    <Route
      {...args}
      component={withAuthenticationRequired(component ? component : () => children, {
        returnTo: '/checkout',
        onRedirecting: () => <Loading />,
      })}
    />
  )
}

export default PrivateRoute
