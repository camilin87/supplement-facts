import React from 'react'

export default class SingleDailyValueIngredientDetails extends React.Component {
    render (){
        if (!this.props.ingredient){
            return (null)
        }

        var getIngredientUnit = ingredientName =>
            this.props.DailyValueIngredientsDataService
                .all()
                .find(p => p.name === ingredientName)
                .unit

        return (
            <span>
                <span>
                    {this.props.ingredient.name} {this.props.ingredient.source}
                </span>
                <span className="badge">
                    {this.props.ingredient.quantity} {getIngredientUnit(this.props.ingredient.name)}
                </span>
            </span>
        )
    }
}