import React, { Component } from 'react'
import './MatchPage.scss'
import { Video } from '../Video/Video'
import { Team } from '../Team/Team'
import { TextBox } from '../Textbox/Textbox'
import { IMatchPageState, IMatchPageProps } from './IMatchPage'
import axios from 'axios'
import Discovery from '@soccerwatch/discovery'

class MatchPage extends Component<IMatchPageProps, IMatchPageState> {
descriptionText = Discovery.API_CLUB + '/info/' + this.getClubIdFromUrl()
// clubMessage:string = 'Hier könnte Ihre Vereinsnachricht stehen'

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
    return parts[4].length > 0 ? parts[4] : null
  }
}

getVideo = async () => {
  const videoAPI = Discovery.API_VIDEO + '/meta/' + this.getVideoIdFromUrl()
  const res = await axios.get(videoAPI)
  const metaDataVideo = res.data
  return metaDataVideo
}

getData = async () => {
  const video = await this.getVideo()
  const metaDataVideo = video
  const clubAPIHome = Discovery.API_CLUB + '/info/' + metaDataVideo.clubAId
  const clubAPIGuest = Discovery.API_CLUB + '/info/' + metaDataVideo.clubBId
  const res = await Promise.all([
    axios.get(clubAPIHome),
    axios.get(clubAPIGuest)
  ])
  const metaDataClubHome = res[0].data
  const metaDataClubGuest = res[1].data
  this.setState({ metaDataVideo, metaDataClubHome, metaDataClubGuest })
}

componentDidMount () {
  this.getData()
}

render () {
  return (
    <div className='container mx-auto'>
      <div className='row'>
        <button className='flex'>
          <a href='https://www.google.de/' target='blank' className='inline-block border border-blue-800 rounded py-1 px-3 bg-blue-800 text-white'>
            Zurück
          </a>
        </button>
      </div>
      <div className='row'>
        <div>
          <Video
            url={
              this.state.metaDataVideo
                ? this.state.metaDataVideo.userStream
                : ''
            }
          />
          <div className='flex flex-wrap'>
            <div className='w-full mb-4'>
              <Team
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
            </div>
          </div>
          <div className='clubDescriptionText'>
            Vereinsbeschreibung
          </div>
          <TextBox
            editableText={this.descriptionText}
          />
          <div className='clubMessageText'>
            Vereinsnachricht
          </div>
          {/* <TextBox
              editableText={this.clubMessage}
            /> */}
        </div>
      </div>
    </div>
  )
}
}

export default MatchPage
