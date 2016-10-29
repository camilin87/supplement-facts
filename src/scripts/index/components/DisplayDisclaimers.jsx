import React from 'react'

export default class DisplayDisclaimers extends React.Component {
    render (){

        if (!this.props.info){
            return (null)
        }

        var lines = []

        if (this.props.info.displayDailyValueNotEstablished){
            lines.push("* Daily Value not established")
        }

        var additionalSymbol = this.props.info.percentOfDailyValueAdditionalSymbol

        if (this.props.info.displayChildrenDisclaimer){
            lines.push(`${additionalSymbol} DV for Children under the age of 4`)
        }

        if (this.props.info.displayPregnantWomenDisclaimer){
            lines.push(`${additionalSymbol} Percent Daily Values (%DV) for pregnant and lactating women.`)
        }

        return (
            <ul>
                { lines.map(l => <li key={l}>{l}</li>) }
            </ul>
        )
    }
}