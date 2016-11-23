import React from 'react'

export default class SingleNonDailyValueIngredientDetails extends React.Component {
    render (){
        if (!this.props.ingredient){
            return (null)
        }

        return (
            <span>
                {this.props.ingredient.name} {this.props.ingredient.source} <span className="badge">{this.props.ingredient.quantity} {this.props.ingredient.unit}</span>
            </span>
        )
    }
}