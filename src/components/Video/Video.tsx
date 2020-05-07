import React from 'react'
import ReactPlayer from 'react-player'
import { IVideoProps } from './IVideo'
import './video.scss'

export function Video(props: IVideoProps) {
    return (
    <div className="player-wrapper">
        <ReactPlayer url={props.url} playing muted
        />
    </div>
    );
}