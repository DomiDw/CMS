import React, { Component } from 'react'
import './MatchPage.scss'
import '../../../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import { Video } from '../Video/Video'
import { Team } from '../Team/Team'
import { TextBox } from '../Textbox/Textbox'
import { IMatchPageState, IMatchPageProps } from './IMatchPage'
import axios from 'axios'

const descriptionText = 'Hier könnte Ihre Vereinsbeschreibung stehen'
const clubMessage = 'Hier könnte Ihre Vereinsnachricht stehen'
const videoApi = 'https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-video/meta/38280'
const clubApiHome = 'https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-club/info/1075'
const clubApiGuest = 'https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-club/info/119'

class MatchPage extends Component<IMatchPageProps, IMatchPageState> {
  constructor(props:IMatchPageProps) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    axios.get(videoApi)
      .then(res => {
        const metaDataVideo = res.data
        this.setState({ metaDataVideo })
      })
    axios.get(clubApiHome)
      .then(res => {
        const metaDataClubHome = res.data
        this.setState({ metaDataClubHome })
      })
    axios.get(clubApiGuest)
      .then(res => {
        const metaDataClubGuest = res.data
        this.setState({ metaDataClubGuest })
      })
  }
  render() {
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
                    this.state.metaDataVideo ? 
                    this.state.metaDataVideo.userStream 
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
                  name: this.state.metaDataClubHome ? 
                    this.state.metaDataClubHome.name 
                    : '',
                  thumbnail: this.state.metaDataClubHome ? 
                    this.state.metaDataClubHome.thumbnail 
                    : '' 
                }}
                score={{ 
                  home: this.state.metaDataVideo ?
                  this.state.metaDataVideo.scoreA
                  : '', 
                  guest: this.state.metaDataVideo ?
                  this.state.metaDataVideo.scoreB
                  : '' 
                }}
                guest={{ 
                  name: this.state.metaDataClubGuest ?
                  this.state.metaDataClubGuest.name
                  : '', 
                  thumbnail: this.state.metaDataClubGuest ?
                  this.state.metaDataClubGuest.thumbnail
                  : ''
                }}
              />
              <div className='clubDescriptionText'>
                Vereinsbeschreibung
              </div>
              <div className='col-xs-12'>
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
