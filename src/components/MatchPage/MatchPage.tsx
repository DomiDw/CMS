import React, { Component } from 'react'
import './MatchPage.scss'
import '../../../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import { Video } from '../Video/Video'
import { Team } from '../Team/Team'
import { TextBox } from '../Textbox/Textbox'
import { IMatchPageState, IMatchPageProps } from './IMatchPage'
import axios from 'axios'
import Discovery from '@soccerwatch/discovery'

const descriptionText = 'Hier könnte Ihre Vereinsbeschreibung stehen'
const clubMessage = 'Hier könnte Ihre Vereinsnachricht stehen'

class MatchPage extends Component<IMatchPageProps, IMatchPageState> {
  constructor (props:IMatchPageProps) {
    super(props)
    this.state = {}
  }

  getVideoIdFromUrl () {
    const url = (window.location).href
    const id = url.substring(url.lastIndexOf('/') + 1)
    return id.length > 0 ? id : null
  }

  getClubIdFromUrl () {
    const url = (window.location).href
    const parts = url.split('/')
    for (let i = 0; i < parts.length; i++) {
      console.log(parts[2])
      return
    }
  }

  componentDidMount () {
    const videoAPI = Discovery.API_VIDEO + '/meta/' + this.getVideoIdFromUrl()
    // const clubAPIHome = Discovery.API_CLUB +'/info/1075'
    // const clubAPIGuest = Discovery.API_CLUB +'/info/119'
    axios.get(videoAPI)
      .then(res => {
        const metaDataVideo = res.data
        const clubA = metaDataVideo.clubAId
        const clubAPIHome = Discovery.API_CLUB + '/info/' + clubA
        const clubB = metaDataVideo.clubBId
        const clubAPIGuest = Discovery.API_CLUB + '/info/' + clubB

        axios.get(clubAPIHome)
          .then(res => {
            const metaDataClubHome = res.data
            axios.get(clubAPIGuest)
              .then(res => {
                const metaDataClubGuest = res.data
                this.setState({ metaDataVideo, metaDataClubHome, metaDataClubGuest })
              })
              .catch((err:Error) => {
                console.log(err)
              })
          })
      })
  }

  render () {
    return (
      <div className='MatchPage'>
        <a href='https://www.google.de/' target='blank'>
          <button className='backButton'>
            Zurück
          </button>
        </a>
        <div className='container-fluid'>
          <div className='col-xs-6 center-content'>
            <div className='row'>
              <div className='col-xs-12'>
                <Video
                  url={
                    this.state.metaDataVideo
                      ? this.state.metaDataVideo.userStream
                      : ''
                  }
                />
              </div>
            </div>
            <div className='row'>
              <Team
                size={{
                  xs: 12,
                  sm: 12,
                  md: 12,
                  lg: 12
                }}
                home={{
                  name: this.state.metaDataClubHome
                    ? this.state.metaDataClubHome.name
                    : '',
                  thumbnail: this.state.metaDataClubHome
                    ? this.state.metaDataClubHome.thumbnail
                    : ''
                }}
                score={{
                  home: this.state.metaDataVideo
                    ? this.state.metaDataVideo.scoreA
                    : '',
                  guest: this.state.metaDataVideo
                    ? this.state.metaDataVideo.scoreB
                    : ''
                }}
                guest={{
                  name: this.state.metaDataClubGuest
                    ? this.state.metaDataClubGuest.name
                    : '',
                  thumbnail: this.state.metaDataClubGuest
                    ? this.state.metaDataClubGuest.thumbnail
                    : ''
                }}
              />
              <div className='col-xs-12'>
                <div className='clubDescriptionText'>
                  Vereinsbeschreibung
                </div>
                <TextBox
                  editableText={descriptionText}
                />
                <div className='clubMessageText'>
                  Vereinsnachricht
                </div>
                <TextBox
                  editableText={clubMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MatchPage
