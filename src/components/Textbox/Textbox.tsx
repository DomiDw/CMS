import React from 'react'
import { ITextboxProps } from './ITextbox'
import './textbox.scss'

export function Textbox(props: ITextboxProps) {
    return (
        <div className="textbox-block col-xs-12">
            <p className="textbox" placeholder="Hier können Sie Ihre Beschreibung eintragen">
                Hier könnte Ihre Werbung stehen
            </p>
        </div>
    )
}