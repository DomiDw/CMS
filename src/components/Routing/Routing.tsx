import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import MatchPage from '../MatchPage/MatchPage'
import ClubPage from '../ClubPage/ClubPage'
import SquadPage from '../SquadPage/SquadPage'

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
            <Route exact path='/aisw-cms-clubpage/1' render={() => <ClubPage />} />
            <Route path='/aisw-cms-matchpage/1' render={(props:any) => <MatchPage {...props} />} />
            <Route path='/aisw-cms-squadpage'>
              <SquadPage />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routing
