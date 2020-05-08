import React from 'react'
import { ITextboxProps } from './ITextbox'
import './textbox.scss'

export function Textbox(props: ITextboxProps) {
    return (
        <div className="textbox-block col-xs-12">
            <input className="textbox" placeholder="Hier können Sie Ihre Beschreibung eintragen">
            </input>
        </div>
    )
}