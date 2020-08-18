import React, { Component } from 'react'
import './MatchPage.scss'
import { Spinner } from '../Spinner/Spinner'
import { Navbar } from '../Navbar/Navbar'
import { Video } from '../Video/Video'
import { Team } from '../Team/Team'
import { TextBox } from '../Textbox/Textbox'
import { IMatchPageState, IMatchPageProps } from './IMatchPage'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import Discovery from ********************
import '../../../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'

class MatchPage extends Component<IMatchPageProps, IMatchPageState> {
  constructor (props: IMatchPageProps) {
    super(props)
    this.state = {
      loading: true,
      checked: false
    }
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck () {
    this.setState({
      checked: !this.state.checked
    })
  }

  getVideoIdFromUrl () {
    const url = window.location.href
    const id = url.substring(url.lastIndexOf('/') + 1)
    return id.length > 0 ? id : null
  }

  getClubIdFromUrl () {
    const url = window.location.href
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
    axiosRetry(axios, { retries: 5 })
    let video
    if (this.props.location && this.props.location.query?.matchData) {
      video = this.props.location.query.matchData
    } else {
      video = await this.getVideo()
    }
    const metaDataVideo = video
    const clubAPIHome = Discovery.API_CLUB + '/info/' + metaDataVideo.clubAId
    const clubAPIGuest = Discovery.API_CLUB + '/info/' + metaDataVideo.clubBId
    const res = await Promise.all([
      axios.get(clubAPIHome),
      axios.get(clubAPIGuest)
    ])
    const metaDataClubHome = res[0].data
    const metaDataClubGuest = res[1].data
    this.setState({
      metaDataVideo,
      metaDataClubHome,
      metaDataClubGuest,
      loading: false
    })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    return (
      <>
        <Navbar />
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
              <Video
                url={
                  this.state.metaDataVideo &&
                  this.state.metaDataVideo.userStream
                }
              />
              <Team
                home={{
                  name:
                    this.state.metaDataClubHome &&
                    this.state.metaDataClubHome.name,
                  thumbnail:
                    this.state.metaDataClubHome &&
                    this.state.metaDataClubHome.thumbnail
                }}
                score={{
                  home:
                    this.state.metaDataVideo &&
                    this.state.metaDataVideo.scoreA,
                  guest:
                    this.state.metaDataVideo &&
                    this.state.metaDataVideo.scoreB
                }}
                guest={{
                  name:
                    this.state.metaDataClubGuest &&
                    this.state.metaDataClubGuest.name,
                  thumbnail:
                    this.state.metaDataClubGuest &&
                    this.state.metaDataClubGuest.thumbnail
                }}
              />
              <div className='spacer-small' />
              <div className='col-xs-12'>
                <div className='favDiv' onClick={this.handleCheck}>
                  {this.state.checked ? (
                    <IconButton>
                      <StarIcon />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <StarBorderIcon />
                    </IconButton>
                  )}
                  <div>
                    Als Favorit markieren
                  </div>
                </div>
              </div>
              <div className='spacer-small' />
              <div className='col-xs-12'>
                <div className='clubDescriptionText'>Videobeschreibung (location als Filler)</div>
                <TextBox
                  editableText={
                    this.state.metaDataClubHome
                      ? this.state.metaDataClubHome.location
                      : ''
                  }
                />
              </div>
              <div className='spacer-small' />
              <div className='col-xs-12'>
                <div className='clubDescriptionText'>Vereinsbeschreibung (location als Filler)</div>
                <TextBox
                  editableText={
                    this.state.metaDataClubHome
                      ? this.state.metaDataClubHome.location
                      : ''
                  }
                />
              </div>
              <div className='spacer-small' />
              <div className='col-xs-12'>
                <div className='clubMessageText'>Vereinsnachricht (location als Filler)</div>
                <TextBox
                  editableText={
                    this.state.metaDataClubHome
                      ? this.state.metaDataClubHome.location
                      : ''
                  }
                />
              </div>
              <div className='spacer-small' />
            </div>
          )}
        </div>
      </>
    )
  }
}

export default MatchPage
