import React from 'react'

export default class BusinessInfo extends React.Component {
    render (){

        if (!this.props.info){
            return (null)
        }

        var info = this.props.info

        var lines = []

        var distributedByLabel = info.distributedByLabel || ""

        if (info.businessName){
            var businessNameLine = [
                distributedByLabel,
                info.businessName || ""
            ].join(" ")
            .trim()

            lines.push(businessNameLine)
        }

        if (info.streetAddressLine1){
            lines.push(info.streetAddressLine1)
        }

        if (info.streetAddressLine2){
            lines.push(info.streetAddressLine2)
        }

        info.city = info.city || ""
        info.state = info.state || ""
        info.zipCode = info.zipCode || ""

        var address = `${info.city} ${info.state} ${info.zipCode}`

        if (address.trim()){
            lines.push(address)
        }

        if (info.phone){
            lines.push(info.phone)
        }

        return (
            <ul>
                { lines.map(l => <li key={l}>{l}</li>) }
            </ul>
        )
    }
}