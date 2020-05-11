import React from 'react'
import './textbox.scss'

export default class TextboxTwo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="textbox-block col-xs-12">
                <input
                    className="textbox"
                    placeholder={this.props.name}
                    type="text"
                    onChange={(event) => this.props.handleChange(event, "name")}
                />
            </div>
        )
    }
}
