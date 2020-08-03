import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { IVideoProps, IVideoState } from './IVideo'
import './video.scss'
import axiosRetry from 'axios-retry'
import axios from 'axios'

export class Video extends Component<IVideoProps, IVideoState> {
  constructor (props: IVideoProps) {
    super(props)
    this.state = {
      date: null
    }
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

  getData = async () => {
    axiosRetry(axios, { retries: 5 })
    const containerAPI:any = await
    axios.post('https://api-container-dot-sw-sc-de-prod.appspot.com/rest/v1/de/containerCollection/club/' +
    this.getClubIdFromUrl())
    containerAPI.data.container.map((item:any) => {
      let getDate
      if (item?.tiles[0]?.matchId === this.getVideoIdFromUrl()) {
        getDate = new Date(item?.tiles[0]?.Match.startTime).toLocaleString()
        if (getDate.length > 0) {
          this.setState({
            date: getDate
          })
        }
      }
      return null
    })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    return (
      <div className='col-xs-12'>
        <div className='row'>
          {!this.props.url ? (
            <div className='date'>
              Dieses Spiel findet am {this.state.date} Uhr statt
            </div>
          ) : (
            <div className='player-wrapper'>
              <ReactPlayer
                className='react-player'
                url={this.props.url}
                controls
                playing
                muted
                width='100%'
                height='100%'
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}
