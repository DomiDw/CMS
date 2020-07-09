import React, { Component } from 'react'
import './clubpage.scss'
import '../../../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import { Club } from '../Club/Club'
import { TextBox } from '../Textbox/Textbox'
import axios from 'axios'
import { IClubPageProps, IClubPageState } from './IClubPage'
import { MatchBox } from '../MatchBox/MatchBox'
// import Discovery from '@soccerwatch/discovery'
import { Spinner } from '../Spinner/Spinner'
import { Link } from 'react-router-dom'

const FirstMatchApi =
  'https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-video/meta/41651'
const secondMatchApi =
  'https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-video/meta/41196'
const thirdMatchApi =
  'https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-video/meta/38657'

const descriptionText = 'Vereinsbeschreibung'
const clubMessage = 'Aktuelle Vereinsnachricht'

class ClubPage extends Component<IClubPageProps, IClubPageState> {
  constructor (props: IClubPageProps) {
    super(props)
    this.state = {
      loading: true
    }
  }

  generateId () {
    const clubUrl = window.location.href
    const clubId = clubUrl.substring(clubUrl.lastIndexOf('/') + 1)
    return clubId
  }

  componentDidMount () {
    const clubApi =
  'https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-club/info/' + this.generateId()
    axios.get(FirstMatchApi).then((res) => {
      const firstMatchData = res.data
      this.setState({ firstMatchData })
    })
    axios.get(secondMatchApi).then((res) => {
      const secondMatchData = res.data
      this.setState({ secondMatchData })
    })
    axios.get(thirdMatchApi).then((res) => {
      const thirdMatchData = res.data
      this.setState({ thirdMatchData })
    })
    axios.get(clubApi).then((res) => {
      const dataClub = res.data
      this.setState({ dataClub, loading: false })
    })
  }

  render () {
    return (
      <div className='container-fluid'>
        {this.state.loading && (
          <div className='row'>
            <div className='spacer-big' />
            <Spinner />
          </div>
        )}
        {!this.state.loading && (
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-10 col-lg-8 col-center'>
              <div className='row'>
                <div>
                  <Club
                    name={this.state.dataClub ? this.state.dataClub?.name : ''}
                    logo={this.state.dataClub ? this.state.dataClub?.thumbnail : ''}
                    city={this.state.dataClub ? this.state.dataClub?.city : ''}
                  />
                </div>
                <div className='col-xs-12'>
                  <TextBox editableText={descriptionText} />
                  <TextBox editableText={clubMessage} />
                </div>
                <div className='col-xs-12'>
                  <Link to='/aisw-cms-MatchPage/1/41651'>
                    <MatchBox
                      box={{
                        clubATeam: this.state.firstMatchData
                          ? this.state.firstMatchData.clubATeam
                          : '',
                        clubBTeam: this.state.firstMatchData
                          ? this.state.firstMatchData.clubBTeam
                          : '',
                        gameDay: this.state.firstMatchData
                          ? this.state.firstMatchData.gameDay
                          : ''
                      }}
                    />
                  </Link>
                  <Link to='/aisw-cms-MatchPage/1/41196'>
                    <MatchBox
                      box={{
                        clubATeam: this.state.secondMatchData
                          ? this.state.secondMatchData.clubATeam
                          : '',
                        clubBTeam: this.state.secondMatchData
                          ? this.state.secondMatchData.clubBTeam
                          : '',
                        gameDay: this.state.secondMatchData
                          ? this.state.secondMatchData.gameDay
                          : ''
                      }}
                    />
                  </Link>
                  <Link to='/aisw-cms-MatchPage/1/38657'>
                    <MatchBox
                      box={{
                        clubATeam: this.state.thirdMatchData
                          ? this.state.thirdMatchData.clubATeam
                          : '',
                        clubBTeam: this.state.thirdMatchData
                          ? this.state.thirdMatchData.clubBTeam
                          : '',
                        gameDay: this.state.thirdMatchData
                          ? this.state.thirdMatchData.gameDay
                          : ''
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ClubPage
