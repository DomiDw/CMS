import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import Routing from './components/Routing/Routing'
import * as serviceWorker from './serviceWorker'
import Discovery from '@soccerwatch/discovery'

Discovery.init(process.env.REACT_APP_Environment || 'dev', true)
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <Routing />
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
  .catch((err:Error) => {
    console.error(err)
  })

serviceWorker.unregister()
