import React, { Component } from 'react'
import './clubpage.scss'
import '../../../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import { Club } from '../Club/Club'
import { TextBox } from '../Textbox/Textbox'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { IClubPageProps, IClubPageState } from './IClubPage'
import Discovery from '@soccerwatch/discovery'
import { Spinner } from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { TableMatch } from '../TableMatch/TableMatch'

export let teamName:string = ''

class ClubPage extends Component<IClubPageProps, IClubPageState> {
  options = [
    '1. Herren',
    'Alt-Herren',
    'A-Jugend',
    'B-Jugend',
    'C-Jugend',
    'D-Jugend'
  ]

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
    axiosRetry(axios, { retries: 5 })
    const clubAPI = Discovery.API_CLUB + '/info/' + this.getClubIdFromUrl()
    const res = await Promise.all([
      axios.get(clubAPI)
    ])
    const dataClub = res[0].data
    this.setState({
      dataClub,
      loading: false
    })
  }

  componentDidMount () {
    this.getData()
  }

  handleButtonValue = (name:string) => {
    teamName = name
  }

  getToSquad () {
    return (
      <>
        {this.options.map((name:string, index:number) => {
          return (
            <button className='squadButton' onClick={() => { this.handleButtonValue(name) }} key={index}>
              {name}
            </button>
          )
        })}
      </>
    )
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
                <div className='spacer-small' />
                <Link className='squad' to='/aisw-cms-SquadPage'>
                  {this.getToSquad()}
                </Link>
              </div>
            </div>
            <div className='spacer-small' />
            <TableMatch />
          </div>
        )}
      </div>
    )
  }
}

export default ClubPage
