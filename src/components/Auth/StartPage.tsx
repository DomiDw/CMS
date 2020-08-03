import React, { Component } from 'react'
import Login from './Login'
import Registration from './Registration'
import { Link } from 'react-router-dom'
// import { IStartPageProps, IStartPageState } from './IStartPage'

class StartPage extends Component<any, any> {
    linkToClub:string = '/aisw-cms-clubpage/' + 1
    constructor (props: any) {
      super(props)
      this.state = {
        clubId: ''
      }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        clubId: event.target.value
      })
    }

    render () {
      console.log(this.state.clubId)
      return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-12 col-center'>
              <div className='spacer-big' />
              <div>
                <img src='https://lh3.googleusercontent.com/proxy/cxLR2seRDc75sG420PbOd1Qw_wUZJVsMOs3Xn1yseU8TO4QqWX1h4obnl29RsSpyDTVmxdVL9K2AnmX1FfwnipYfvDwRejEnz-g042tYXPyFpdsR1CunUwVDiHU' alt='' />
                <div className='spacer-big' />
                <div className='col-center'>
                  <input
                    type='clubId'
                    name='clubId'
                    value={this.state.clubId}
                    onChange={this.handleChange}
                    placeholder='Gewünschte Club ID'
                    required
                  />
                  {this.state.clubId.length > 0 ? (
                    <Link to={'/aisw-cms-clubpage/' + this.state.clubId}>
                      <button type='submit'>
                        Zum Club
                      </button>
                    </Link>
                  ) : null}
                </div>
                <div className='spacer-small' />
                <div className='col-center'>
                  <Login />
                </div>
                <div className='col-center'>
                  <Registration />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default StartPage
