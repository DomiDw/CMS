import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { IVideoProps, IVideoState } from './IVideo'
import './video.scss'
import { date } from '../TableMatch/TableMatch'

export class Video extends Component<IVideoProps, IVideoState> {
  constructor (props: IVideoProps) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='col-xs-12'>
        <div className='row'>
          {this.props.url ? (
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
          ) : (
            <div className='date'>
              Dieses Spiel findet am {date} Uhr statt
            </div>
          )}
        </div>
      </div>
    )
  }
}
