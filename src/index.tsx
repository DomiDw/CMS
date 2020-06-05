import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import MatchPage from './MatchPage'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <MatchPage />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
