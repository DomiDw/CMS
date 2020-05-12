import React from 'react'
import { ITextboxProps } from './ITextbox'
import './textbox.scss'

export const clubMessage = 'message from the club'
export const descriptionText = 'Description Text SPIELTAG'

export class DescriptionBox extends React.Component<ITextboxProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            value: descriptionText,
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
                <button onClick={this.changeEditMode}>X</button>
                <button onClick={this.updateComponentValue}>OK</button>
                </div>
            :
                <div onClick={this.changeEditMode}>
                    {this.state.value}
                </div>
                
        )
    }
}

export class ClubMessageBox extends React.Component<ITextboxProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            value: clubMessage,
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
                <button onClick={this.changeEditMode}>X</button>
                <button onClick={this.updateComponentValue}>OK</button>
                </div>
            :
                <div onClick={this.changeEditMode}>
                    {this.state.value}
                </div>
                
        )
    }
}

// export default class DescriptionBox extends React.Component<ITextboxProps, any> {
//     constructor(props: any) {
//         super(props)
//         this.state = {
//             descriptionText: "Beschreibungstext",
//             name:"Peter"
//         }
//         this.handleChange = this.handleChange.bind(this)
//     }
//     componentDidMount() {
//         this.setState({
//             descriptionText: "Neuer Beschreibungstext"
//         })
//     }
//     handleChange(event:any, name:string) {
//         this.setState({
//             [name]: event.target.value
//         })
//     }
//     render() {
//         console.log(this.state)
//         return (
//             <div className="textbox-block col-xs-12">
//                 <input
//                     className="textbox"
//                     placeholder={this.state.descriptionText}
//                     type="text"
//                     onChange={(event) => this.handleChange(event, "descriptionText")}
//                 />
//                 <TextboxTwo
//                     handleChange={this.handleChange}
//                     name={this.state.name}
//                 />
//             </div>
//         )
//     }
// }
