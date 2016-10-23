import React from 'react'

export default class DailyValueHeader extends React.Component {
    render (){
        var addSymbol = ""

        if (this.props.addSymbol){
            addSymbol = " " + this.props.addSymbol
        }

        return (
            <h3>
                % Daily Value{addSymbol}
            </h3>
        )
    }
}