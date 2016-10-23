import React from 'react'

export default class BusinessInfo extends React.Component {
    render (){

        if (!this.props.info){
            return (null)
        }

        var lines = []

        return (
            <ul>
                { lines.map(l => <li key={l}>{l}</li>) }
            </ul>
        )
    }
}