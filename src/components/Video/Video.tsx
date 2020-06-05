import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { IVideoProps, IVideoState } from './IVideo'
import './video.scss'
import axios from 'axios'

export class Video extends Component <IVideoProps, IVideoState> {
  constructor (props: IVideoProps) {
    super(props)
    this.state = {

    }
  }
  // state:IVideoState = {
  //   videos:undefined
  // }

  componentDidMount() {
    axios.get('https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-video/meta/10000')
      .then(res => {
        const videos = res.data
        this.setState({ videos })
      })
  }

  render () {
    console.log(this.state)
    return (
      <div className='player-wrapper'>
          { this.state.videos ? (
          <div>
            <ReactPlayer 
              className='react-player' 
              url={this.state.videos.userStream}
              controls
              playing muted
              width='100%' 
              height='100%'
        />
          </div> )
          : null}
      </div>
    )
  }
}