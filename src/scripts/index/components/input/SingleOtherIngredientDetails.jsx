import React from 'react'

export default class SingleOtherIngredientDetails extends React.Component {
    render (){
        if (!this.props.ingredient){
            return (null)
        }

        return (
            <span>
                {this.props.ingredient.name} <span className="badge">{this.props.ingredient.quantity} mg</span>
            </span>
        )
    }
}