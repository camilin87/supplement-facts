import React from 'react'
import IngredientSource from './IngredientSource.jsx';
import IngredientPercentage from './IngredientPercentage.jsx';

export default class LabelIngredient extends React.Component {
    render (){
        return (
            <li>
                {this.props.item.name}

                <IngredientSource source={this.props.item.source} />

                {this.props.item.quantity}
                {this.props.item.unit}

                <IngredientPercentage percentage={this.props.item.percentage} />
            </li>
        )
    }
}