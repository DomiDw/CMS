import React from 'react'
import { ITeamProps } from './ITeam'
import './team.scss'

export function Team(props: ITeamProps) {
    const team = <>
        {props.type === "home" ?
        <>
        <img src={props.src} alt="TSV Meerbusch" className="img-home" />
        <h1>
            TSV Meerbusch
        </h1> 
        </>
        :<>
        <h1>
            FC Scheisse 04
        </h1> 
        <img src={props.src} alt="FC Scheisse 04" className="img-home" />
        </>
        }
    </>
    return (
        <div className="team-wrapper">
            {team}
        </div>
    );
}