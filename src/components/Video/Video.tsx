import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { IVideoProps, IVideoState } from './IVideo'
import './video.scss'

export class Video extends Component<IVideoProps, IVideoState> {
  constructor (props: IVideoProps) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='player-wrapper'>
        { this.props.url ? (
          <div>
            <ReactPlayer 
              className='react-player' 
              url={this.props.url}
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