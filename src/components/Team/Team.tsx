import React from 'react'
import { ITeamProps } from './ITeam'
import './team.scss'

export function Team(props: ITeamProps) {

    let teamHome: JSX.Element;
    let teamGuest: JSX.Element;

    if (props.home !== undefined) {
        teamHome =
            <div className="team-home">
                <img src={props.home.logo} alt={props.home.name} className="team-img" />
                <div className="team-home-name">
                    {props.home.name}
                </div>
            </div>
    } else {
        teamHome = <></>
    }

    if (props.guest !== undefined) {
        teamGuest =
            <div className="team-guest end-xs">
                <div className="team-guest-name">
                    {props.guest.name}
                </div>
                <img src={props.guest.logo} alt={props.guest.name} className="team-img" />
            </div>
    } else {
        teamGuest = <></>
    }

    let scoreHome: JSX.Element;
    let scoreGuest: JSX.Element;

    if (props.score?.home !== undefined) {
        scoreHome = <>
            <span className="team-home-score">
                {props.score?.home}
            </span>
        </>
    } else {
        scoreHome = <></>
    }

    if (props.score?.guest !== undefined) {
        scoreGuest = <>
            <span className="team-guest-score">
                {props.score?.guest}
            </span>
        </>
    } else {
        scoreGuest = <></>
    }


    let xsSize: any;
    let smSize: any;
    let mdSize: any;
    let lgSize: any;

    if (props.size?.xs !== undefined) {
        xsSize = `col-xs-${props.size?.xs}`
    } else {
        xsSize = ``
    }
    if (props.size?.sm !== undefined) {
        smSize = ` col-sm-${props.size?.sm}`
    } else {
        smSize = ``
    }
    if (props.size?.md !== undefined) {
        mdSize = ` col-md-${props.size?.md}`
    } else {
        mdSize = ``
    }
    if (props.size?.lg !== undefined) {
        lgSize = ` col-lg-${props.size?.lg}`
    } else {
        lgSize = ``
    }

    let size: any;

    if (props.size !== undefined) {
        size = `${xsSize}${smSize}${mdSize}${lgSize}`
    }

    console.log(xsSize)

    return (
        <div className={size}>
            <div className="team-block">
                {props.home !== undefined ? teamHome : null}
                {props.score?.home !== undefined && props.score?.guest !== undefined ? <div className="team-score">{scoreHome}:{scoreGuest}</div> : null}
                {props.guest !== undefined ? teamGuest : null}
            </div>
        </div>
    );
}

// Wir brauchen 
// - Logo
// - Name
// - Tore