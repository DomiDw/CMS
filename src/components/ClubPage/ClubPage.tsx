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
// import { TableMatch } from '../TableMatch/TableMatch'
import { SketchPicker } from 'react-color'

class ClubPage extends Component<IClubPageProps, IClubPageState> {
  constructor (props: IClubPageProps) {
    super(props)
    this.state = {
      background: '#fff',
      fontColor: 'black',
      loading: true,
      squadArray: [],
      checked: false,
      showPrimary: false,
      showSecondary: false
    }
  }

  setPrimaryColor = (show:any) => {
    return (
      show === true ? (
        <div className='primary'>
          <SketchPicker
            color={this.state.background}
            onChangeComplete={this.handleColorChange}
          />
        </div>
      ) : null
    )
  }

  setSecondaryColor = (show:any) => {
    return (
      show === true ? (
        <div className='secondary'>
          <SketchPicker
            color={this.state.fontColor}
            onChangeComplete={this.handleFontChange}
          />
        </div>
      ) : null
    )
  }

  colorPicker () {
    return (
      <>
        <div className='col-xs-12'>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-6 col-center'>
              <div className='row'>
                <div className='col-xs-12 left-Side'>
                  <div className='buttons'>
                    <button
                      className='buttonRow' onClick={() => {
                        this.setState({
                          showPrimary: !this.state.showPrimary
                        })
                      }}
                    >
                      Primärfarbe
                    </button>
                    <div className='spacer-small' />
                    <div className='col-xs-12'>
                      {this.setPrimaryColor(this.state.showPrimary)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-6 col-center'>
              <div className='row'>
                <div className='col-xs-12 right-Side'>
                  <div className='buttons'>
                    <button
                      className='buttonRow' onClick={() => {
                        this.setState({
                          showSecondary: !this.state.showSecondary
                        })
                      }}
                    >
                      Sekundärfarbe
                    </button>
                  </div>
                  <div className='spacer-small' />
                  <div className='col-xs-12'>
                    {this.setSecondaryColor(this.state.showSecondary)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  handleColorChange = (color:any) => {
    this.setState({
      background: color.hex
    })
  }

  handleFontChange = (color:any) => {
    this.setState({
      fontColor: color.hex
    })
  }

  getClubIdFromUrl () {
    const url = window.location.href
    const id = url.substring(url.lastIndexOf('/') + 1)
    return id.length > 0 ? id : null
  }

  getData = async () => {
    axiosRetry(axios, { retries: 5 })
    // Get Club API for Club Component
    const clubAPI = Discovery.API_CLUB + '/info/' + this.getClubIdFromUrl()
    const res = await Promise.all([
      axios.get(clubAPI)
    ])
    const dataClub = res[0].data
    this.setState({
      dataClub,
      loading: false
    })
    // Get Container Club API for Squad Component
    const containerAPI:any = await
    axios.post('https://api-container-dot-sw-sc-de-prod.appspot.com/rest/v1/de/containerCollection/club/' +
    this.getClubIdFromUrl())
    containerAPI.data.container.map((item:any) => {
      let squadCategorie = ''
      if (item?.tiles[0]?.Match?.clubAName === this.state.dataClub?.name) {
        if (item?.type !== 'Highlight') {
          squadCategorie = item?.tiles[0]?.Match?.clubATeam.baseTeamName
          this.state.squadArray.push(squadCategorie)
        }
      } else if (item?.tiles[0]?.Match?.clubBName === this.state.dataClub?.name) {
        if (item?.type !== 'Highlight') {
          squadCategorie = item?.tiles[0]?.Match?.clubBTeam.baseTeamName
          this.state.squadArray.push(squadCategorie)
        }
      }
      this.setState({
        squadArray: this.state.squadArray.reduce((unique:any, item:any) =>
          unique.includes(item) ? unique : [...unique, item], [])
      })
      return null
    })
  }

  componentDidMount () {
    this.getData()
  }

  getToSquad () {
    const linkToSquadPage:string = '/aisw-cms-squadpage/' + this.getClubIdFromUrl() + '/'
    return (
      <div className='buttons'>
        {this.state.squadArray.map((name:string, index:number) => (
          <Link
            key={index} to={{
              pathname: linkToSquadPage + name,
              query: { teamName: name }
            }}
          >
            <button className='buttonRow'>
              {name}
            </button>
          </Link>
        ))}
      </div>
    )
  }

  render () {
    return (
      <div
        className='container-fluid' style={{
          backgroundColor: this.state.background,
          color: this.state.fontColor
        }}
      >
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
            <div className='spacer-big' />
            {this.colorPicker()}
            <div className='spacer-big' />
            <div className='col-xs-12'>
              <div className='headline'>Vereinsbeschreibung (location als Filler)</div>
              <TextBox editableText={
                this.state.dataClub
                  ? this.state.dataClub?.location
                  : ''
              }
              />
              <div className='headline'>Vereinsnachricht (location als Filler)</div>
              <TextBox editableText={
                this.state.dataClub
                  ? this.state.dataClub?.location
                  : ''
              }
              />
            </div>
            <div className='spacer-small' />
            <div className='headline'>
              Spielplan und Übersicht der Kader des {this.state.dataClub?.name}
            </div>
            <div className='spacer-small' />
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-center'>
              <div className='row'>
                <div className='spacer-small' />
                {this.getToSquad()}
              </div>
            </div>
            {/* <div className='spacer-small' />
            <TableMatch /> */}
          </div>
        )}
      </div>
    )
  }
}

export default ClubPage
