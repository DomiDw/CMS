import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import MatchPage from '../MatchPage/MatchPage'
import ClubPage from '../ClubPage/ClubPage'
import SquadPage from '../SquadPage/SquadPage'
import StartPage from '../Auth/StartPage'

class Routing extends Component<any> {
  constructor (props: any) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              path='/cms-startpage/'
              render={() => <StartPage />}
            />
            <Route
              path='/cms-clubpage/'
              render={() => <ClubPage />}
            />
            <Route
              path='/cms-matchpage/1'
              render={(props:any) => <MatchPage {...props} />}
            />
            <Route
              path='/cms-squadpage'
              render={() => <SquadPage />}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routing
