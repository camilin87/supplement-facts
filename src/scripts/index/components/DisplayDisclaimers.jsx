import React from 'react'

export default class ServingSize extends React.Component {
    render (){

        if (!this.props.info){
            return (null)
        }

        var lines = []

        if (this.props.info.displayDailyValueNotEstablished){
            lines.push("* Daily Value not established")
        }

        return (
            <ul>
                { lines.map(l => <li>{l}</li>) }
            </ul>
        )
    }
}