import React from 'react'
import { ITextboxProps } from './ITextbox'
import './textbox.scss'

export class TextBox extends React.Component<ITextboxProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            value: this.props.editableText || 'Hier sollte Text stehen',
            isInEditMode: false
        }
    }
    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }
    updateComponentValue = () => {
        this.setState({
            isInEditMode: false
        })
    }
    handleChange = (event: any, value:string) => {
        this.setState({
            [value]: event.target.value
        })
    }
    render() {
        return (
            this.state.isInEditMode ?
                <div className="textbox-block col-xs-12">
                <input
                    className="textbox"
                    type="text"
                    value={this.state.value}
                    onChange={(event) => this.handleChange(event, "value")}
                />
                <button onClick={this.updateComponentValue}>Speichern</button>
                <button onClick={this.changeEditMode}>Abbruch</button>                
                </div>
            :
                <div onClick={this.changeEditMode}>
                    {this.state.value}
                </div>
        )
    }
}