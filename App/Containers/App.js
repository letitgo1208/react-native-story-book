import '../Config'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureNavigation, { startApp } from '../Navigation/ConfigureNavigation'
import createStore from '../Redux'

import awsmobile from 'app/Config/aws-exports'
import Amplify from 'aws-amplify'

const App = () => {
  Amplify.configure(awsmobile)

  const store = createStore()

  configureNavigation(store, Provider)
  startApp()
}

export default App
