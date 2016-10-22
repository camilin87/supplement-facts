import React from 'react'
import IngredientSource from './IngredientSource.jsx';
import IngredientPercentage from './IngredientPercentage.jsx';

export default class LabelIngredient extends React.Component {
    render (){
        return (
            <tr>
                <td>
                    {this.props.item.name}
                    <IngredientSource source={this.props.item.source} />
                </td>

                <td>
                    {this.props.item.quantity + " " + this.props.item.unit}
                </td>

                <td>
                    <IngredientPercentage percentage={this.props.item.percentage} />
                </td>
            </tr>
        )
    }
}