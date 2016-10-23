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

        var additionalSymbol = this.props.info.percentOfDailyValueAdditionalSymbol

        if (this.props.info.displayInfantsDisclaimer){
            lines.push(`${additionalSymbol} Daily Value only for infants`)
        }

        if (this.props.info.displayChildrenDisclaimer){
            lines.push(`${additionalSymbol} Daily Value only for children`)
        }

        return (
            <ul>
                { lines.map(l => <li key={l}>{l}</li>) }
            </ul>
        )
    }
}