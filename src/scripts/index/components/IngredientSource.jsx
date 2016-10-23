import React from 'react'

export default class IngredientSource extends React.Component {
    render (){
        if (!this.props.source){
            return (null)
        }

        var str = `(${this.props.source})`

        return (
            <span>{str}</span>
        )
    }
}