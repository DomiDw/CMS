import React, { Component } from 'react'
import './clubpage.scss'
import '../../../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import { Club } from '../Club/Club'
import { TextBox } from '../Textbox/Textbox'
import axios from 'axios'
import { IClubPageProps, IClubPageState } from './IClubPage'
import { MatchBox } from '../MatchBox/MatchBox'
import Discovery from '@soccerwatch/discovery'
import { Spinner } from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import LinkToSquad from '../LinkToSquad/LinkToSquad'

const teamOne = '1. Herren'
// const kaderTwo = 'Alt-Herren'
// const kaderThree = 'A-Jugend'

class ClubPage extends Component<IClubPageProps, IClubPageState> {
  constructor (props: IClubPageProps) {
    super(props)
    this.state = {
      loading: true,
      checked: false
    }
  }

  getClubIdFromUrl () {
    const url = window.location.href
    const id = url.substring(url.lastIndexOf('/') + 1)
    return id.length > 0 ? id : null
  }

  getData = async () => {
    const clubAPI = Discovery.API_CLUB + '/info/' + this.getClubIdFromUrl()
    const pastFirstMatchAPI = Discovery.API_VIDEO + '/meta/41651'
    const pastSecondMatchAPI = Discovery.API_VIDEO + '/meta/41196'
    const pastThirdMatchAPI = Discovery.API_VIDEO + '/meta/38657'
    const futureFirstMatchAPI = Discovery.API_VIDEO + '/meta/38126'
    const futureSecondMatchAPI = Discovery.API_VIDEO + '/meta/38260'
    const futureThirdMatchAPI = Discovery.API_VIDEO + '/meta/37845'
    const res = await Promise.all([
      axios.get(clubAPI),
      axios.get(pastFirstMatchAPI),
      axios.get(pastSecondMatchAPI),
      axios.get(pastThirdMatchAPI),
      axios.get(futureFirstMatchAPI),
      axios.get(futureSecondMatchAPI),
      axios.get(futureThirdMatchAPI)
    ])
    const dataClub = res[0].data
    const pastFirstMatchData = res[1].data
    const pastSecondMatchData = res[2].data
    const pastThirdMatchData = res[3].data
    const futureFirstMatchData = res[4].data
    const futureSecondMatchData = res[5].data
    const futureThirdMatchData = res[6].data
    this.setState({
      dataClub,
      pastFirstMatchData,
      pastSecondMatchData,
      pastThirdMatchData,
      futureFirstMatchData,
      futureSecondMatchData,
      futureThirdMatchData,
      loading: false
    })
  }

  componentDidMount () {
    this.getData()
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
            <div className='spacer-big' />
            <Club
              name={
                this.state.dataClub
                  ? this.state.dataClub?.name
                  : ''
              }
              logo={
                this.state.dataClub
                  ? this.state.dataClub?.thumbnail
                  : ''
              }
              city={
                this.state.dataClub
                  ? this.state.dataClub?.city
                  : ''
              }
            />
            <div className='spacer-small' />
            <div className='spacer-small' />
            <div className='col-xs-12'>
              <div className='clubDescriptionText'>Vereinsbeschreibung (location als Filler)</div>
              <TextBox editableText={
                this.state.dataClub
                  ? this.state.dataClub?.location
                  : ''
              }
              />
              <div className='clubMessageText'>Vereinsnachricht (location als Filler)</div>
              <TextBox editableText={
                this.state.dataClub
                  ? this.state.dataClub?.location
                  : ''
              }
              />
            </div>
            <div className='spacer-small' />
            <div className='col-xs-12'>
              <div className='row'>
                <LinkToSquad
                  team={teamOne}
                />
                <div className='spacer-small' />
                <Link to='/aisw-cms-MatchPage/1/41651'>
                  <MatchBox
                    box={{
                      clubATeam: this.state.pastFirstMatchData
                        ? this.state.pastFirstMatchData.clubATeam
                        : '',
                      clubBTeam: this.state.pastFirstMatchData
                        ? this.state.pastFirstMatchData.clubBTeam
                        : '',
                      gameDay: this.state.pastFirstMatchData
                        ? this.state.pastFirstMatchData.gameDay
                        : ''
                    }}
                  />
                </Link>
                <Link to='/aisw-cms-MatchPage/1/41196'>
                  <MatchBox
                    box={{
                      clubATeam: this.state.pastSecondMatchData
                        ? this.state.pastSecondMatchData.clubATeam
                        : '',
                      clubBTeam: this.state.pastSecondMatchData
                        ? this.state.pastSecondMatchData.clubBTeam
                        : '',
                      gameDay: this.state.pastSecondMatchData
                        ? this.state.pastSecondMatchData.gameDay
                        : ''
                    }}
                  />
                </Link>
                <Link to='/aisw-cms-MatchPage/1/38657'>
                  <MatchBox
                    box={{
                      clubATeam: this.state.pastThirdMatchData
                        ? this.state.pastThirdMatchData.clubATeam
                        : '',
                      clubBTeam: this.state.pastThirdMatchData
                        ? this.state.pastThirdMatchData.clubBTeam
                        : '',
                      gameDay: this.state.pastThirdMatchData
                        ? this.state.pastThirdMatchData.gameDay
                        : ''
                    }}
                  />
                </Link>
                <Link to='/aisw-cms-MatchPage/1/38126'>
                  <MatchBox
                    box={{
                      clubATeam: this.state.futureFirstMatchData
                        ? this.state.futureFirstMatchData.clubATeam
                        : '',
                      clubBTeam: this.state.futureFirstMatchData
                        ? this.state.futureFirstMatchData.clubBTeam
                        : '',
                      gameDay: this.state.futureFirstMatchData
                        ? this.state.futureFirstMatchData.gameDay
                        : ''
                    }}
                  />
                </Link>
                <Link to='/aisw-cms-MatchPage/1/38260'>
                  <MatchBox
                    box={{
                      clubATeam: this.state.futureSecondMatchData
                        ? this.state.futureSecondMatchData.clubATeam
                        : '',
                      clubBTeam: this.state.futureSecondMatchData
                        ? this.state.futureSecondMatchData.clubBTeam
                        : '',
                      gameDay: this.state.futureSecondMatchData
                        ? this.state.futureSecondMatchData.gameDay
                        : ''
                    }}
                  />
                </Link>
                <Link to='/aisw-cms-MatchPage/1/37845'>
                  <MatchBox
                    box={{
                      clubATeam: this.state.futureThirdMatchData
                        ? this.state.futureThirdMatchData.clubATeam
                        : '',
                      clubBTeam: this.state.futureThirdMatchData
                        ? this.state.futureThirdMatchData.clubBTeam
                        : '',
                      gameDay: this.state.futureThirdMatchData
                        ? this.state.futureThirdMatchData.gameDay
                        : ''
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ClubPage
