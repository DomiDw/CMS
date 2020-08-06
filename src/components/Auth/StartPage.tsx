import React, { Component } from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'
import './startpage.scss'

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
      return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-12 col-center'>
              <div className='spacer-big' />
              <div>
                <div className='row'>
                  <div className='col-xs-12'>
                    <img
                      src='https://crm.esb-online.com/storage/company/logos/02e82830c18712347f7fc0b886bc6171d62fb69c.png'
                      alt=''
                      className='frontPic'
                    />
                  </div>
                </div>
                <div className='spacer-small' />
                <div className='col-center'>
                  Kurzer Introduction Text
                </div>
                <div className='spacer-small' />
                <div className='col-center'>
                  <input
                    type='clubId'
                    className='input id'
                    value={this.state.clubId}
                    onChange={this.handleChange}
                    placeholder='Gewünschte Club ID'
                  />
                  {this.state.clubId.length > 0 ? (
                    <Link to={'/aisw-cms-clubpage/' + this.state.clubId}>
                      <button className='button club'>
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
                  <div className='spacer-small' />
                  <a href='https://soccerwatch.tv/profile' target='blank'>
                    <button className='button regis'>
                      Registrierung auf Soccerwatch.tv
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default StartPage
