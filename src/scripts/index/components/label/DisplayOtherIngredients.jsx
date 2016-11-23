import React from 'react'

export default class DisplayOtherIngredients extends React.Component {
    render (){

        if (!this.props.info){
            return (null)
        }

        var lines = []

        if (this.props.info.otherIngredients){
            lines.push(`Other Ingredients: ${this.props.info.otherIngredients}`)
        }

        if (this.props.info.allergens){
            lines.push(`Contains: ${this.props.info.allergens}`)
        }

        return (
            <ul>
                { lines.map(l => <li key={l}>{l}</li>) }
            </ul>
        )
    }
}